import { format } from "date-fns";
export const convertToDate = (date: string) => {
  return new Date(date);
};

export const toShortDate = (date: string | Date) => {
  const newDate = new Date(date);
  return format(newDate, "dd MMM");
};

export const toLongDate = (date: string | Date) => {
  const newDate = new Date(date);
  return format(newDate, "eee, d MMMM");
};

export const toDateTime = (date: string | Date) => {
  const newDate = new Date(date);
  return format(newDate, "yyyy-MM-dd HH:mm");
};
