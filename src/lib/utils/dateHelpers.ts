interface DateFormatOptions {
  includeDay?: boolean;
  includeMonth?: boolean;
  includeYear?: boolean;
  monthFormat?: "numeric" | "short" | "long";
  locale?: string;
}

export function formatDate(
  date: Date = new Date(),
  options: DateFormatOptions = {}
): string {
  const {
    includeDay = true,
    includeMonth = true,
    includeYear = true,
    monthFormat = "long",
    locale = "en-US",
  } = options;

  const formatOptions: Intl.DateTimeFormatOptions = {};

  if (includeMonth) {
    formatOptions.month = monthFormat;
  }

  if (includeDay) {
    formatOptions.day = "numeric";
  }

  if (includeYear) {
    formatOptions.year = "numeric";
  }

  return date.toLocaleDateString(locale, formatOptions);
}

export function formatHeaderDate(date: Date = new Date()): string {
  return formatDate(date);
}

export function hasDatePrefix(text: string): boolean {
  // This regex pattern looks for common date formats at the start of the text
  const datePatterns = [
    // June 9, 2025 format
    /^\s*(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}/i,
    // 06/09/2025 format
    /^\s*\d{1,2}\/\d{1,2}\/\d{2,4}/,
    // 2025-06-09 format
    /^\s*\d{4}-\d{1,2}-\d{1,2}/,
  ];

  return datePatterns.some((pattern) => pattern.test(text));
}

export function ensureDatePrefix(text: string): string {
  if (!text || hasDatePrefix(text)) {
    return text;
  }

  const formattedDate = formatHeaderDate();
  return `${formattedDate}\n\n${text}`;
}

export function removeDatePrefix(text: string): string {
  if (!text) return "";

  return text.replace(
    /^\s*(?:(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}|(?:\d{1,2}\/\d{1,2}\/\d{2,4})|(?:\d{4}-\d{1,2}-\d{1,2}))\s*(?:\n+|\r\n+)/,
    ""
  );
}
