class Card {
	constructor(suit, number) {
		this.suit=suit
		this.number=number
		this.name=[2,3,4,5,6,7,8,9,10,"J","Q","K","A"][number]
		this.color=suit<2?"black":"red"
		this.element=null
	}
	/*
		front = number and suit is shown
		back = only plain card is shown, no information
	*/
	render(isNumberVisible=true) {
		if (this.element==null) this.element=document.createElement("div")
		if (!isNumberVisible) {
			this.element.innerHTML=""
			this.element.className="card back"
			this.element.style.color="white"
		}
		else {
			this.element.innerHTML='<span class="num">'+this.name
				+'</span><span class="suit">'
				+["&#9824;","&#9827;","&#9829;","&#9830;"][this.suit] // Get HTML char code for suit 
				+'</span><span class="num">'+this.name+'</span>'
			this.element.style.color=this.color
			this.element.className="card front"
		}
		return this.element
	}
}
