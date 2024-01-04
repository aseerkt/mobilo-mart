export const addDaysToDate = (date: Date, daysToAdd: number) => {
  const dateInstance = new Date(date);
  dateInstance.setDate(dateInstance.getDate() + daysToAdd);
  return dateInstance;
};
