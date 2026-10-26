amsh# 🥕 CarrotStock

CarrotStock is a (fictional) multi-tenant SaaS for managing carrot inventory across
rabbit warrens — stock levels, reorder alerts, ordering, and tiered enterprise pricing.

This repository is the hands-on project for the **CodeRabbit Certification** course.
You'll fork it, open a pull request, and watch CodeRabbit review real code.

> 👉 **Start here:** follow the step-by-step [**WALKTHROUGH.md**](./WALKTHROUGH.md).

## Stack

- **TypeScript** core domain — `src/`
- **React (TSX)** dashboard — `web/`
- **Python** backend workers — `services/`

## Layout

| Path | What it does |
|---|---|
| `src/types.ts` | Domain types: tenants, products, orders, money |
| `src/errors.ts` | `AppError`, the typed error used across services |
| `src/inventory.ts` | Stock levels, availability, reorder checks |
| `src/orders.ts` | Order validation and placement |
| `src/pricing.ts` | Order pricing and enterprise discounts |
| `web/InventoryDashboard.tsx` | Inventory table with reorder badges |
| `web/OrderForm.tsx` | New-order form |
| `services/reorder_report.py` | Nightly low-stock report |
| `services/pricing_sync.py` | Syncs pricing to the billing system |

## Branches

- `main` — the baseline. Feature files are scaffolded but not yet implemented.
- `branch-a` — implements inventory, ordering, and pricing. **Open a PR from here into
  `main`** to trigger your first CodeRabbit review.
- `branch-b` — a clean copy of `branch-a` used later in the course for the
  configuration lessons.

## Local checks

```bash
npm install
npm run typecheck            # tsc --noEmit
python -m py_compile services/*.py
```

> CarrotStock is a teaching sandbox: the feature branches intentionally contain bugs
> for CodeRabbit to find. Please don't deploy it to your warren. 🐇
