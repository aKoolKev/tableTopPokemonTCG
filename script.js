//stores card image source
const gardeviorDeckImg = [
    "GardeviorDeck_cardImages/artazon.png",
    "GardeviorDeck_cardImages/arven.png",
    "GardeviorDeck_cardImages/arven.png",
    "GardeviorDeck_cardImages/arven.png",
    "GardeviorDeck_cardImages/arven.png",
    "GardeviorDeck_cardImages/bosssOrders.png",
    "GardeviorDeck_cardImages/braveryCharm.png",
    "GardeviorDeck_cardImages/braveryCharm.png",
    "GardeviorDeck_cardImages/buddyBuddyPoffin.png",
    "GardeviorDeck_cardImages/buddyBuddyPoffin.png",
    "GardeviorDeck_cardImages/buddyBuddyPoffin.png",
    "GardeviorDeck_cardImages/buddyBuddyPoffin.png",
    "GardeviorDeck_cardImages/counterCatcher.png",
    "GardeviorDeck_cardImages/counterCatcher.png",
    "GardeviorDeck_cardImages/cresselia.png",
    "GardeviorDeck_cardImages/darkEnergy.png",
    "GardeviorDeck_cardImages/darkEnergy.png",
    "GardeviorDeck_cardImages/drifloon.png",
    "GardeviorDeck_cardImages/earthenVessel.png",
    "GardeviorDeck_cardImages/earthenVessel.png",
    "GardeviorDeck_cardImages/enhancedHammer.png",
    "GardeviorDeck_cardImages/flutterMane.png",
    "GardeviorDeck_cardImages/gardeviorEx.png",
    "GardeviorDeck_cardImages/gardeviorEx.png",
    "GardeviorDeck_cardImages/heavyBall.png",
    "GardeviorDeck_cardImages/hyperAroma.png",
    "GardeviorDeck_cardImages/iono.png",
    "GardeviorDeck_cardImages/iono.png",
    "GardeviorDeck_cardImages/iono.png",
    "GardeviorDeck_cardImages/iono.png",
    "GardeviorDeck_cardImages/kirlia.png",
    "GardeviorDeck_cardImages/kirlia.png",
    "GardeviorDeck_cardImages/kirlia.png",
    "GardeviorDeck_cardImages/kirlia.png",
    "GardeviorDeck_cardImages/klefki.png",
    "GardeviorDeck_cardImages/manaphy.png",
    "GardeviorDeck_cardImages/munkidori.png",
    "GardeviorDeck_cardImages/nestBall.png",
    "GardeviorDeck_cardImages/nestBall.png",
    "GardeviorDeck_cardImages/professorTurosScenario.png",
    "GardeviorDeck_cardImages/professorTurosScenario.png",
    "GardeviorDeck_cardImages/psychicEnergy.png",
    "GardeviorDeck_cardImages/psychicEnergy.png",
    "GardeviorDeck_cardImages/psychicEnergy.png",
    "GardeviorDeck_cardImages/psychicEnergy.png",
    "GardeviorDeck_cardImages/psychicEnergy.png",
    "GardeviorDeck_cardImages/psychicEnergy.png",
    "GardeviorDeck_cardImages/psychicEnergy.png",
    "GardeviorDeck_cardImages/radiantGreninja.png",
    "GardeviorDeck_cardImages/ralts.png",
    "GardeviorDeck_cardImages/ralts.png",
    "GardeviorDeck_cardImages/ralts.png",
    "GardeviorDeck_cardImages/ralts.png",
    "GardeviorDeck_cardImages/screamTail.png",
    "GardeviorDeck_cardImages/superRod.png",
    "GardeviorDeck_cardImages/superRod.png",
    "GardeviorDeck_cardImages/technicalMachineEvolution.png",
    "GardeviorDeck_cardImages/templeOfSinnoh.png",
    "GardeviorDeck_cardImages/ultraBall.png",
    "GardeviorDeck_cardImages/ultraBall.png"
];

//store card img object
let gardeviorDeck = [];

//card object
function Card (imgSrc) {

    //front side display
    this._imgFrontside = document.createElement('img'),
    this._imgFrontside.src = imgSrc,
    this._imgFrontside.addEventListener('mousedown', mouseDown);
    this._imgFrontside.addEventListener('dblclick', doubleClick);

    //backside display
    this._imgBackside = document.createElement('img');
    this._imgBackside.src = "pokemonCardBackside.png";
    this._imgBackside.addEventListener('mousedown', mouseDown);
    this._imgBackside.addEventListener('dblclick', doubleClick);
}


//for dragging img
let startX = 0;
let startY = 0;
let newX = 0;
let newY = 0;
let zIndexCounter = 1;

//making images draggable
function mouseDown(e) {
    e.preventDefault(); // Prevent default behavior like text selection

    startX = e.clientX;
    startY = e.clientY;

    const img = e.target; // Reference the specific image being dragged
    img.style.zIndex = zIndexCounter++;

    function mouseMove(e) {
        newX = startX - e.clientX;
        newY = startY - e.clientY;

        startX = e.clientX;
        startY = e.clientY;

        img.style.top = (img.offsetTop - newY) + 'px';
        img.style.left = (img.offsetLeft - newX) + 'px';
    }

    function mouseUp() {
        document.removeEventListener('mousemove', mouseMove);
        document.removeEventListener('mouseup', mouseUp);
    }

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);  
}

//unzoom on a card
function undoDoubleClick(e) {
    const img = e.target;
    img.style.transform = 'scale(1)'; // Example: Scale up the image
    img.style.transition = 'transform 0.3s ease';

    // Remove this event listener after it is triggered
    img.removeEventListener('dblclick', undoDoubleClick);
    img.addEventListener('dblclick', doubleClick); // Reattach the original doubleClick event
}

//zoom in on a card
function doubleClick(e){

    const img = e.target;
    
    img.style.transform = 'scale(2.5)'; // Example: Scale up the image
    img.style.transition = 'transform 0.3s ease';

    // Remove the original doubleClick event and attach undoDoubleClick
    img.removeEventListener('dblclick', doubleClick);
    img.addEventListener('dblclick', undoDoubleClick);
}

//set the card image
function loadDeck(){
    gardeviorDeckImg.forEach(imgSrc =>{
        //create image
        let newCard = new Card(imgSrc);
    
        gardeviorDeck.push(newCard);
    });
}

//shuffle the deck
function shuffleDeck(){
    const deckLength = gardeviorDeck.length;

    for(let i=0; i<deckLength; i++){
        let randIndex = Math.floor(Math.random() * deckLength);
        let temp = gardeviorDeck[i];
        gardeviorDeck[i] = gardeviorDeck[randIndex];
        gardeviorDeck[randIndex] = temp;
    }
}

//display the deck
function printDeck(){
    const board = document.getElementById("card-container");
    board.innerHTML = '';

    gardeviorDeck.forEach(card => {
        // let flipButtonEl = document.createElement('button');
        // flipButtonEl.innerHTML = 'Flip';
        // flipButtonEl.addEventListener('click', ()=>{
        //     alert("flip card");
        // });

        // let cardEl = document.createElement('div');
        // cardEl.append(card._imgBackside, flipButtonEl);

        // board.appendChild(cardEl);

        board.appendChild(card._imgBackside);
    });
}

window.onload = function() {
    loadDeck();
    shuffleDeck();
    shuffleDeck();
    shuffleDeck();
    printDeck();
}