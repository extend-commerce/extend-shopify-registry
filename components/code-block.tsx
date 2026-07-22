"use client";

import * as React from "react";

export function CodeBlock({
  code,
  lang = "bash",
}: {
  code: string;
  lang?: string;
}) {
  const [copied, setCopied] = React.useState(false);

  return (
    <div className="group relative rounded-(--es-input-radius) bg-[#1a1a1a]">
      <pre className="overflow-x-auto p-3 pr-16 text-[0.75rem] leading-4 text-[#e3e3e3]">
        <code data-lang={lang}>{code}</code>
      </pre>
      <button
        type="button"
        onClick={() => {
          navigator.clipboard.writeText(code);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
        className="absolute right-2 top-2 cursor-pointer rounded-md bg-[#303030] px-2 py-1 text-[0.6875rem] text-[#e3e3e3] opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
