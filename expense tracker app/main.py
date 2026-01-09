from functions import menu, create_tracker
from tracker import Tracker


while True:
    menu()
    user_choice = int(input("\nChoose an option (1-3): "))

    if user_choice == 1:
        title, currency, income = create_tracker()
        user_tracker = Tracker(title, currency, income)
        print(f"Tracker created successfully!")
    elif user_choice == 2:
        print("Update Tracker feature is under development!")
    elif user_choice == 3:
        print("Have a great day! Goodbye!")
        break
    else:
        print("Please provide a number between 1 and 3.")