import type { Meta, StoryObj } from "@storybook/react";
import DocsBreadcrumbs from "./DocsBreadcrumbs";

const meta: Meta<typeof DocsBreadcrumbs> = {
  title: "Docs/DocsBreadcrumbs",
  component: DocsBreadcrumbs,
};

export default meta;
type Story = StoryObj<typeof DocsBreadcrumbs>;

export const Default: Story = {
  args: {
    labels: {
      intro: "Introduction",
      routing: "Routing Engine",
      providers: "Provider Ecosystem",
    },
  },
};
