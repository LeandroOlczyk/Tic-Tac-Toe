// Selecionar todos os atributos data-cell definidos no grid do HTML.
const cellElements = document.querySelectorAll("[data-cell]");

// Seleciona a board para realizar a variação entre o turno de "X" e "O".
const board = document.querySelector("[data-board]");

// Seleciona a Tag de mensagem de vitória do HTML.
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');

// Seleciona a mensagem de vitória do HTML.
const winningMessage = document.querySelector('[data-winning-message]');

// Seleciona o botão de Reiniciar do HTML para inserir uma função.
const restartButton = document.querySelector('[data-restart-button]');

// Variável utilizada para verificar quem vai realizar a jogada atual.
let isCircleTurn;

// Combinações de vitória para finalizar o jogo.
const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const startGame = () => {
    // Adicionar "X" ou "O" somente na primeira vez que clicar no elemento do grid.
    for (const cell of cellElements) {
        cell.classList.remove('x');
        cell.classList.remove('circle');
        cell.removeEventListener("click",handleClick);
        cell.addEventListener("click",handleClick,{once:true});
    }
    
    isCircleTurn = false;  // Define o Click da primeira jogada como "X".
    board.classList.add('x'); // Define o Hover da primeira jogada como "X".

    winningMessage.classList.remove('show-winning-message');
    setBoardHoverClass();
};

// Valida se há vencedor da partida ou se houve um empate.
const endGame = (isDraw) => {
    if (isDraw){
        winningMessageTextElement.innerText = 'Empate!'
    } else {
        winningMessageTextElement.innerText = isCircleTurn ? '"O" Venceu!' : '"X" Venceu!';
    }

    winningMessage.classList.add("show-winning-message");
};

// Verifica todas as celulas marcadas pelo jogador atual, e tenta encontrar as combinações de winningCombinations.
const checkForWin = (currentPlayer) => {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentPlayer);
        });
    });
};

// Verifica por empate.
const checkForDraw = () => {
    return [...cellElements].every( cell => {
        return cell.classList.contains('x') || cell.classList.contains('circle');
    });
};

// Função para registrar a marcação dos elementos.
const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
};

// Função para alterar o turno dos jogadores.
const swapTurn = () => {
    isCircleTurn= !isCircleTurn; // Alternando o isCircleTurn entre False e True.
    setBoardHoverClass();
};

const setBoardHoverClass = () => {
    board.classList.remove('circle'); // remove a formatação do CSS da classe "O".
    board.classList.remove('x');      // remove a formatação do CSS da classe "X".

    if (isCircleTurn) {
        board.classList.add('circle'); // adiciona a formatação do CSS da classe "O".
    } else {
        board.classList.add('x');      // adiciona a formatação do CSS da classe "X".
    }
};

const handleClick = (e) => {
    // Adicionar a marcação "X" ou "O".
    const cell = e.target;
    const classToAdd = isCircleTurn ? "circle" : "x"; 
    placeMark(cell, classToAdd);    

    // Verificar por Vitória.
    const isWin = checkForWin(classToAdd);
 
    // Verificar por Empate.
    const isDraw = checkForDraw();
 
    if (isWin){
        endGame(false); // Finaliza o jogo exibindo o vencedor.
    } else if (isDraw) {
        endGame(true); // Finalizar o jogo exibindo empate.
    } else {
        swapTurn(); //Alterar o Player da próxima rodada caso o jogo continue.
    }
};

// Inicia o jogo.
startGame();

// Botão de Reiniciar.
restartButton.addEventListener("click",startGame);