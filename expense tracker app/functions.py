def menu():
    print("Menu:")
    print("1. Create New Tracker")
    print("2. Update Tracker")
    print("3. Exit")


def create_tracker():
    """Create a new tracker with the data 
    provided by the user."""
    title = input("Enter tracker title: ")
    currency = input("Choose a currency (USD, EUR): ")
    income = float(input("Enter your monthly income: ")) 
    return title, currency, income
