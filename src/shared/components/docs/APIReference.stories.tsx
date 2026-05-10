import type { Meta, StoryObj } from "@storybook/react";
import APIReference from "./APIReference";

const meta: Meta<typeof APIReference> = {
  title: "Docs/APIReference",
  component: APIReference,
};

export default meta;
type Story = StoryObj<typeof APIReference>;

export const Default: Story = {
  args: {
    name: "handleChat()",
    type: "async function",
    description: "Processes a chat completion request and streams the response to the client.",
    params: [
      {
        name: "request",
        type: "ChatRequest",
        description: "The structured request containing messages and model config.",
      },
      {
        name: "options",
        type: "RequestOptions",
        description: "Optional overrides for the request pipeline.",
      },
    ],
    returns: {
      type: "Promise<SSEStream>",
      description:
        "A promise that resolves to a Server-Sent Events stream containing model chunks.",
    },
  },
};
