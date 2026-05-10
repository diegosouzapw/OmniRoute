import { NextRequest, NextResponse } from "next/server";
import { extractApiKey } from "@/sse/services/auth";
import { getAgent } from "@/lib/cloudAgent/registry";
import { getCloudAgentTaskById, updateCloudAgentTask } from "@/lib/cloudAgent/db";
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

const ApproveSchema = z.object({
  action: z.literal("approve"),
});

const MessageSchema = z.object({
  action: z.literal("message"),
  message: z.string().min(1),
});

const CancelSchema = z.object({
  action: z.literal("cancel"),
});

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const task = getCloudAgentTaskById(id);

    if (!task) {
      return NextResponse.json(
        { error: "Task not found" },
        { status: 404, headers: getCorsHeaders() }
      );
    }

    const apiKey = extractApiKey(request);
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key required" },
        { status: 401, headers: getCorsHeaders() }
      );
    }

    const agent = getAgent(task.provider_id);
    if (agent && task.external_id) {
      try {
        const statusResult = await agent.getStatus(task.external_id, { apiKey });

        updateCloudAgentTask(id, {
          status: statusResult.status,
          result: statusResult.result ? JSON.stringify(statusResult.result) : null,
          activities: JSON.stringify(statusResult.activities),
          error: statusResult.error || null,
          completed_at:
            statusResult.status === "completed" || statusResult.status === "failed"
              ? new Date().toISOString()
              : null,
        });
      } catch (err) {
        console.error("Failed to sync task status:", err);
      }
    }

    const updatedTask = getCloudAgentTaskById(id);

    return NextResponse.json(
      {
        data: {
          id: updatedTask!.id,
          providerId: updatedTask!.provider_id,
          externalId: updatedTask!.external_id,
          status: updatedTask!.status,
          prompt: updatedTask!.prompt,
          source: JSON.parse(updatedTask!.source),
          options: JSON.parse(updatedTask!.options),
          result: updatedTask!.result ? JSON.parse(updatedTask!.result) : null,
          activities: JSON.parse(updatedTask!.activities),
          error: updatedTask!.error,
          createdAt: updatedTask!.created_at,
          updatedAt: updatedTask!.updated_at,
          completedAt: updatedTask!.completed_at,
        },
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

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const task = getCloudAgentTaskById(id);
    if (!task) {
      return NextResponse.json(
        { error: "Task not found" },
        { status: 404, headers: getCorsHeaders() }
      );
    }

    const apiKey = extractApiKey(request);
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key required" },
        { status: 401, headers: getCorsHeaders() }
      );
    }

    let validated;
    if (body.action === "approve") {
      validated = ApproveSchema.parse(body);
    } else if (body.action === "message") {
      validated = MessageSchema.parse(body);
    } else if (body.action === "cancel") {
      validated = CancelSchema.parse(body);
    } else {
      return NextResponse.json(
        { error: "Invalid action" },
        { status: 400, headers: getCorsHeaders() }
      );
    }

    const agent = getAgent(task.provider_id);
    if (!agent) {
      return NextResponse.json(
        { error: "Agent not found" },
        { status: 500, headers: getCorsHeaders() }
      );
    }

    if (validated.action === "approve") {
      if (!task.external_id) {
        return NextResponse.json(
          { error: "No external task to approve" },
          { status: 400, headers: getCorsHeaders() }
        );
      }
      await agent.approvePlan(task.external_id, { apiKey });
      updateCloudAgentTask(id, { status: "running" });
    } else if (validated.action === "message") {
      if (!task.external_id) {
        return NextResponse.json(
          { error: "No external task to message" },
          { status: 400, headers: getCorsHeaders() }
        );
      }
      const activity = await agent.sendMessage(task.external_id, validated.message, { apiKey });
      const activities = JSON.parse(task.activities);
      activities.push(activity);
      updateCloudAgentTask(id, { activities: JSON.stringify(activities) });
    } else if (validated.action === "cancel") {
      updateCloudAgentTask(id, { status: "cancelled" });
    }

    return NextResponse.json({ success: true }, { headers: getCorsHeaders() });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400, headers: getCorsHeaders() }
      );
    }
    logger.error({ err: error }, "Failed to process task action");
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500, headers: getCorsHeaders() }
    );
  }
}
