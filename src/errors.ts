/**
 * The typed error used across every CarrotStock service. Carries a machine-readable
 * `code` so the API layer can map failures to responses. See CodeRabbit.md.
 */
export class AppError extends Error {
  constructor(public readonly code: string, message: string) {
    super(message);
    this.name = "AppError";
  }
}
