import { formatDistance } from "date-fns";

export const capitalizeString = (str: string) => {
  return str[0].toUpperCase() + str.slice(1);
};

export const getFormattedDateFromNow = (utcDate: number) =>
  formatDistance(new Date(utcDate * 1000), new Date(), { addSuffix: true });
