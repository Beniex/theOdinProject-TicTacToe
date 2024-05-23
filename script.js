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
        if (victory == 0){
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
        for (let i=0; i<9; i++){
            gameboardState[i]=0; 
        }  
    }

    const InitializeOrResetGame = () => {
        victory = 0; 
        cleanGameboardState(); 
        gameTurn = 1; 
    }


    const detectVictoryPattern = (player) => {
        /*colonnes*/
        for (let i = 0; i < 3; i++) {
            if (gameboardState[i] === player &&
                gameboardState[i + 3] === player &&
                gameboardState[i + 6] === player) {
                return true; 
            }
        }
        /* lignes */
        const rowIndices = [0, 3, 6]; 
        for (let i = 0; i < rowIndices.length; i++) {
            const index = rowIndices[i]; 
            if (gameboardState[index] === player &&
                gameboardState[index + 1] === player &&
                gameboardState[index + 2] === player) {
                return true; 
            } 
        }
        /* diagonales */
        if (gameboardState[0] === player &&
            gameboardState[4] === player &&
            gameboardState[8] === player) {
            return true; 
        }
        if (gameboardState[2] === player &&
            gameboardState[4] === player &&
            gameboardState[6] === player) {
            return true; 
        }
        return false;
    };

    const checkVictory = () => {
        if (detectVictoryPattern(Player1) == true){
            victory = 1; 
        } else if( detectVictoryPattern(Player2) == true){
            victory =  2; 
        } else {
            victory = 0; 
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
/*
const GameBoard = (function(){
    const initialize = () => {
        for(let i=0; i<9; i++){
            var box; 

        }

    }

    const update = () => {

    }
    return {update, initialize}
})(); 

const VictoryDisplay = (function(){
    const update = () => {
        VictoryDisplayElement.textContent = gameboardState.getVictory(); 
    }
    return {update}
})(); 

const gameTurnDisplay = (function(){
    const update = () => {
        GameTurnDisplayElement.textContent = gameboardState.getGameTurn(); 
    }
    return {update}
})(); 

gameboardState = [0, 0, 0, 1, 1, 1, 0, 0, 0];
gameboardState = [0, 0, 0, 2, 2, 2, 0, 0, 0];


*/

console.log("c'est parti");
GameState.InitializeOrResetGame(); 
console.log(GameState.getGameboardState() + "gameBoard aprèqcoup");

console.log("c'est fini");
