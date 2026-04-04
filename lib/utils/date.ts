const monthFormatter = new Intl.DateTimeFormat("en-AU", {
  month: "long",
  year: "numeric",
  timeZone: "UTC"
});

const detailFormatter = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC"
});

const markerFormatter = new Intl.DateTimeFormat("en-AU", {
  day: "2-digit",
  month: "short",
  timeZone: "UTC"
});

export function parseDiaryDate(date: string) {
  const dateOnlyMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);

  if (dateOnlyMatch) {
    const [, year, month, day] = dateOnlyMatch;
    return new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
  }

  return new Date(date);
}

export function formatEntryDate(date: string) {
  return detailFormatter.format(parseDiaryDate(date));
}

export function formatTimelineMarker(date: string) {
  return markerFormatter.format(parseDiaryDate(date));
}

export function getTimelineMarkerParts(date: string) {
  const [day = "", month = ""] = formatTimelineMarker(date).split(" ");

  return {
    day,
    month: month.toUpperCase()
  };
}

export function getMonthKey(date: string) {
  const value = parseDiaryDate(date);
  return `${value.getUTCFullYear()}-${String(value.getUTCMonth() + 1).padStart(2, "0")}`;
}

export function getMonthLabel(date: string) {
  return monthFormatter.format(parseDiaryDate(date));
}

export function toDateOnlyString(date: Date) {
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}-${String(
    date.getUTCDate()
  ).padStart(2, "0")}`;
}

export function compareDiaryDates(left: string, right: string) {
  return parseDiaryDate(left).getTime() - parseDiaryDate(right).getTime();
}

export function startOfMonth(date: string) {
  const value = parseDiaryDate(date);
  return `${value.getUTCFullYear()}-${String(value.getUTCMonth() + 1).padStart(2, "0")}-01`;
}

export function endOfMonth(date: string) {
  const value = parseDiaryDate(startOfMonth(date));
  const nextMonth = new Date(Date.UTC(value.getUTCFullYear(), value.getUTCMonth() + 1, 0));
  return toDateOnlyString(nextMonth);
}

export function enumerateDays(startDate: string, endDate: string) {
  const dates: string[] = [];
  const cursor = parseDiaryDate(startDate);
  const end = parseDiaryDate(endDate);

  while (cursor.getTime() <= end.getTime()) {
    dates.push(toDateOnlyString(cursor));
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }

  return dates;
}

export function getWeekdayLabel(date: string) {
  return new Intl.DateTimeFormat("en-AU", {
    weekday: "short",
    timeZone: "UTC"
  }).format(parseDiaryDate(date));
}

export function getMonthShortLabel(date: string) {
  return new Intl.DateTimeFormat("en-AU", {
    month: "short",
    timeZone: "UTC"
  }).format(parseDiaryDate(date));
}

export function isDateInRange(date: string, startDate: string, endDate?: string) {
  const time = parseDiaryDate(date).getTime();
  const start = parseDiaryDate(startDate).getTime();
  const end = endDate ? parseDiaryDate(endDate).getTime() : Number.POSITIVE_INFINITY;

  return time >= start && time <= end;
}
