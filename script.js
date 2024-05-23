const Player1 = 1; 
const Player2 = 2; 

const VictoryDisplayElement = document.getElementById("victoryDisplay");  
const GameBoardElement = document.getElementById("gameBoard");
const GameTurnDisplayElement = document.getElementById("gameTurnDisplay");
const Reset = document.getElementById("reset"); 



const GameState = (function(){
    var gameboardState =[]; 
    var gameTurn; 
    var victory; 
    
    const playRound = (player, box) =>{
        gameboardState[box] = player;
        checkVictory(); 
        if (victory = false){
            changeGameTurn(); 
        }
    }

    const changeGameTurn = () =>{
        if(gameTurn == 1){
            gameTurn = 2; 
        } else if(gameTurn == 2){
            gameTurn = 1; 
        }
    }

    const cleanGameboardState = () =>{
        for (let i=0; i<9, i++;){
            gameboard[i]=0; 
        }  
    }

    const InitializeOrResetGame = () => {
        victory = 0; 
        cleanGameboardState(); 
        gameTurn = 1; 
    }

    const detectVictoryPattern = (player) =>{
        /* colonnes */
        for(let i=0; i<3, i++;){
            if (player == gameboardState[i] == gameboardState[i+3] == gameboardState[i+6]){
                return true; 
            }
        }
        /* rows */
        const rowIndices = [0,3, 6]; 
        for(let i = 0; i < rowIndices.length; i++){
            var index = rowIndices[i]; 
            if(player == gameboardState[index] == gameboardState[index+1] == gameboardState[index+2]){
                return true; 
            } 
        }
        /* diagonals */
        if (player == gameboardState[0] == gameboardState[4] == gameboardState[8]){
            return true; 
        }
        if (player == gameboardState[2] == gameboardState[4] == gameboardState[6]){
            return true; 
        }
    }

    const checkVictory = () => {
        if (detectVictoryPattern(Player1) == true){
            return 1; 
        } else if( detectVictoryPattern(Player2) == true){
            return 2; 
        } else {
            return 0; 
        }
    }

    const getVictory = () => victory; 
    const getGameTurn = () => gameTurn; 
    const getGameboardState = () => gameboardState; 

    return {
        playRound, 
        InitializeOrResetGame,
        getVictory,
        getGameTurn,
        getGameboardState,  
    } 
})(); 

const GameBoard = (function(){

    const initialize = () => {

    }

    return {
        update, 
        initialize,
    }
})(); 

const VictoryDisplay = (function(){

})(); 