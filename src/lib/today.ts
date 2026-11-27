import { cacheLife } from "next/cache";

/** Data de hoje (fuso de Rondonópolis), recalculada a cada hora. Usada para separar próximos e passados. */
export async function today(): Promise<string> {
  "use cache";
  cacheLife("hours");
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Cuiaba", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  return parts; // AAAA-MM-DD
}
