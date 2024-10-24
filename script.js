const boxes = document.querySelectorAll(".box")
const Gameinfo = document.querySelector(".game")
const newBtn = document.querySelector(".btn")

let currentPlayer; 
let gameGrid;

let winnerposition= [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function game(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box,index)=>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "All";
        box.classList = `box box${index+1}`;
        
    })
    newBtn.classList.remove("active");
    Gameinfo.innerText = `Current Player - ${currentPlayer}`;
}
game();
//game win
function checkGameOver(){
    let answer = "";
    winnerposition.forEach((position)=>{
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
            && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])){

                if(gameGrid[position[0]] === "X"){
                    answer = "X";
                
                }else{
                    answer = "O";
                }
                boxes.forEach((box)=>{
                    box.style.pointerEvents = "none"
                })
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
        }
    })
    if(answer !== ""){
        Gameinfo.innerText = `Winner Player - ${answer}`;
        newBtn.classList.add("active")
    }
    let count = 0;
    gameGrid.forEach((box)=>{
        if(box !== ""){
            count++;
        }
    })

    if(count === 9){
        Gameinfo.innerText = "Game Teid";
        newBtn.classList.add("active")
    }

}
//swapturn
function swapTurn() {
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }
    Gameinfo.innerText = `Current Player - ${currentPlayer}`;
}

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        //swap
        swapTurn();
        //game win
        checkGameOver();
    }
}
boxes.forEach((box, index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
})
newBtn.addEventListener("click",game)