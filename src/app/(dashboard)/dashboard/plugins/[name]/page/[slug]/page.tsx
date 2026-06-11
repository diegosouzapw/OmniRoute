"use client";

import { useState, useEffect, use } from "react";
import { Card } from "@/shared/components";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface StructuredContent {
  type: string;
  [key: string]: unknown;
}

function PluginStructuredContent({ data }: { data: StructuredContent }) {
  if (data.type === "table") {
    const columns = (data.columns as string[]) || [];
    const rows = (data.rows as string[][]) || [];
    return (
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {columns.map((col: string) => (
              <th key={col} className="border p-2 text-left font-medium">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row: string[], i: number) => (
            <tr key={i}>
              {row.map((cell: string, j: number) => (
                <td key={j} className="border p-2">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  return <pre className="whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</pre>;
}

export default function PluginPagePage({
  params,
}: {
  params: Promise<{ name: string; slug: string }>;
}) {
  const { name, slug } = use(params);
  const t = useTranslations("plugins");
  const [content, setContent] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`/api/plugins/${name}/render?page=${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load plugin page");
        return res.json();
      })
      .then((data) => {
        setContent(data.content);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [name, slug]);

  if (loading) {
    return <div className="p-6">{t("loading")}</div>;
  }

  if (error) {
    return (
      <div className="p-6">
        <Link href={`/dashboard/plugins/${name}/config`} className="mb-4 flex items-center gap-2 text-blue-600 hover:underline">
          &larr; Back to config
        </Link>
        <Card className="p-4">
          <p className="text-red-500">{error}</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Link href={`/dashboard/plugins/${name}/config`} className="mb-4 inline-flex items-center gap-2 text-blue-600 hover:underline">
        &larr; Back to config
      </Link>
      <Card className="p-4">
        {typeof content === "string" ? (
          <div dangerouslySetInnerHTML={{ __html: content }} />
        ) : content && typeof content === "object" && "html" in (content as Record<string, unknown>) ? (
          <div dangerouslySetInnerHTML={{ __html: (content as Record<string, string>).html }} />
        ) : content && typeof content === "object" && "type" in (content as Record<string, unknown>) ? (
          <PluginStructuredContent data={content as StructuredContent} />
        ) : (
          <pre className="whitespace-pre-wrap">{JSON.stringify(content, null, 2)}</pre>
        )}
      </Card>
    </div>
  );
}