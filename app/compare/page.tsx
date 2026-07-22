"use client";

import * as React from "react";
import Script from "next/script";

import {
  Combobox,
  ComboboxControl,
  ComboboxLabel,
} from "@/registry/extend-shopify/ui/combobox";

/**
 * Side-by-side pixel comparison: native Shopify web components (left,
 * rendered by the real polaris.js bundle) vs our registry components
 * (right). Used by the Playwright visual tests.
 */

const NATIVE_HTML = `
  <s-search-field label="Customer" placeholder="Search or create a customer"></s-search-field>
`;

function NativePane() {
  return (
    <div
      data-testid="native-pane"
      dangerouslySetInnerHTML={{ __html: NATIVE_HTML }}
    />
  );
}

function OursPane() {
  return (
    <div data-testid="ours-pane">
      <Combobox items={[]}>
        <ComboboxLabel className="mb-1">Customer</ComboboxLabel>
        <ComboboxControl placeholder="Search or create a customer" />
      </Combobox>
    </div>
  );
}

export default function ComparePage() {
  const [nativeReady, setNativeReady] = React.useState(false);

  return (
    <main className="flex min-h-svh items-start justify-center gap-8 py-16">
      <Script
        src="https://cdn.shopify.com/shopifycloud/polaris.js"
        onReady={() => setNativeReady(true)}
      />
      <section className="w-[24rem]">
        <h2 className="mb-4 text-(color:--es-text-secondary)">
          Native (polaris.js) {nativeReady ? "" : "— loading…"}
        </h2>
        <div className="rounded-(--es-popover-radius) bg-(--es-surface) p-4">
          <NativePane />
        </div>
      </section>
      <section className="w-[24rem]">
        <h2 className="mb-4 text-(color:--es-text-secondary)">
          extend-shopify
        </h2>
        <div className="rounded-(--es-popover-radius) bg-(--es-surface) p-4">
          <OursPane />
        </div>
      </section>
    </main>
  );
}
