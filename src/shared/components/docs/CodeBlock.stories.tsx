import type { Meta, StoryObj } from "@storybook/react";
import CodeBlock from "./CodeBlock";

const meta: Meta<typeof CodeBlock> = {
  title: "Docs/CodeBlock",
  component: CodeBlock,
};

export default meta;
type Story = StoryObj<typeof CodeBlock>;

export const Default: Story = {
  args: {
    code: 'const hello = "world";\nconsole.log(hello);',
    language: "typescript",
    filename: "example.ts",
  },
};

export const WithoutFilename: Story = {
  args: {
    code: "npm install @omniroute/core",
    language: "bash",
  },
};
