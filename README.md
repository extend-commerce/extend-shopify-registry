# extend-shopify registry

Components the Shopify admin has but Polaris doesn't ship — rebuilt on
[Base UI](https://base-ui.com) and Tailwind CSS v4, pixel-matched to the
current admin design (the `<s-*>` web components era), and distributed as a
[shadcn registry](https://ui.shadcn.com/docs/registry).

**Docs & live demo:** https://extend-shopify-registry.vercel.app

## Installation

Requires a React project with [shadcn initialized](https://ui.shadcn.com/docs/installation)
and Tailwind CSS v4.

Register the namespace once:

```bash
npx shadcn@latest registry add @extend-shopify=https://extend-shopify-registry.vercel.app/r/{name}.json
```

Then install components:

```bash
npx shadcn@latest add @extend-shopify/combobox
```

Direct URLs also work without configuration:

```bash
npx shadcn@latest add https://extend-shopify-registry.vercel.app/r/combobox.json
```

Installing a component also brings in `extend-shopify-tokens.css` (the design
token layer) and the `@base-ui/react` + `@shopify/polaris-icons` dependencies.

### Font

Inside the Shopify admin (App Home) InterVariable is already loaded. Outside
the admin, load the same stylesheet Shopify uses:

```html
<link rel="stylesheet" href="https://cdn.shopify.com/static/fonts/inter/v4/styles.css" />
```

## Components

| Item | Description |
| --- | --- |
| `combobox` | Composable combobox following the Base UI anatomy: search field with magnifier prefix, pinned action row, two-line options, disabled rows with suffix text, empty state, async filtering. Single-select. |
| `customer-picker` | Assembled block reproducing the admin customer picker (create-action row, customers with emails, disabled reasons). |

## How fidelity works

- `scripts/extract-tokens.mjs` mines the semantic design tokens straight from
  Shopify's `polaris.js` CDN bundle (the real values live in its CSS `var()`
  fallbacks) and emits `registry/extend-shopify/ui/extend-shopify-tokens.css`
  as `--es-*` variables. Re-run it when Shopify ships a design change:

  ```bash
  node scripts/extract-tokens.mjs
  ```

- Structural metrics (input height, radii, focus ring construction, the
  popover elevation shadow) are verified against live-rendered native
  components.
- The [/compare](https://extend-shopify-registry.vercel.app/compare) page
  renders the real Shopify web components next to ours; computed styles for
  the field, input, and label are identical.

## Development

```bash
pnpm install
pnpm dev              # docs site + demos on localhost:3000
pnpm registry:build   # rebuild public/r/*.json from registry.json
```

Not affiliated with Shopify. "Polaris" and the admin design belong to
Shopify; this project only helps your app match them.
