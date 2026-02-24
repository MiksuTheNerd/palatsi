let turn=0
let players=[]
let deck=null
let discardPile=[]
let tablePile=[]

const MIN_PLAYERS=2
const MAX_PLAYERS=5
let playerCount=MIN_PLAYERS;

function init() {
	const TITLE_TEXT=document.getElementById("titleEl").innerText
	document.getElementById("titleEl").innerText=""
	// Generate title
	for (let i=0; i<TITLE_TEXT.length; i++) {
		let span=document.createElement("span")
		span.innerText=TITLE_TEXT[i]
		span.style.rotate=((i/(TITLE_TEXT.length-1)-0.5))* 70+"deg"
		span.style.animationDelay=i/TITLE_TEXT.length*150+"ms"
		document.getElementById("titleEl").appendChild(span)
	}
	// Generate options for player count
	
	for (let i=MIN_PLAYERS; i<=MAX_PLAYERS; i++) {
		let btn=document.createElement("button")
		btn.innerText=i
		if (i==MIN_PLAYERS) btn.className="selected"
		
		btn.onclick=function () {
			document.getElementById("playerCount")
				.getElementsByTagName("button")[playerCount-MIN_PLAYERS].className=""
			
			btn.className="selected"
			playerCount=i
		}
		document.getElementById("playerCount").appendChild(btn)

	}
	
}
function startGame() {
	document.getElementById("start").style.display="none"
	deck=new Deck()
	deck.shuffle()
	for (let i=0; i<playerCount; i++) {
		players.push(new Player(deck, i==0))
	}
	
}
init()

