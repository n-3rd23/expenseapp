export const getFirstLastDate = (date: Date) => {
  const firstDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    1,
    0,
    0,
    0,
    0
  );
  const lastDate = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0,
    0,
    0,
    0,
    0
  );
  return {
    firstDate,
    lastDate,
  };
};
