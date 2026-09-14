const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

/**
 * Formats a Post date as `Month Day, Year` using UTC semantics, so a Post
 * dated `2026-08-26` renders "August 26, 2026" in every host timezone and is
 * never localized to the previous calendar day.
 */
export function formatPostDate(value: string | Date): string {
  const iso =
    value instanceof Date ? value.toISOString().slice(0, 10) : String(value).slice(0, 10);

  const match = ISO_DATE.exec(iso);
  if (!match) {
    throw new Error(`Invalid date: ${String(value)}`);
  }

  const [, year, month, day] = match;
  return new Date(Date.UTC(Number(year), Number(month) - 1, Number(day))).toLocaleDateString(
    "en-US",
    {
      timeZone: "UTC",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
}