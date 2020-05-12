class VideoGame{
    title:string;
    price:number;
    rating:string;
    isDigitalOnly:boolean;
}

window.onload = function(){
    let addBtn = <HTMLElement>document.querySelector("input[type=button]");
    addBtn.onclick = addVideoGame;

}
/**
 * Clears all errs in the validation summary
 */
function clearAllErrors(){
    let errSummary = getById("validation-summary");
    errSummary.innerText = "";
}

function addVideoGame(){
    console.log("Add video game was called");
    clearAllErrors();
    if(isAllDataValid()){
        let game = getVideoGame();
        displayGame(game);
    }
}
/**
 * Gets all game data from the form
 * and returns it in a VideoGame object.
 */
function getVideoGame():VideoGame{
    let game = new VideoGame();
    let titleInput = <HTMLInputElement>document.getElementById("title");
    game.title = titleInput.value;

    let priceInput = <HTMLInputElement>document.getElementById("price");
    game.price = parseFloat(priceInput.value);

    let ratingInput = <HTMLSelectElement>document.getElementById("rating");
    game.rating = ratingInput.value;

    let digitalOnly = <HTMLInputElement>document.getElementById("online");
    game.isDigitalOnly = digitalOnly.checked;
    /*if(digitalOnly.checked){
        game.isDigitalOnly = true;
    }
    else{
        game.isDigitalOnly = false;
    }*/

    return game;
}

function displayGame(myGame:VideoGame):void{
    let displayDiv = document.getElementById("display");

    // create h2 w/ game title
    let gameHeading = document.createElement("h2");
    gameHeading.innerText = myGame.title;

    // create paragraph w/ game details
    let gameInfo = document.createElement("p");
    let notDigitalDisplay = "";
    if(myGame.isDigitalOnly){
        notDigitalDisplay = "this is a digital only game";
    }
    else{
        notDigitalDisplay = "you can come buy a physical copy"
    }

    gameInfo.innerText = `${myGame.title} has a rating of ${myGame.rating}.
     It costs $${myGame.price.toFixed(2)} and ${notDigitalDisplay}.`;

    // add h2 to display
    displayDiv.appendChild(gameHeading);
    // add <p> game info
    displayDiv.appendChild(gameInfo)

}
function getById(id:string){
    return document.getElementById(id);
}
function getInputById(id:string):HTMLInputElement{
    return <HTMLInputElement>document.getElementById(id);
}
function isAllDataValid(){
    let isValid = true;

    let title = getInputById("title").value;
    if(title == ""){
        isValid = false;
        addErrorMessage("Title is required!");
    }

    let price = getInputById("price").value;
    let priceValue  = parseFloat(price);
    if(price == "" || isNaN(priceValue)){
        isValid = false;
        addErrorMessage("Price is required and must be a number.")
    }

    let rating = (<HTMLOptionElement>getById("rating")).value;
    if(rating == ""){
        isValid = false;
        addErrorMessage("You must choose a rating.")
    }

    return isValid;
}

function addErrorMessage(errMsg:string) {
    let errSummary = getById("validation-summary");
    let errItem = document.createElement("li");
    errItem.innerText = errMsg;
    errSummary.appendChild(errItem);
}
