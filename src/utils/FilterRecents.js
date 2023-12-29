/** @format */

function RecentExpensesFunction(today, days) {
  const ChectDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - days
  );

  return ChectDate;
}
export default RecentExpensesFunction;
