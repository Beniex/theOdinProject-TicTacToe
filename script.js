const Player1 = 1; 
const Player2 = 2; 
const Player1Name = prompt("Who's the first player?"); 
const Player2Name = prompt("Who's the second player?"); 
 

const GameState = (function(){
    var gameboardState =[]; 
    var gameTurn; 
    var victory; 
    var player1Score = 0; 
    var player2Score = 0;
    
    const playRound = (player, box) =>{
        gameboardState[box] = player;
        GameBoard.update(); 
        checkVictory();
        VictoryDisplay.update(); 
        ScorePlayerDisplay.update();   
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
        gameTurn = Math.floor(Math.random() * 2) + 1;
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
            GameState.plusPointPlayer1(); 
        } else if( detectVictoryPattern(Player2) == true){
            victory =  2; 
            GameState.plusPointPlayer2(); 
        } else {
            victory = 0; 
        }
    }

    const plusPointPlayer1 = () => {player1Score++}; 
    const plusPointPlayer2 = () => {player2Score++}; 

    const getVictory = () => victory; 
    const getGameTurn = () => gameTurn; 
    const getGameboardState = () => gameboardState; 
    const getPlayer1Score = () => player1Score; 
    const getPlayer2Score = () => player2Score; 

    return {
        playRound, 
        InitializeOrResetGame,
        getVictory,
        getGameTurn,
        getGameboardState,
        getPlayer1Score,
        getPlayer2Score, 
        plusPointPlayer1, 
        plusPointPlayer2 
    } 
})(); 


 
const GameBoardElement = document.getElementById("gameBoard");
const VictoryDisplayElement = document.getElementById("victoryDisplay"); 
const GameTurnDisplayElement = document.getElementById("gameTurnDisplay");
const ResetElement = document.getElementById("reset"); 
const ScorePlayer1Element = document.getElementById("scoreDisplay1");
const ScorePlayer2Element = document.getElementById("scoreDisplay2");


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
        if(GameState.getVictory()==1){
            VictoryDisplayElement.textContent = Player1Name + " won!"; 
        } else if (GameState.getVictory()==2){
            VictoryDisplayElement.textContent = Player2Name + " won!"; 
        } else if (GameState.getVictory()== 0){
            VictoryDisplayElement.textContent = "Let's play!";
        }
    }
    return {update}
})(); 

const gameTurnDisplay = (function(){
    const update = () => {
        if(GameState.getGameTurn() == 1 ){
            GameTurnDisplayElement.textContent = Player1Name + " plays!";
        } else if(GameState.getGameTurn() == 2 ){
            GameTurnDisplayElement.textContent = Player2Name + " plays!";
        }
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

const ScorePlayerDisplay = (function(){
    const update = () => {
        ScorePlayer1Element.textContent = Player1Name + " : " + GameState.getPlayer1Score();
        ScorePlayer2Element.textContent = Player2Name + " : " + GameState.getPlayer2Score();  
    }
    return {update}
})();


/*
gameboardState = [0, 0, 0, 1, 1, 1, 0, 0, 0];
gameboardState = [0, 0, 0, 2, 2, 2, 0, 0, 0];
*/

console.log("c'est parti");
GameState.InitializeOrResetGame();
GameBoard.initialize();  
console.log("c'est fini");
