"use client";

import * as React from "react";
import Link from "next/link";

import { CodeBlock } from "@/components/code-block";
import {
  CustomerPicker,
  type Customer,
} from "@/registry/extend-shopify/blocks/customer-picker/customer-picker";

const customers: Customer[] = [
  { id: "1", name: "Ayumu Hirano", email: "ayumu.hirano@yopmail.com" },
  { id: "2", name: "Hasham Khalid", email: "hasham.khalid@yopmail.com" },
  { id: "3", name: "Karine Ruby", email: "karine.ruby@yopmail.com" },
  { id: "4", name: "Russell Winfield", email: "Russel.winfield@yopmail.com" },
];

const companyCustomers: Customer[] = [
  { ...customers[0], disabledReason: "Added to another company" },
  { ...customers[1], disabledReason: "Already added" },
  { ...customers[2], disabledReason: "Already added" },
  customers[3],
];

const USAGE_SNIPPET = `import {
  Combobox,
  ComboboxAction,
  ComboboxContent,
  ComboboxControl,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxItemContent,
  ComboboxItemSuffix,
  ComboboxLabel,
  ComboboxList,
} from "@/components/ui/combobox";
import { PlusCircleIcon } from "@shopify/polaris-icons";

<Combobox items={customers} itemToStringLabel={(c) => c.name}>
  <ComboboxLabel>Customer</ComboboxLabel>
  <ComboboxControl placeholder="Search or create a customer" />
  <ComboboxContent>
    <ComboboxAction icon={PlusCircleIcon} onClick={createCustomer}>
      Create a new customer
    </ComboboxAction>
    <ComboboxList>
      {(customer) => (
        <ComboboxItem
          key={customer.id}
          value={customer}
          disabled={Boolean(customer.disabledReason)}
        >
          <ComboboxItemContent
            title={customer.name}
            description={customer.email}
          />
          {customer.disabledReason ? (
            <ComboboxItemSuffix>{customer.disabledReason}</ComboboxItemSuffix>
          ) : null}
        </ComboboxItem>
      )}
    </ComboboxList>
    <ComboboxEmpty>No customers found</ComboboxEmpty>
  </ComboboxContent>
</Combobox>`;

const PARTS: Array<[name: string, description: string]> = [
  ["Combobox", "Root. Accepts every Base UI Combobox root prop (items, value, onValueChange, autoHighlight, …)."],
  ["ComboboxLabel", "Field label, associated via htmlFor."],
  ["ComboboxControl", "Search field: magnifier prefix, hairline border, hover and focus-ring states."],
  ["ComboboxContent", "Popup panel with the admin elevation shadow, anchored to the field width."],
  ["ComboboxAction", "Pinned gray action row above the list, e.g. “Create a new customer”. Not filtered; fires onClick."],
  ["ComboboxList", "Options list. Render prop receives each item from the root's items."],
  ["ComboboxItem", "Option row with hairline separators, highlight and disabled states."],
  ["ComboboxItemContent", "Two-line body: title plus subdued description."],
  ["ComboboxItemSuffix", "Right-aligned subdued suffix, e.g. “Already added”."],
  ["ComboboxEmpty", "Shown when the filter matches nothing."],
  ["ComboboxStatus", "Free-form status row for async loading."],
];

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-[0.9375rem] font-(--es-font-weight-bold)">{title}</h2>
      {children}
    </section>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-(--es-popover-radius) bg-(--es-surface) p-4 shadow-[0_0.0625rem_0_0_rgba(26,26,26,0.07),0_0_0_0.0325rem_rgba(0,0,0,0.08)]">
      {children}
    </div>
  );
}

export default function Home() {
  // Rendered origin defaults to the production URL and corrects itself on
  // the client, so copied commands always match the domain you're on.
  const [origin, setOrigin] = React.useState(
    "https://extend-shopify-registry.vercel.app"
  );
  React.useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const [selected, setSelected] = React.useState<Customer | null>(null);

  return (
    <main className="mx-auto flex min-h-svh w-full max-w-[44rem] flex-col gap-10 px-6 py-16">
      <header className="flex flex-col gap-3">
        <h1 className="text-[1.25rem] leading-7 font-(--es-font-weight-bold)">
          extend-shopify
        </h1>
        <p className="text-(color:--es-text-secondary)">
          Components the Shopify admin has but Polaris doesn&apos;t ship —
          rebuilt on{" "}
          <a
            className="text-(color:--es-text-link) hover:underline"
            href="https://base-ui.com"
          >
            Base UI
          </a>{" "}
          and Tailwind CSS, pixel-matched to the current admin design, and
          distributed as a{" "}
          <a
            className="text-(color:--es-text-link) hover:underline"
            href="https://ui.shadcn.com/docs/registry"
          >
            shadcn registry
          </a>
          . Design tokens are extracted from Shopify&apos;s own polaris.js
          bundle.{" "}
          <Link
            className="text-(color:--es-text-link) hover:underline"
            href="/compare"
          >
            See the native-vs-ours comparison
          </Link>
          .
        </p>
      </header>

      <Section title="Installation">
        <p>
          Requires a React project with{" "}
          <a
            className="text-(color:--es-text-link) hover:underline"
            href="https://ui.shadcn.com/docs/installation"
          >
            shadcn initialized
          </a>{" "}
          and Tailwind CSS v4. Register the namespace once:
        </p>
        <CodeBlock
          code={`npx shadcn@latest registry add @extend-shopify=${origin}/r/{name}.json`}
        />
        <p>
          — or add it to <code className="text-[0.75rem]">components.json</code>{" "}
          yourself:
        </p>
        <CodeBlock
          lang="json"
          code={`{
  "registries": {
    "@extend-shopify": "${origin}/r/{name}.json"
  }
}`}
        />
        <p>Then install components:</p>
        <CodeBlock code={`npx shadcn@latest add @extend-shopify/combobox`} />
        <p>
          Direct URLs work too, without any configuration:
        </p>
        <CodeBlock code={`npx shadcn@latest add ${origin}/r/combobox.json`} />
        <p className="text-(color:--es-text-secondary)">
          Installing a component also installs{" "}
          <code className="text-[0.75rem]">extend-shopify-tokens.css</code> —
          the design-token layer — plus the{" "}
          <code className="text-[0.75rem]">@base-ui/react</code> and{" "}
          <code className="text-[0.75rem]">@shopify/polaris-icons</code>{" "}
          dependencies.
        </p>
      </Section>

      <Section title="Font">
        <p>
          Inside the Shopify admin (App Home), InterVariable is already loaded
          and everything matches out of the box. Outside the admin, load the
          same stylesheet Shopify uses:
        </p>
        <CodeBlock
          lang="html"
          code={`<link rel="stylesheet" href="https://cdn.shopify.com/static/fonts/inter/v4/styles.css" />`}
        />
      </Section>

      <Section title="Combobox">
        <p>
          Composable combobox following the{" "}
          <a
            className="text-(color:--es-text-link) hover:underline"
            href="https://base-ui.com/react/components/combobox"
          >
            Base UI Combobox anatomy
          </a>
          : search field with magnifier prefix, pinned action row, two-line
          options, disabled rows with suffix text, empty state, async
          filtering. Single-select. Try it:
        </p>
        <Card>
          <div className="max-w-[24rem]">
            <CustomerPicker
              customers={customers}
              onSelect={setSelected}
              onCreateNew={(q) => console.log("create", q)}
            />
            {selected ? (
              <p className="mt-3 text-(color:--es-text-secondary)">
                Selected: {selected.name}
              </p>
            ) : null}
          </div>
        </Card>
        <Card>
          <div className="max-w-[24rem]">
            <CustomerPicker
              label="Main contact"
              placeholder="Search"
              customers={companyCustomers}
              onSelect={setSelected}
              onCreateNew={(q) => console.log("create", q)}
              createLabel="Add new customer"
            />
          </div>
        </Card>
        <CodeBlock lang="tsx" code={USAGE_SNIPPET} />
        <div className="overflow-x-auto rounded-(--es-input-radius) border border-(color:--es-border)">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-(color:--es-border) bg-(--es-surface-secondary)">
                <th className="px-3 py-2 font-(--es-font-weight-medium)">
                  Part
                </th>
                <th className="px-3 py-2 font-(--es-font-weight-medium)">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {PARTS.map(([name, description]) => (
                <tr
                  key={name}
                  className="border-b border-(color:--es-border-subdued) bg-(--es-surface) last:border-b-0"
                >
                  <td className="whitespace-nowrap px-3 py-2 align-top">
                    <code className="text-[0.75rem]">{name}</code>
                  </td>
                  <td className="px-3 py-2 text-(color:--es-text-secondary)">
                    {description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Customer Picker block">
        <p>
          The assembled pattern shown above — customers with emails,
          create-action row, disabled reasons — ships as a block you can start
          from:
        </p>
        <CodeBlock
          code={`npx shadcn@latest add @extend-shopify/customer-picker`}
        />
      </Section>

      <Section title="Design tokens">
        <p>
          Components style themselves with{" "}
          <code className="text-[0.75rem]">--es-*</code> CSS variables from{" "}
          <code className="text-[0.75rem]">extend-shopify-tokens.css</code>.
          The 100 semantic color tokens are extracted programmatically from
          Shopify&apos;s polaris.js bundle by{" "}
          <code className="text-[0.75rem]">scripts/extract-tokens.mjs</code>;
          structural metrics (heights, radii, the elevation shadow, the focus
          ring) are verified against live-rendered native components. When
          Shopify ships a design change, re-running the script refreshes the
          token layer.
        </p>
      </Section>

      <footer className="border-t border-(color:--es-border) pt-6 text-(color:--es-text-secondary)">
        <a
          className="text-(color:--es-text-link) hover:underline"
          href="https://github.com/extend-commerce/extend-shopify-registry"
        >
          GitHub
        </a>{" "}
        · Not affiliated with Shopify. &ldquo;Polaris&rdquo; and the admin
        design belong to Shopify; this project only helps your app match them.
      </footer>
    </main>
  );
}
