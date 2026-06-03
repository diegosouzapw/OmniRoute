// src/app/(dashboard)/dashboard/playground/page.tsx
// Server component shell — delegates to PlaygroundStudio client component.

import { Suspense } from "react";
import { PlaygroundStudio } from "./PlaygroundStudio";

export const dynamic = "force-dynamic";

export default function PlaygroundPage() {
  return (
    <Suspense fallback={null}>
      <PlaygroundStudio />
    </Suspense>
  );
}
