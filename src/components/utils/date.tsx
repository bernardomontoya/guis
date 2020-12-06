export const getCurrentDate = () => {
  return new Date(Date.now()).toLocaleDateString();
};

export const formatDate = (date: string, to: string) => {
  return date.replace(/\//g, to);
};

export const isValidDate = (date: string) => {
  const expression = /^(0[1-9]|[12][0-9]|3[01]|[1-9])[.](0[1-9]|1[012]|[1-9])[.]20[2-9]\d$/;
  return expression.test(date);
};

export const isDateMoreRecent = (
  olderDate: string,
  newerDate: string,
  oneWay: boolean
) => {
  if (oneWay) {
    return true;
  }
  const parsedOlderDate = new Date(formatDate(olderDate, "/")).getTime();
  const paredNewerDate = new Date(formatDate(newerDate, "/")).getTime();
  return parsedOlderDate <= paredNewerDate;
};
