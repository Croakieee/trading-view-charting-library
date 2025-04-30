type DateFormat = "YYYYMMDD" | "YYYYMMDDHHMM" | "MMDDHHMM" | "MMDD" | "HHMM";

export const formatTime = (timestamp: number, format: DateFormat, sep = "-"): string => {
  if (!timestamp) return "";

  const offset = 8 * 60 * 60 * 1000;
  const dateISO = new Date(timestamp * 1000 + offset).toISOString();
  const [date, timeISO] = dateISO.split("T");
  const time = timeISO.slice(0, 5);
  const [YYYY, MM, DD] = date.split("-");

  if (format === "YYYYMMDDHHMM") return `${date} ${time}`;
  if (format === "YYYYMMDD") return [YYYY, MM, DD].join(sep);
  if (format === "MMDDHHMM") return `${MM}${sep}${DD} ${time}`;
  if (format === "MMDD") return `${MM}${sep}${DD}`;
  if (format === "HHMM") return time;

  return date;
};
