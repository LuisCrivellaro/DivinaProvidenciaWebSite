const TZ = "America/Cuiaba";

function toDate(iso: string) {
  // Meio-dia evita que o fuso desloque a data para o dia anterior.
  return new Date(`${iso}T12:00:00-04:00`);
}

const fmtDay = new Intl.DateTimeFormat("pt-BR", { day: "numeric", timeZone: TZ });
const fmtMonthShort = new Intl.DateTimeFormat("pt-BR", { month: "short", timeZone: TZ });
const fmtMonthLong = new Intl.DateTimeFormat("pt-BR", { month: "long", timeZone: TZ });
const fmtWeekday = new Intl.DateTimeFormat("pt-BR", { weekday: "short", timeZone: TZ });
const fmtFull = new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "long", year: "numeric", timeZone: TZ });
const fmtMonthYear = new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric", timeZone: TZ });

export const day = (iso: string) => fmtDay.format(toDate(iso));
export const monthShort = (iso: string) => fmtMonthShort.format(toDate(iso)).replace(".", "");
export const monthLong = (iso: string) => fmtMonthLong.format(toDate(iso));
export const weekday = (iso: string) => fmtWeekday.format(toDate(iso)).replace(".", "");
export const fullDate = (iso: string) => fmtFull.format(toDate(iso));
export const monthYear = (iso: string) => fmtMonthYear.format(toDate(iso));

/** "5 e 6 de dezembro de 2026", "29 de abril a 2 de maio de 2027", "22 a 28 de fevereiro de 2027" */
export function dateRange(start: string, end?: string) {
  if (!end || end === start) return fullDate(start);
  const [sy, sm] = start.split("-");
  const [ey, em, ed] = end.split("-");
  const sd = day(start);
  const consecutive = Number(ed) - Number(start.split("-")[2]) === 1;
  if (sy === ey && sm === em) {
    return `${sd} ${consecutive ? "e" : "a"} ${Number(ed)} de ${monthLong(end)} de ${ey}`;
  }
  if (sy === ey) return `${sd} de ${monthLong(start)} a ${Number(ed)} de ${monthLong(end)} de ${ey}`;
  return `${fullDate(start)} a ${fullDate(end)}`;
}

export const currency = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
