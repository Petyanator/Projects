import random

class Card:
    def __init__(self, rank, sign):
        self.rank = rank
        self.sign = sign
    
    def display(self):
        card_layout = [
            f"┌─────────┐",
            f"| {self.rank:<2}      |",
            f"|         |",
            f"|    {self.sign}    |",
            f"|         |",
            f"|      {self.rank:>2} |",
            f"└─────────┘"
        ]
        return card_layout

ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]
suits = ["♠", "♥", "♦", "♣"]

deck = [Card(rank, suit) for rank in ranks for suit in suits]

def determine_card_value(cards):
    value = 0
    aces = 0
    for card in cards:
        if card.rank in ["J", "Q", "K"]:
            value += 10
        elif card.rank == "A":
            value += 11
            aces += 1
        else:
            value += int(card.rank)
    
    while value > 21 and aces:
        value -= 10
        aces -= 1

    return value

def pull_card():
    card = deck.pop(random.randint(0, len(deck) - 1))  
    return card

def dealer_turn(dealer_hand):
    dealer_value = determine_card_value(dealer_hand)
    while dealer_value < 17:  
        new_card = pull_card()
        dealer_hand.append(new_card)
        dealer_value = determine_card_value(dealer_hand)
    
    return dealer_value

def display_hand(cards):
    card_rows = [""] * 7  # There are 7 lines in each card layout
    for card in cards:
        card_display = card.display()
        for i in range(7):
            card_rows[i] += card_display[i] + "  "  # Add spacing between cards

    return "\n".join(card_rows)

while True:
    deck = [Card(rank, suit) for rank in ranks for suit in suits]
    player_hand = [pull_card(), pull_card()]
    player_value = determine_card_value(player_hand)

    print(f"Player's hand value: {player_value}")
    print(display_hand(player_hand))
    
    dealer_hand = [pull_card(), pull_card()]

    print("Dealer's hand:")
    print("Hidden card")
    print(display_hand([dealer_hand[1]]))

    while True:
        if player_value > 21:
            print("Player busts! You lose.")
            break

        print("What do you want to do?\n1. Hit\n2. Stand")
        user_input = input()
        if user_input == "1":
            player_hand.append(pull_card())
            player_value = determine_card_value(player_hand)
            print(f"New hand value: {player_value}")
            print(display_hand(player_hand))
            if player_value > 21:
                print("Player busts! You lose.")
                break
        elif user_input == "2":
            dealer_value = dealer_turn(dealer_hand)
            print(f"Dealer's full hand value: {dealer_value}")
            print(display_hand(dealer_hand))

            if dealer_value > 21:
                print("Dealer busts! You win.")
            elif player_value > dealer_value:
                print("You win!")
            elif player_value < dealer_value:
                print("You lose.")
            else:
                print("It's a draw.")
            break

    play_again = input("Play again? (Y/N): ")
    if play_again.lower() != 'y':
        break