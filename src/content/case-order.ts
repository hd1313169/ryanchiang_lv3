/** Display order of case studies (homepage list and next/prev links).
 *  Reorder here only — case ids, URLs and asset paths stay unchanged. */
export const CASE_ORDER = ["05", "02", "01", "04", "03"];

/** Sorts entries by CASE_ORDER, failing the build if the list and the
 *  collection drift apart (missing, unknown or duplicated ids). */
export function sortByCaseOrder<T extends { id: string }>(entries: T[]): T[] {
  const ids = entries.map((e) => e.id);
  const duplicated = CASE_ORDER.filter((id, i) => CASE_ORDER.indexOf(id) !== i);
  const unknown = CASE_ORDER.filter((id) => !ids.includes(id));
  const missing = ids.filter((id) => !CASE_ORDER.includes(id));
  if (duplicated.length || unknown.length || missing.length) {
    throw new Error(
      `CASE_ORDER is out of sync with src/content/case-studies — ` +
        `missing: [${missing}], unknown: [${unknown}], duplicated: [${duplicated}]`
    );
  }
  return [...entries].sort((a, b) => CASE_ORDER.indexOf(a.id) - CASE_ORDER.indexOf(b.id));
}
