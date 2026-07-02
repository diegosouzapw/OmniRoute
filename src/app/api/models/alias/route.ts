import { NextResponse } from "next/server";
import { getModelAliases, setModelAlias, deleteModelAlias, isCloudEnabled } from "@/models";
import { getConsistentMachineId } from "@/shared/utils/machineId";
import { syncToCloud } from "@/lib/cloudSync";
import { cloudModelAliasUpdateSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import {
  INTERNAL_PROXY_ERROR,
  getCatalogDiagnosticsHeaders,
  resolveModelAliasLookup,
} from "@/lib/modelMetadataRegistry";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

// GET /api/models/alias - Get all aliases
export async function GET(request) {
  const alias = new URL(request.url).searchParams.get("alias");
  try {
    const authError = await requireManagementAuth(request);
    if (authError) {
      const headers = getCatalogDiagnosticsHeaders({ request, resolvedAlias: alias });
      for (const [key, value] of Object.entries(headers)) {
        authError.headers.set(key, value);
      }
      return authError;
    }

    if (alias) {
      const resolved = await resolveModelAliasLookup(alias);
      if (!resolved.ok) {
        return NextResponse.json(
          {
            error: {
              message: resolved.error.message,
              code: resolved.error.code,
              ...(resolved.error.candidates ? { candidates: resolved.error.candidates } : {}),
            },
          },
          {
            status: resolved.error.status,
            headers: getCatalogDiagnosticsHeaders({ request, resolvedAlias: alias }),
          }
        );
      }

      return NextResponse.json(
        {
          alias: resolved.value.alias,
          resolved: {
            provider: resolved.value.provider,
            providerAlias: resolved.value.providerAlias,
            model: resolved.value.model,
            qualifiedId: resolved.value.resolvedAlias,
            source: resolved.value.source,
            target: resolved.value.target,
            metadata: resolved.value.metadata,
          },
          catalogVersion: getCatalogDiagnosticsHeaders({ request })["X-Model-Catalog-Version"],
        },
        {
          headers: getCatalogDiagnosticsHeaders({
            request,
            resolvedAlias: resolved.value.resolvedAlias,
          }),
        }
      );
    }

    const aliases = await getModelAliases();
    return NextResponse.json(
      {
        aliases,
        catalogVersion: getCatalogDiagnosticsHeaders({ request })["X-Model-Catalog-Version"],
      },
      {
        headers: getCatalogDiagnosticsHeaders({ request }),
      }
    );
  } catch (error) {
    console.log("Error fetching aliases:", error);
    return NextResponse.json(
      {
        error: {
          message: "Failed to fetch aliases",
          code: INTERNAL_PROXY_ERROR,
        },
      },
      {
        status: 500,
        headers: getCatalogDiagnosticsHeaders({ request, resolvedAlias: alias }),
      }
    );
  }
}

// PUT /api/models/alias - Set model alias
export async function PUT(request) {
  const diagnosticHeaders = getCatalogDiagnosticsHeaders({ request });
  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: {
          message: "Invalid request",
          details: [{ field: "body", message: "Invalid JSON body" }],
        },
      },
      { status: 400, headers: diagnosticHeaders }
    );
  }

  try {
    const authError = await requireManagementAuth(request);
    if (authError) {
      for (const [key, value] of Object.entries(diagnosticHeaders)) {
        authError.headers.set(key, value);
      }
      return authError;
    }

    const validation = validateBody(cloudModelAliasUpdateSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400, headers: diagnosticHeaders }
      );
    }
    const { model, alias } = validation.data;

    await setModelAlias(alias, model);
    await syncToCloudIfEnabled();

    return NextResponse.json(
      { success: true, model, alias },
      {
        headers: getCatalogDiagnosticsHeaders({ request, resolvedAlias: alias }),
      }
    );
  } catch (error) {
    console.log("Error updating alias:", error);
    return NextResponse.json(
      {
        error: {
          message: "Failed to update alias",
          code: INTERNAL_PROXY_ERROR,
        },
      },
      { status: 500, headers: diagnosticHeaders }
    );
  }
}

// DELETE /api/models/alias?alias=xxx - Delete alias
export async function DELETE(request) {
  const diagnosticHeaders = getCatalogDiagnosticsHeaders({ request });
  try {
    const authError = await requireManagementAuth(request);
    if (authError) {
      for (const [key, value] of Object.entries(diagnosticHeaders)) {
        authError.headers.set(key, value);
      }
      return authError;
    }

    const { searchParams } = new URL(request.url);
    const alias = searchParams.get("alias");

    if (!alias) {
      return NextResponse.json(
        { error: "Alias required" },
        { status: 400, headers: diagnosticHeaders }
      );
    }

    await deleteModelAlias(alias);
    await syncToCloudIfEnabled();

    return NextResponse.json(
      { success: true },
      {
        headers: getCatalogDiagnosticsHeaders({ request, resolvedAlias: alias }),
      }
    );
  } catch (error) {
    console.log("Error deleting alias:", error);
    return NextResponse.json(
      {
        error: {
          message: "Failed to delete alias",
          code: INTERNAL_PROXY_ERROR,
        },
      },
      { status: 500, headers: diagnosticHeaders }
    );
  }
}

async function syncToCloudIfEnabled() {
  try {
    const cloudEnabled = await isCloudEnabled();
    if (!cloudEnabled) return;

    const machineId = await getConsistentMachineId();
    await syncToCloud(machineId);
  } catch (error) {
    console.log("Error syncing aliases to cloud:", error);
  }
}
