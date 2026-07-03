import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getDefaultThinkingBudget } from '@omniroute/open-sse/services/thinkingBudget';
import { capThinkingBudget } from '@/lib/modelCapabilities';

const budgetTopUpSchema = z.object({
  currentBudget: z.number().finite().nonnegative(),
  model: z.string().optional(),
  additionalTokens: z.number().finite().nonnegative(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const model = searchParams.get('model') || undefined;
    const budget = getDefaultThinkingBudget(model);
    return NextResponse.json({ budget });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to get thinking budget' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = budgetTopUpSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'currentBudget and additionalTokens are required non-negative numbers' },
        { status: 400 }
      );
    }
    const { currentBudget, model, additionalTokens } = parsed.data;
    const budget = capThinkingBudget(model, currentBudget + additionalTokens);
    return NextResponse.json({ budget });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to top up thinking budget' },
      { status: 500 }
    );
  }
}
