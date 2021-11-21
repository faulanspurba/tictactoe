const [...cell_elements] = document.querySelectorAll("[data-cell");
const board = document.querySelector("#board");
const X_CLASS = "x";
const O_CLASS = "o";
const WINNING_COMBINATION = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const winning_message = document.querySelector("#winning_message");
const winning_message_text = document.querySelector("[data-winning_message]");
const restart_button = document.querySelector("#restart_button");

let circle_turn;

cell_elements.forEach((cell) => {
  cell.addEventListener("click", handleClick, { once: true });
});

restart_button.addEventListener("click", startGame);

function startGame() {
  circle_turn = false;

  cell_elements.forEach((cell) => {
    cell.classList.remove(O_CLASS);
    cell.classList.remove(X_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick);
  });

  setBoardHoverClass();
  winning_message.classList.remove("show");
}

function handleClick(params) {
  const cell = params.target;
  const current_class = circle_turn ? O_CLASS : X_CLASS;
  //   place marks
  placeMark(cell, current_class);
  // check win
  if (checkWin(current_class)) {
    endGame(false);
  }
  // check draw
  else if (isDraw()) {
    endGame(true);
  }
  // switch turn
  else {
    switchTurn(circle_turn);
    setBoardHoverClass();
  }
}

function placeMark(cell, current_class) {
  cell.classList.add(current_class);
}

function switchTurn(e) {
  circle_turn = !circle_turn;
}

function setBoardHoverClass() {
  board.classList.remove(O_CLASS);
  board.classList.remove(X_CLASS);
  if (circle_turn) {
    board.classList.add(O_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

// cek if u win
function checkWin(current_class) {
  return WINNING_COMBINATION.some((combination) => {
    return combination.every((index) => {
      return cell_elements[index].classList.contains(current_class);
    });
  });
}

function endGame(draw) {
  if (draw) {
    winning_message_text.innerText = `Draw!!`;
  } else {
    winning_message_text.innerText = `${circle_turn ? "O's" : "X's"} Wins!!`;
  }
  winning_message.classList.add("show");
}

function isDraw() {
  return cell_elements.every((cell) => {
    return cell.classList.contains(O_CLASS) || cell.classList.contains(X_CLASS);
  });
}
