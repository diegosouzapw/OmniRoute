import type { Meta, StoryObj } from "@storybook/react";
import DocsSidebar from "./DocsSidebar";

const meta: Meta<typeof DocsSidebar> = {
  title: "Docs/DocsSidebar",
  component: DocsSidebar,
};

export default meta;
type Story = StoryObj<typeof DocsSidebar>;

export const Default: Story = {
  args: {
    sections: [
      {
        title: "Getting Started",
        children: [
          { title: "Introduction", href: "/docs/intro" },
          { title: "Quick Start", href: "/docs/quickstart" },
        ],
      },
      {
        title: "Core Concepts",
        children: [
          { title: "Routing", href: "/docs/routing" },
          { title: "Providers", href: "/docs/providers" },
        ],
      },
    ],
  },
};
