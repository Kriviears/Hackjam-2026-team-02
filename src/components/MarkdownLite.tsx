// src/components/MarkdownLite.tsx — tiny markdown renderer (bold + bullet lists + paragraphs).
import { Fragment } from "react";

function renderInline(text: string) {
  // split on **bold**
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

export function MarkdownLite({ text }: { text: string }) {
  const lines = text.split("\n");
  const blocks: React.ReactNode[] = [];
  let list: string[] = [];

  const flush = (key: string) => {
    if (list.length) {
      blocks.push(
        <ul key={key} className="my-2 list-disc space-y-1 pl-5">
          {list.map((item, i) => (
            <li key={i}>{renderInline(item)}</li>
          ))}
        </ul>,
      );
      list = [];
    }
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("- ")) {
      list.push(trimmed.slice(2));
    } else {
      flush(`list-${idx}`);
      if (trimmed) {
        blocks.push(
          <p key={`p-${idx}`} className="my-1">
            {renderInline(trimmed)}
          </p>,
        );
      }
    }
  });
  flush("list-end");

  return <div className="text-sm leading-relaxed text-muted-foreground">{blocks}</div>;
}
