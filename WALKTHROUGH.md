# 🥕 CarrotStock — CodeRabbit Certification Walkthrough

Welcome! This guide walks you through configuring and using CodeRabbit on a real
codebase — **CarrotStock**, a small multi-tenant carrot-inventory SaaS that ships with
bugs baked in on purpose.

Every lesson uses the same simple loop:

> **Hold the code constant. Change one thing. Re-review. Watch what changes.**

Because the code never changes between steps, any difference in the review is
attributable to the *one* configuration item you just added — that's the whole point.

---

## Before you begin

This guide assumes you've finished **Lesson 1 (Setup)**:

- ✅ You've **forked** this repository into your own GitHub account.
- ✅ You've **installed the CodeRabbit GitHub App** on your fork and it's watching the repo.
- ✅ You're signed in at [app.coderabbit.ai](https://app.coderabbit.ai).

> Haven't done that yet? Complete Lesson 1 first, then come back here.

### The branches

| Branch | What it is | Used in |
|---|---|---|
| `main` | The baseline. Feature files are scaffolded but not implemented. | PR base |
| `branch-a` | The feature implementation (with seeded bugs). | Lessons 2–3 |
| `branch-b` | A clean copy of `branch-a`. | Lessons 4–5 |

You'll work on `branch-a` for the first two lessons, then switch once to `branch-b`
for the configuration lessons. Everything runs through pull requests into `main`.

> 💡 Commands below use the [GitHub CLI](https://cli.github.com/) (`gh`). Prefer the
> web UI? Each step also describes the equivalent clicks on github.com.

---

## Lesson 2 — Your first review

**Goal:** open a pull request and understand how a CodeRabbit review works.

### Steps

1. **Open a PR from `branch-a` into `main`.**

   ```bash
   gh pr create --base main --head branch-a \
     --title "Implement inventory, ordering, and pricing" \
     --body "Fills in the inventory, ordering, and pricing modules."
   ```

   *Or in the UI:* go to your fork → **Pull requests** → **New pull request** → set
   **base = `main`**, **compare = `branch-a`** → **Create pull request**.

2. **Watch the automatic review run.** Within a minute or two CodeRabbit posts a
   review on the PR.

3. **Read the walkthrough** CodeRabbit posts at the top of the PR:
   - a high-level **summary** of the change,
   - a **changed-files** table,
   - a **sequence diagram** of the new flow.

4. **Read the inline comments.** These are the actionable findings, attached to
   specific lines. Notice they span all three languages in the repo — the TypeScript
   core, the React (`.tsx`) dashboard, and the Python (`.py`) workers — and that the
   severities vary, from small nits up to a serious security issue. Read a few closely.

5. **Find a committable suggestion — but don't apply it.** Many findings include a
   ready-to-commit code change with a **Commit suggestion** button, which lets GitHub
   commit the fix straight into the PR. Take a moment to see where it appears and how
   it works. **Don't click it here** — committing a fix now would change the code and
   pull you out of the review flow you're learning. Just understand that it's there for
   one-click fixes.

6. **Find the "Prompt for AI Agents" — but don't run it.** Expand the
   **🤖 Prompt for AI Agents** section on a finding. This is a ready-made prompt you
   could copy and hand to a coding agent (Claude Code, Cursor, etc.) to fix the issue
   locally. Note where it lives and how you'd copy it. You don't need to actually run
   it here — the goal is just to understand what it's for.

> ✅ **Checkpoint:** you received a review, read the walkthrough and the inline comments,
> and you know where committable suggestions and the **Prompt for AI Agents** live and
> what each is for. **Leave this PR open** — you'll use it in Lesson 3.

---

## Lesson 3 — Learnings

**Goal:** teach CodeRabbit a piece of tribal knowledge — context that lives in your
team's head and can't be inferred from the code — and watch it apply to every future
review.

Some findings *look* like problems but are actually fine, given context that isn't
anywhere in the codebase. CarrotStock has one: the nightly reorder job in
`services/reorder_report.py` wraps its per-product work in a broad `except` that skips
errors. CodeRabbit flags that as silently dropping products from the report — a fair
call from the code alone. But it's a **deliberate operational choice**: the batch must
never abort on one bad record, and the rationale (newly-onboarded SKUs don't have
thresholds yet; a separate backfill job handles them) lives in your team's head, not in
the code.

### Steps

1. On your Lesson 2 PR, **find the comment** on `services/reorder_report.py` about the
   broad `except` *silently dropping products from the reorder report*.

2. **Reply to that comment**, addressed to `@coderabbitai`, with your team's context.
   Paste this:

   > @coderabbitai The nightly reorder job intentionally catches and skips per-product
   > errors so one malformed record can't abort the whole batch. Missing thresholds are
   > expected for newly-onboarded SKUs and get backfilled by a separate job — this broad
   > catch is deliberate operational resilience, so please don't flag it.

3. **Wait for the `Learnings added` confirmation** from CodeRabbit.

4. **Trigger a fresh review** by commenting:

   ```text
   @coderabbitai full review
   ```

5. **Observe the delta:** the new review **no longer flags the broad `except`** in
   `services/reorder_report.py`, because the learning now carries the context that makes
   it an intentional decision.

6. *(Optional)* Confirm the learning was saved at
   [app.coderabbit.ai/learnings](https://app.coderabbit.ai/learnings).

> ✅ **Checkpoint:** a learning was created and visibly changed the re-review.

---

## Lesson 4 — Path instructions

**Goal:** scope a custom rule to your TypeScript files and watch the very first review
on a clean branch surface issues the default review ignored — with no manual re-review.

From here on you'll work on **`branch-b`**, a clean copy of `branch-a`. Your learning
from Lesson 3 carries over automatically (learnings are stored per-repo, not per-branch).

### Steps

1. **On `branch-b`, edit `.coderabbit.yaml`** and add a `path_instructions` block under
   `reviews`:

   ```yaml
   reviews:
     path_instructions:
       - path: "**/*.ts"
         instructions: >
           Flag any use of the `any` type; require a specific type or `unknown`
           with narrowing. Require explicit return type annotations on all
           exported functions. Flag non-null assertions (the `!` operator) and
           require explicit null handling instead.
   ```

   Commit this change to `branch-b`.

2. **Open a PR from `branch-b` into `main`:**

   ```bash
   gh pr create --base main --head branch-b \
     --title "Implement inventory, ordering, and pricing (configured)" \
     --body "Same implementation, reviewed with a TypeScript path instruction."
   ```

3. **Read the automatic review.** On the **first pass** — no `@coderabbitai full review`
   needed — CodeRabbit now flags the TypeScript convention violations in the `.ts` files
   (uses of `any`, exported functions missing return types, non-null `!` assertions).

4. **Compare with your Lesson 2 PR.** The exact same code was reviewed there *without*
   the instruction, and these convention issues were **not** flagged. The only thing
   that changed is the path instruction in your repo config.

> ✅ **Checkpoint:** the same code is flagged on `branch-b` but wasn't on `branch-a`,
> purely because the path instruction now lives in the repo config. **Keep this PR open**
> for Lesson 5.

---

## Lesson 5 — Knowledge base

**Goal:** register a standards file that CodeRabbit doesn't auto-detect, and watch it
shape the review.

This repo ships a `CodeRabbit.md` standards file that's sitting in the repo unused.
One of its rules: *throw the typed `AppError`, never a bare `Error`.* The default review
won't enforce that on its own — until you wire the file in as a knowledge base.

### Steps

1. **Stay on `branch-b`**, same PR. **Edit `.coderabbit.yaml`** and add a top-level
   `knowledge_base` block:

   ```yaml
   knowledge_base:
     code_guidelines:
       filePatterns:
         - "**/CodeRabbit.md"
   ```

   Commit this change to `branch-b`.

2. **Trigger a fresh review:**

   ```text
   @coderabbitai full review
   ```

3. **Observe the delta:** a new **standards-based finding** appears that the baseline
   missed — the one spot in `src/orders.ts` that throws a bare `Error` instead of the
   project's typed `AppError`.

> ⚠️ **Gotcha worth knowing:** register guideline files under
> `knowledge_base.code_guidelines.filePatterns`, **not** `path_instructions`. Putting the
> filename in `path_instructions` tells CodeRabbit to *review that file as code* rather
> than *use it as a standard*. Also: file patterns are **case-sensitive**.

> ✅ **Checkpoint:** a standards-based finding appeared only after you registered the
> `CodeRabbit.md` file.

### Module payoff

Flip between your **`branch-a`** PR (Lesson 2) and your **`branch-b`** PR. Same code,
two very different reviews: `branch-b` now reflects your learning, your path
instructions, **and** your knowledge base — all at once, on a clean thread. That's the
power of configuration with the code held constant.

---

## What's next

You've configured the three review-shaping features. Coming up in the rest of the
course:

- **Lesson 6 — Integrations:** enrich a review with issue (Jira/Linear/GitHub) and CI/CD
  context.
- **Lesson 7 — Multi-repo:** catch a breaking change that only matters across
  repositories.

🐇 Happy reviewing!
