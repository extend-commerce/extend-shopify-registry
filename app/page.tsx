"use client";

import * as React from "react";

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

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-[24rem] rounded-(--es-popover-radius) bg-(--es-surface) p-4 shadow-[0_0.0625rem_0_0_rgba(26,26,26,0.07),0_0_0_0.0325rem_rgba(0,0,0,0.08)]">
      {children}
    </div>
  );
}

export default function Home() {
  const [selected, setSelected] = React.useState<Customer | null>(null);

  return (
    <main className="flex min-h-svh flex-col items-center gap-8 py-16">
      <Card>
        <CustomerPicker
          customers={customers}
          onSelect={setSelected}
          onCreateNew={(q) => console.log("create", q)}
        />
      </Card>

      <Card>
        <CustomerPicker
          label="Main contact"
          placeholder="Search"
          customers={companyCustomers}
          onSelect={setSelected}
          onCreateNew={(q) => console.log("create", q)}
          createLabel="Add new customer"
        />
      </Card>

      {selected ? (
        <p className="text-(color:--es-text-secondary)">
          Selected: {selected.name}
        </p>
      ) : null}
    </main>
  );
}
