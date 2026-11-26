export const applyFilters = (allExpenses, categoryFilter, dateFilter) => {
    // applying the category filter
    const filterByCategory = categoryFilter === "all" 
        ? allExpenses : allExpenses.filter(expense => expense.category === categoryFilter)

    // apply the timeline filter
    return filterByCategory.filter(expense => {
        const now = new Date();
        const expenseDate = new Date(expense.createdAt);

        switch (dateFilter) {
            case 'today':
                return expenseDate.toDateString() === now.toDateString();

            case 'week': {
                const startOfWeek = new Date(now);
                const day = now.getDay();
                const diff = day === 0 ? 6 : day - 1;
                startOfWeek.setDate(now.getDate() - diff);
                startOfWeek.setHours(0, 0, 0, 0);

                return expenseDate >= startOfWeek;
            }

            case 'month':
                return expenseDate.getMonth() === now.getMonth() &&
                    expenseDate.getFullYear() === now.getFullYear();

            default: // 'all'
                return true;
        }
    });
}