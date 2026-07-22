"use client";

import * as React from "react";
import { PlusCircleIcon } from "@shopify/polaris-icons";

import {
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
} from "@/registry/extend-shopify/ui/combobox";

export type Customer = {
  id: string;
  name: string;
  email: string;
  /** e.g. "Already added" | "Added to another company" — renders the row disabled */
  disabledReason?: string;
};

export function CustomerPicker({
  label = "Customer",
  placeholder = "Search or create a customer",
  customers,
  onSelect,
  onCreateNew,
  createLabel = "Create a new customer",
}: {
  label?: string;
  placeholder?: string;
  customers: Customer[];
  onSelect?: (customer: Customer) => void;
  onCreateNew?: (query: string) => void;
  createLabel?: string;
}) {
  const [query, setQuery] = React.useState("");
  const inputId = React.useId();

  return (
    <Combobox
      items={customers}
      autoHighlight
      itemToStringLabel={(c: Customer) => c.name}
      onValueChange={(c: Customer | null) => {
        if (c) onSelect?.(c);
      }}
      inputValue={query}
      onInputValueChange={setQuery}
    >
      <ComboboxLabel
        htmlFor={inputId}
        className="mb-2 font-(--es-font-weight-bold)"
      >
        {label}
      </ComboboxLabel>
      <ComboboxControl id={inputId} placeholder={placeholder} />
      <ComboboxContent>
        {onCreateNew ? (
          <ComboboxAction icon={PlusCircleIcon} onClick={() => onCreateNew(query)}>
            {createLabel}
          </ComboboxAction>
        ) : null}
        <ComboboxList>
          {(customer: Customer) => (
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
    </Combobox>
  );
}
