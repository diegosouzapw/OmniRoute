import { act } from "react";
import { createRoot, type Root } from "react-dom/client";

export function createReactRootRegistry() {
  const roots = new Map<HTMLElement, Root>();
  return {
    createRoot(container: HTMLElement) {
      if (roots.has(container)) throw new Error("Fixture container already has a root");
      const root = createRoot(container);
      roots.set(container, root);
      return root;
    },
    async cleanup() {
      for (const [container, root] of roots) {
        await act(async () => root.unmount());
        container.remove();
        roots.delete(container);
      }
    },
  };
}
