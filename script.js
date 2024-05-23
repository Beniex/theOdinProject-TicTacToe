const Player1 = 1; 
const Player2 = 2; 

const GameState = (function(){
    var gameboardState =[]; 
    var gameTurn; 
    var victory; 
    
    const playRound = (player, box) =>{
        gameboardState[box] = player;
        GameBoard.update(); 
        checkVictory();
        VictoryDisplay.update();   
        if (victory == 0){
            changeGameTurn(); 
        }
        gameTurnDisplay.update(); 
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
        VictoryDisplay.update();  
        cleanGameboardState(); 
        gameTurn = 1; 
        gameTurnDisplay.update(); 
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


 
const GameBoardElement = document.getElementById("gameBoard");
const VictoryDisplayElement = document.getElementById("victoryDisplay"); 
const GameTurnDisplayElement = document.getElementById("gameTurnDisplay");
const ResetElement = document.getElementById("reset"); 

const GameBoard = (function(){
    const initialize = () => {
        for(let i=0; i<9; i++){
            let box = document.createElement("div"); 
            box.addEventListener('click',function(){ 
                GameState.playRound(GameState.getGameTurn(),i);
            })
            GameBoardElement.appendChild(box); 

        }

    }

    const update = () => {
        for (let i=0; i<9; i++){ 
            if(GameState.getGameboardState()[i] == 1){
                GameBoardElement.querySelectorAll('div')[i] .classList.add('circle');
            } else if(GameState.getGameboardState()[i] == 2){
                GameBoardElement.querySelectorAll('div')[i] .classList.add('cross');
            } else if (GameState.getGameboardState()[i] == 0){
                GameBoardElement.querySelectorAll('div')[i].classList.remove('cross', 'circle');
            }
        }

    }
    return {update, initialize}
})(); 

const VictoryDisplay = (function(){
    const update = () => {
        VictoryDisplayElement.textContent = GameState.getVictory(); 
    }
    return {update}
})(); 

const gameTurnDisplay = (function(){
    const update = () => {
        GameTurnDisplayElement.textContent = GameState.getGameTurn(); 
    }
    return {update}
})();

const ResetButton = (function(){
    ResetElement.addEventListener('click', function(){
        GameState.InitializeOrResetGame();
        GameBoard.update();  
        VictoryDisplay.update(); 
        gameTurnDisplay.update(); 
    })
})();

/*
gameboardState = [0, 0, 0, 1, 1, 1, 0, 0, 0];
gameboardState = [0, 0, 0, 2, 2, 2, 0, 0, 0];
*/

console.log("c'est parti");
GameState.InitializeOrResetGame();
GameBoard.initialize();  
console.log("c'est fini");
