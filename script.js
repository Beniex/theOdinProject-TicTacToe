const player1 = 1; 
const player2 = 2; 


const GameState = (function(){
    var gameboard =[]; 
    var gameTurn; 
    var victory; 
    
    const playRound = (player, box) =>{
        gameboard[box] = parseInt(player);
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

    const cleanGameboard = () =>{
        for (let i=0; i<9, i++;){
            gameboard[i]=0; 
        }  
    }

    const InitializeOrResetGame = () => {
        victory = 0; 
        cleanGameboard(); 
        gameTurn = 1; 
    }

    const detectVictoryPattern = (player) =>{
        /* colonnes */
        for(let i=0; i<3, i++;){
            if (player == gameboard[i] == gameboard[i+3] == gameboard[i+6]){
                return true; 
            }
        }
        /* rows */
        const rowIndices = [0,3, 6]; 
        for(let i = 0; i < rowIndices.length; i++){
            var index = rowIndices[i]; 
            if(player == gameboard[index] == gameboard[index+1] == gameboard[index+2]){
                return true; 
            } 
        }
        /* diagonals */
        if (player == gameboard[0] == gameboard[4] == gameboard[8]){
            return true; 
        }
        if (player == gameboard[2] == gameboard[4] == gameboard[6]){
            return true; 
        }
    }

    const checkVictory = () => {
        if (detectVictoryPattern(player1) == true){
            return 1; 
        } else if( detectVictoryPattern(player2) == true){
            return 2; 
        } else {
            return 0; 
        }
    }

    const getVictory = () => victory; 
    const getGameTurn = () => gameTurn; 
    const getGameboard = () => gameboard; 

    return {
        playRound, 
        InitializeOrResetGame,
        getVictory,
        getGameTurn,
        getGameboard,  
    } 
})(); 

