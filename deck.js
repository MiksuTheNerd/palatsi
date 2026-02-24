class Deck {
	constructor() {
		this.cards=[]
		for (let suit=0; suit<4; suit++) {
			for (let n=0; n<13;n++) {
				this.cards.push(new Card(suit,n))
			}
		}
	}
	shuffle() {
		for (let i = this.cards.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]]; // Swap elements
		}
	}
	draw(n=1) {
		if (n==1) return this.cards.shift() // return a card
		return this.cards.splice(0,n) // return an array of cards
	}
}
