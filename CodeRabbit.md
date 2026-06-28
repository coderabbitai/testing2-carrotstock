# CarrotStock Engineering Standards

CodeRabbit uses this document as a knowledge base when reviewing CarrotStock pull
requests. Every contribution is expected to follow these conventions.

## Error handling

Throw the typed `AppError` (defined in `src/errors.ts`) for every service-layer
failure. A bare `Error` is **not** acceptable: it drops the machine-readable `code`
that our API layer and client SDK rely on to map failures to HTTP responses.

## Architecture context

- CarrotStock is multi-tenant. Treat every tenant's inventory as strictly isolated;
  data access is always scoped by `tenantId`.
- Monetary amounts are stored and computed as integer cents (the `Money` type).
