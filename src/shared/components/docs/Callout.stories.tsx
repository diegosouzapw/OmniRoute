import type { Meta, StoryObj } from "@storybook/react";
import Callout from "./Callout";

const meta: Meta<typeof Callout> = {
  title: "Docs/Callout",
  component: Callout,
  argTypes: {
    type: {
      control: "select",
      options: ["info", "warning", "danger"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Callout>;

export const Default: Story = {
  args: {
    type: "info",
    title: "Information",
    children: "This is a helpful hint to guide users through the documentation.",
  },
};

export const Warning: Story = {
  args: {
    type: "warning",
    title: "Warning",
    children: "Be careful when modifying these settings as they can affect system stability.",
  },
};

export const Danger: Story = {
  args: {
    type: "danger",
    title: "Critical",
    children: "Deleting this resource is irreversible and will remove all associated data.",
  },
};
