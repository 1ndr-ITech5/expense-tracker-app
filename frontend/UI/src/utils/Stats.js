const getDate = (item) => new Date(item.date || item.createdAt);

const sumAmounts = (items) => items.reduce((acc, item) => acc + item.amount, 0);

export const getExpenseStats = (expenses) => {
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();

    const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1;
    const lastMonthYear = thisMonth === 0 ? thisYear - 1 : thisYear;

    const today = sumAmounts(
        expenses.filter(item => getDate(item).toDateString() === now.toDateString())
    );

    const month = sumAmounts(
        expenses.filter(item => {
            const d = getDate(item);
            return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
        })
    );

    const previousMonth = sumAmounts(
        expenses.filter(item => {
            const d = getDate(item);
            return d.getMonth() === lastMonth && d.getFullYear() === lastMonthYear;
        })
    );

    return { today, month, lastMonth: previousMonth };
};