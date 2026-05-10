import { NextRequest, NextResponse } from "next/server";
import { extractApiKey } from "@/sse/services/auth";
import { getAgent } from "@/lib/cloudAgent/registry";
import {
  insertCloudAgentTask,
  getCloudAgentTaskById,
  getAllCloudAgentTasks,
  getCloudAgentTasksByProvider,
  getCloudAgentTasksByStatus,
  updateCloudAgentTask,
  deleteCloudAgentTask,
} from "@/lib/cloudAgent/db";
import { CreateCloudAgentTaskSchema } from "@/lib/cloudAgent/types";
import { CLOUD_AGENT_PROVIDERS } from "@/shared/constants/providers";
import { z } from "zod";
import pino from "pino";

const logger = pino({ name: "cloud-agents-api" });

function getCorsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

export async function OPTIONS() {
  return new NextResponse(null, { headers: getCorsHeaders() });
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const providerId = searchParams.get("provider");
    const status = searchParams.get("status");
    const limit = parseInt(searchParams.get("limit") || "50", 10);

    let tasks;
    if (providerId) {
      tasks = getCloudAgentTasksByProvider(providerId, limit);
    } else if (status) {
      tasks = getCloudAgentTasksByStatus(status, limit);
    } else {
      tasks = getAllCloudAgentTasks(limit);
    }

    return NextResponse.json(
      {
        data: tasks.map((t) => ({
          id: t.id,
          providerId: t.provider_id,
          externalId: t.external_id,
          status: t.status,
          prompt: t.prompt,
          source: JSON.parse(t.source),
          options: JSON.parse(t.options),
          result: t.result ? JSON.parse(t.result) : null,
          activities: JSON.parse(t.activities),
          error: t.error,
          createdAt: t.created_at,
          updatedAt: t.updated_at,
          completedAt: t.completed_at,
        })),
      },
      { headers: getCorsHeaders() }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500, headers: getCorsHeaders() }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = CreateCloudAgentTaskSchema.parse(body);

    const apiKey = extractApiKey(request);
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key required" },
        { status: 401, headers: getCorsHeaders() }
      );
    }

    const agent = getAgent(validated.providerId);
    if (!agent) {
      return NextResponse.json(
        { error: `Unknown provider: ${validated.providerId}` },
        { status: 400, headers: getCorsHeaders() }
      );
    }

    const task = await agent.createTask(
      {
        prompt: validated.prompt,
        source: validated.source,
        options: validated.options || {},
      },
      { apiKey }
    );

    insertCloudAgentTask({
      id: task.id,
      provider_id: task.providerId,
      external_id: task.externalId || null,
      status: task.status,
      prompt: task.prompt,
      source: JSON.stringify(task.source),
      options: JSON.stringify(task.options),
      result: null,
      activities: JSON.stringify(task.activities),
      error: null,
      created_at: task.createdAt,
      updated_at: task.updatedAt,
      completed_at: null,
    });

    return NextResponse.json(
      {
        data: {
          id: task.id,
          providerId: task.providerId,
          externalId: task.externalId,
          status: task.status,
          prompt: task.prompt,
          source: task.source,
          options: task.options,
          createdAt: task.createdAt,
        },
      },
      { status: 201, headers: getCorsHeaders() }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400, headers: getCorsHeaders() }
      );
    }
    logger.error({ err: error }, "Failed to create cloud agent task");
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500, headers: getCorsHeaders() }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const taskId = searchParams.get("id");

    if (!taskId) {
      return NextResponse.json(
        { error: "Task ID required" },
        { status: 400, headers: getCorsHeaders() }
      );
    }

    deleteCloudAgentTask(taskId);

    return NextResponse.json({ success: true }, { headers: getCorsHeaders() });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500, headers: getCorsHeaders() }
    );
  }
}
