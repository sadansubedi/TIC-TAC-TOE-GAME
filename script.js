let gameActive = true;
let currentplayer = "X";
let opponentplayer ="O";
let gamestate = ['','','','','','','','',''];//, gamestate is an array that represents the current state of the game board
const winningcondition = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [0,4,8],
        [2,4,6],
        [2,5,8],
];
const statusDisplay = document.getElementById('status');
const statusDisplayloser = document.getElementById("loserstatus");

const winningmessage = function(){
    return currentplayer + "'s Wins !!";
}
const drawmessage = function(){
    return "Draw!";
}
const currentplayerturn = function(){
    return "It's " + currentplayer +" 's turn";
}
const losermessage = function(){
    return opponentplayer + "'s Lose  SAD!!";
}

document.querySelectorAll('.cell').forEach(function(cell){
    //console.log(cell);
    cell.addEventListener('click',cellclick);
});

document.querySelector('.restart').addEventListener('click',RestartGame);

function cellclick(clickedcellEvent){
    const clickedcell = clickedcellEvent.target;
    const clickedcellIndex = parseInt(clickedcell.getAttribute('id'));
    //console.log(clickedcellIndex); 
    if(gamestate[clickedcellIndex] !== '' || !gameActive)
//checks if the cell that was clicked is already occupied by a player ("X" or "O").If it is,
// then the player cannot play in that cell and also if gameactive is false
    {                                                        
      return;
    } 
    Cellplayed(clickedcell,clickedcellIndex);
    ResultValidation();

}
function Cellplayed(clickedcell,clickedcellIndex){
    gamestate[clickedcellIndex] = currentplayer;
    clickedcell.innerHTML = currentplayer;
}
statusDisplay.innerHTML = currentplayerturn();

function playerchange(){
    if(currentplayer == 'X'){
        currentplayer = 'O';
        opponentplayer ='X';
    }
    else{
        currentplayer = 'X';
        opponentplayer = 'O';
    }
    statusDisplay.innerHTML = currentplayerturn();
}

function ResultValidation(){
    let roundwon =false;
     for(let i =0; i<=7; i++){
        const wincondition = winningcondition[i];//[0,1,2]
        let a = gamestate[wincondition[0]];
        let b = gamestate[wincondition[1]];
        let c = gamestate[wincondition[2]];
        if(a ===''|| b==='' || c===''){
            continue;
        }
        if(a === b && b === c){
            roundwon = true;
            break;
        }
     }
    if(roundwon){
        statusDisplay.innerHTML = winningmessage();
        statusDisplayloser.innerHTML = losermessage();
        gameActive = false;
        return;
    }
 // checks if there are any empty cells left in the game board. If there are no empty cells left,
 // it means that all the cells have been filled with either "X" or "O" without any player winning, which results in a draw
    let roundDraw = !gamestate.includes('');
                        
    if(roundDraw){
        statusDisplay.innerHTML = drawmessage();
        gameActive = false;
        return;
    }
    playerchange();
}
function RestartGame() {
    gameActive = true;
    currentplayer = "X";
    opponentplayer ="O";
    gamestate = ['','','','','','','','',''];
    document.querySelectorAll('.cell').forEach(function(cell){
      cell.innerHTML = '';
    });
    statusDisplay.innerHTML = currentplayerturn();
  }