import { differenceInSeconds, formatDistance } from "date-fns";

function getDifference(date: Date) {
  return differenceInSeconds(new Date(), date);
}

interface FormatRelativeOptions {
  addSuffix?: boolean;
  includeSeconds?: boolean;
}

function formatRelative(date: Date, options?: FormatRelativeOptions) {
  const diff = getDifference(date);

  if (diff < 30) {
    return "now";
  } else {
    return formatDistance(date, new Date(), options);
  }
}

export { formatRelative };
