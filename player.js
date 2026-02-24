class Player {
	constructor(deck,isUser) {
		this.tableCards=deck.draw(6)
		this.handCards=[]
		this.knownCards=[]
		this.isUser=isUser

		const container=document.createElement("div")
		container.className="playerContainer"
		// Create UI for table cards
		const tableCardsDiv=this.tableCardsDiv=document.createElement("div")
		tableCardsDiv.className="tableCards"
		for (let i=0; i<this.tableCards.length; i++) {
			tableCardsDiv.appendChild(this.tableCards[i].render(i>2))
		}
		container.appendChild(tableCardsDiv)
		
		// Create UI for hand
		const handDiv=this.handDiv=document.createElement("div")
		handDiv.className="hand"
		
		container.appendChild(handDiv)
		
		if (isUser) document.getElementById("own").appendChild(container)
		else document.getElementsByTagName("main")[0].appendChild(container)

		for (let i=0; i<3; i++) this.drawCard()

	}
	drawCard() {
		if (deck.length==0) return 
		const newCard=deck.draw()
		
		this.addToHand(newCard)
	}
	addToHand(card) {
		// Add to hand UI
		const cardContainer=document.createElement("div")
		cardContainer.appendChild(card.render(this.isUser))
		cardContainer.style.setProperty("--card-number",this.handCards.length)
		
		if (this.isUser) cardContainer.onclick=() => {
			this.playCard(card)
		}
		
		this.handDiv.appendChild(cardContainer)
		this.handDiv.style.setProperty("--total-cards",this.handCards.length)

		this.handCards.push(card)
	}
	playCard(card) {
		if (canPlayCard(card)) {
			this.handCards.splice(this.handCards.indexOf(card),1)
			// update hand UI
			card.element.parentElement.remove()
			this.handDiv.style.setProperty("--total-cards",this.handCards.length-1)
			for (let i=0;i< this.handCards.length; i++) {
				this.handCards[i].element.parentElement.style.setProperty("--card-number",i)
			}
			
			tablePile.push(card)
			card.render()
			document.getElementById("tablePileDiv").appendChild(card.element)

			// handle special cards
			if (card.name==10) {
				clearPile()
			}else if (card.name!=2) {
				// if card is not 2 or 10, the turn is over
				this.endTurn()
			}
			
		}
	}
	drawPile() {
		for (let card of tablePile) {
			this.addToHand(card)
		}
		tablePile=[]
	}
	startTurn() {
		if (!this.isUser) {
			botPlay(this)
		}
	}
	
	endTurn() {
		if (deck.cards.length>0) {
			for (let i=this.handCards.length; i<3;i++) {
				this.drawCard()
			}
		}
		turn=(turn+1)%players.length
		players[turn].startTurn()
	}
}

function clearPile() {
	 discardPile.concat(tablePile)
	 for (let card of tablePile) {
		card.element.remove()
	 }
	 tablePile=[]
}

function canPlayCard(card) {
	// if there's no card on the table, anything can be played
	if (tablePile.length==0) return true
	
	const topCard=tablePile[tablePile.length-1]
	if (topCard.name==8) {
		// if the top card is 8, only cards ≤8 can be played next
		return card.number<=6
	}
	// 2, 8 and 10 are special cards which can be played anytime
	if (card.name==2 || card.name==8 || card.name==10) return true

	// default case: card can be played if it's higher than or equal to the top card
	return card.number>=topCard.number
	
}

function botPlay(player) {
	let availableCards=0
	for (let card of player.handCards) {
		if (canPlayCard(card)) {


		
			/* for debugging */
			let turn2=turn
			player.playCard(card)
			if (turn==turn2) botPlay(player)
			return 


			
			availableCards++
		}
	}
	if (availableCards==0) {
		// Has to draw the whole table pile into hand
		player.drawPile()
	}else if (availableCards==1) {
		// Play the only card possible
		
	}else{
		// Calculate possible cards opponents can play
		/*
			Objectives:
			- avoid being unable to play cards
				- only use special cards when necessary
			- get opponents to draw the table pile
				- play cards which the opponent cannot respond to
			- in endgame prioritize ability to play table cards
			
		*/
	}
}
