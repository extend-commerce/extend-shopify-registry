"use client";

import * as React from "react";
import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { SearchIcon } from "@shopify/polaris-icons";

import { cn } from "@/lib/utils";
import "./extend-shopify-tokens.css";

/**
 * Polaris-styled combobox built on Base UI.
 * Anatomy mirrors Base UI Combobox: https://base-ui.com/react/components/combobox
 *
 * <Combobox items={...}>
 *   <ComboboxLabel>Customer</ComboboxLabel>
 *   <ComboboxControl placeholder="Search or create a customer" />
 *   <ComboboxContent>
 *     <ComboboxAction onClick={...} icon={PlusCircleIcon}>Create a new customer</ComboboxAction>
 *     <ComboboxList>
 *       {(item) => (
 *         <ComboboxItem key={item.id} value={item} disabled={...}>
 *           <ComboboxItemContent title={item.name} description={item.email} />
 *           <ComboboxItemSuffix>Already added</ComboboxItemSuffix>
 *         </ComboboxItem>
 *       )}
 *     </ComboboxList>
 *     <ComboboxEmpty>No customers found</ComboboxEmpty>
 *   </ComboboxContent>
 * </Combobox>
 */

/**
 * The popup anchors to the input wrapper (not the inner <input>) so it
 * matches the rendered field width, like the native picker.
 */
const AnchorContext = React.createContext<React.RefObject<HTMLDivElement | null> | null>(
  null
);

function Combobox<Value, Multiple extends boolean | undefined = false>(
  props: React.ComponentProps<typeof ComboboxPrimitive.Root<Value, Multiple>>
) {
  const anchorRef = React.useRef<HTMLDivElement | null>(null);
  return (
    <AnchorContext.Provider value={anchorRef}>
      <ComboboxPrimitive.Root {...props} />
    </AnchorContext.Provider>
  );
}

/* Base text style shared by every part that renders text. */
const baseText =
  "[font-family:var(--es-font-family)] text-(length:--es-font-size) leading-(--es-line-height) font-(--es-font-weight) tracking-(--es-letter-spacing) text-(color:--es-text) antialiased";

function ComboboxLabel({
  className,
  ...props
}: React.ComponentProps<"label">) {
  return (
    <label className={cn(baseText, "mb-1 block", className)} {...props} />
  );
}

/**
 * Input wrapper + magnifier icon + input, replicating s-search-field.
 * The hairline border is an inset box-shadow (as in the native component);
 * focus shows a 1px active border plus the 2px blue focus ring offset 1px.
 */
function ComboboxControl({
  className,
  inputClassName,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Input> & {
  inputClassName?: string;
}) {
  const anchorRef = React.useContext(AnchorContext);
  return (
    <div
      ref={anchorRef ?? undefined}
      className={cn(
        baseText,
        "flex items-center gap-(--es-input-gap) h-(--es-input-height) px-(--es-input-padding-inline) rounded-(--es-input-radius)",
        "bg-(--es-input-bg-surface) shadow-[inset_0_0_0_var(--es-input-border-width)_var(--es-input-border)]",
        "transition-[background-color,box-shadow] duration-100",
        "hover:bg-(--es-input-bg-surface-hover) hover:shadow-[inset_0_0_0_var(--es-input-border-width)_var(--es-input-border-hover)]",
        "focus-within:shadow-[inset_0_0_0_var(--es-input-border-width-active)_var(--es-input-border-active)]",
        "focus-within:outline-2 focus-within:outline-offset-(--es-focus-ring-offset) focus-within:outline-(color:--es-border-focus)",
        "[&_svg]:size-(--es-icon-size) [&_svg]:shrink-0 [&_svg]:fill-(--es-icon-secondary)",
        "hover:[&_svg]:fill-(--es-icon-secondary-hover) focus-within:[&_svg]:fill-(--es-icon-secondary-active)",
        className
      )}
    >
      <SearchIcon aria-hidden />
      <ComboboxPrimitive.Input
        className={cn(
          "h-(--es-line-height) w-full min-w-0 bg-transparent outline-none",
          "placeholder:text-(color:--es-text-secondary)",
          "disabled:text-(color:--es-text-disabled)",
          inputClassName
        )}
        {...props}
      />
    </div>
  );
}

/** Popover panel, replicating s-popover elevation, radius and clipping. */
function ComboboxContent({
  className,
  sideOffset = 4,
  children,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Positioner>) {
  const anchorRef = React.useContext(AnchorContext);
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        sideOffset={sideOffset}
        anchor={anchorRef ?? undefined}
        className="z-50"
        {...props}
      >
        <ComboboxPrimitive.Popup
          className={cn(
            baseText,
            "w-(--anchor-width) max-h-[min(24rem,var(--available-height))] overflow-y-auto overscroll-contain",
            "rounded-(--es-popover-radius) bg-(--es-surface) shadow-(--es-shadow-popover)",
            "data-starting-style:opacity-0 data-ending-style:opacity-0 transition-opacity duration-100",
            className
          )}
        >
          {children}
        </ComboboxPrimitive.Popup>
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  );
}

/**
 * Pinned action row ("⊕ Create a new customer"). Rendered as a static row
 * above the list, styled like the native gray action pill. Use onClick —
 * it is not part of the filterable collection.
 */
function ComboboxAction({
  className,
  icon: Icon,
  children,
  ...props
}: React.ComponentProps<"button"> & {
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}) {
  return (
    <div className="p-[0.375rem] pb-0">
      <button
        type="button"
        className={cn(
          baseText,
          "flex w-full items-center gap-(--es-input-gap) h-(--es-input-height) px-2 rounded-(--es-input-radius)",
          "bg-(--es-surface-tertiary) hover:bg-(--es-surface-tertiary-hover) active:bg-(--es-surface-tertiary-active)",
          "cursor-pointer outline-none focus-visible:outline-2 focus-visible:outline-offset-(--es-focus-ring-offset) focus-visible:outline-(color:--es-border-focus)",
          "[&_svg]:size-(--es-icon-size) [&_svg]:shrink-0 [&_svg]:fill-(--es-icon)",
          className
        )}
        {...props}
      >
        {Icon ? <Icon aria-hidden /> : null}
        {children}
      </button>
    </div>
  );
}

function ComboboxList<Value>({
  className,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.List> & {
  children?: React.ReactNode | ((item: Value, index: number) => React.ReactNode);
}) {
  return (
    <ComboboxPrimitive.List
      className={cn("py-[0.375rem] empty:hidden", className)}
      {...props}
    />
  );
}

/**
 * Option row. Rows are separated by a hairline; keyboard highlight and
 * hover use the transparent fill token, matching native option lists.
 */
function ComboboxItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Item>) {
  return (
    <ComboboxPrimitive.Item
      className={cn(
        baseText,
        "flex items-center gap-(--es-input-gap) px-(--es-input-padding-inline) py-2",
        "cursor-pointer select-none outline-none",
        "not-last:border-b not-last:border-(color:--es-border-subdued)",
        "data-highlighted:bg-(--es-fill-transparent-hover)",
        "data-disabled:cursor-default",
        "[&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:fill-(--es-icon-secondary)",
        className
      )}
      {...props}
    >
      {children}
    </ComboboxPrimitive.Item>
  );
}

/** Two-line item body: title + optional subdued description. */
function ComboboxItemContent({
  title,
  description,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  title: React.ReactNode;
  description?: React.ReactNode;
}) {
  return (
    <div className={cn("flex min-w-0 grow flex-col", className)} {...props}>
      <span className="truncate in-data-disabled:text-(color:--es-text-secondary)">
        {title}
      </span>
      {description != null ? (
        <span className="truncate text-(length:--es-font-size-small) leading-(--es-line-height-small) text-(color:--es-text-secondary) in-data-disabled:text-(color:--es-text-disabled)">
          {description}
        </span>
      ) : null}
    </div>
  );
}

/** Right-aligned subdued suffix, e.g. "Already added". */
function ComboboxItemSuffix({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "ml-auto shrink-0 text-(length:--es-font-size-small) leading-(--es-line-height-small) text-(color:--es-text-secondary)",
        className
      )}
      {...props}
    />
  );
}

function ComboboxEmpty({
  className,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Empty>) {
  return (
    <ComboboxPrimitive.Empty
      className={cn(
        baseText,
        "px-(--es-input-padding-inline) py-2 text-(color:--es-text-secondary) empty:hidden",
        className
      )}
      {...props}
    />
  );
}

/** Async status row (e.g. "Loading…"). */
function ComboboxStatus({
  className,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Status>) {
  return (
    <ComboboxPrimitive.Status
      className={cn(
        baseText,
        "px-(--es-input-padding-inline) py-2 text-(color:--es-text-secondary)",
        className
      )}
      {...props}
    />
  );
}

const ComboboxCollection = ComboboxPrimitive.Collection;

export {
  Combobox,
  ComboboxLabel,
  ComboboxControl,
  ComboboxContent,
  ComboboxAction,
  ComboboxList,
  ComboboxCollection,
  ComboboxItem,
  ComboboxItemContent,
  ComboboxItemSuffix,
  ComboboxEmpty,
  ComboboxStatus,
};
