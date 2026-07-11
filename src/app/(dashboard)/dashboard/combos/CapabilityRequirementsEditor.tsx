"use client";

import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export interface CapabilityRequirements {
  requireVision?: boolean;
  requireToolCalling?: boolean;
  requireReasoning?: boolean;
  requireStructuredOutput?: boolean;
}

interface CapabilityRequirementsEditorProps {
  value?: CapabilityRequirements;
  onChange: (value: CapabilityRequirements) => void;
}

const CAPABILITY_DEFS = [
  {
    key: "requireVision" as const,
    label: "Vision",
    description: "Require vision-capable models (image input support)",
    tooltip: "Only route to models that support image analysis and vision inputs.",
  },
  {
    key: "requireToolCalling" as const,
    label: "Tool Calling",
    description: "Require tool/function calling support",
    tooltip: "Only route to models that support tool calling and function execution.",
  },
  {
    key: "requireReasoning" as const,
    label: "Reasoning",
    description: "Require reasoning-capable models",
    tooltip: "Only route to models with reasoning/thinking capabilities.",
  },
  {
    key: "requireStructuredOutput" as const,
    label: "Structured Output",
    description: "Require structured/JSON output support",
    tooltip: "Only route to models that support structured JSON output.",
  },
] as const;

export default function CapabilityRequirementsEditor({
  value = {},
  onChange,
}: CapabilityRequirementsEditorProps) {
  const activeCount = CAPABILITY_DEFS.filter((def) => value[def.key] === true).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Capability Requirements
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-sm">
                <p>
                  Filter combo targets by minimum model capabilities. Unlike request-based
                  compatibility checking, these hard requirements apply regardless of the request
                  body content.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
        <CardDescription>Restrict routing to models with specific capabilities</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {CAPABILITY_DEFS.map((def) => (
          <div key={def.key} className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label
                htmlFor={`cap-${def.key}`}
                className="flex items-center gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {def.label}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>{def.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </label>
              <p className="text-xs text-muted-foreground">{def.description}</p>
            </div>
            <Switch
              id={`cap-${def.key}`}
              checked={value[def.key] === true}
              onCheckedChange={(checked) => onChange({ ...value, [def.key]: checked })}
            />
          </div>
        ))}

        {activeCount > 0 && (
          <div className="rounded-lg bg-muted p-3 text-sm">
            <p className="font-medium">Active Requirements:</p>
            <ul className="mt-1 space-y-1 text-muted-foreground">
              {CAPABILITY_DEFS.filter((def) => value[def.key] === true).map((def) => (
                <li key={def.key}>• {def.label}: required</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
