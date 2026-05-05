import type { Meta, StoryObj } from "@storybook/react";
import Tabs from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Docs/Tabs",
  component: Tabs,
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  args: {
    tabs: [
      {
        label: "Installation",
        content: '<div className="p-2">Run npm install to get started.</div>',
      },
      { label: "Configuration", content: '<div className="p-2">Edit your config.json file.</div>' },
      {
        label: "Usage",
        content: '<div className="p-2">Import the provider and start routing.</div>',
      },
    ],
  },
};
