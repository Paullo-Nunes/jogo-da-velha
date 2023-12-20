//pegando todas as regiões

const boardRegions = document.querySelectorAll('#gameBoard span');

//tabuleiro virtual para guardar valores e faze verificação

let vBoard = [];

//jogador da vez

let turnPlayer = '';

//mostrar o nome do jogador 

function updateTitle() {
    const playerInput = document.getElementById(turnPlayer);
    document.getElementById('turnPlayer').innerText = playerInput.value;

};

function initializeGame() {
    vBoard = [['', '', ''], ['', '', ''], ['', '', '']];
    turnPlayer = 'player1';

    document.querySelector('h2').innerHTML ='vez de: <span id= "turnPlayer"></span>';
    updateTitle();
    boardRegions.forEach(function(element) {
        element.classList.remove('win');
        element.innerText ='';
        element.classList.add('cursor-pointer');
        element.addEventListener('click', handleBoardClick);
    });
};

//Obtendo a região vencedora

function getWinRegions() {
    const winRegions = [];

    //linhas horizontais

    if (vBoard[0][0] !== '' && vBoard[0][0] === vBoard[0][1] && vBoard[0][0] === vBoard[0][2])
    winRegions.push("0.0", "0.1", "0.2") //mostra as posições usadas para vencer 

    if (vBoard[1][0] !== '' && vBoard[1][0] === vBoard[1][1] && vBoard[1][0] === vBoard[1][2])
    winRegions.push("1.0", "1.1", "1.2")

    if (vBoard[2][0] !== '' && vBoard[2][0] === vBoard[2][1] && vBoard[2][0] === vBoard[2][2])
    winRegions.push("2.0", "2.1", "2.2")

    //linhas verticais

    if (vBoard[0][0] !== '' && vBoard[0][0] === vBoard[1][0] && vBoard[0][0] === vBoard[2][0])
    winRegions.push("0.0", "1.0", "2.0")

    if (vBoard[0][1] !== '' && vBoard[0][1] === vBoard[1][1] && vBoard[0][1] === vBoard[2][1])
    winRegions.push("0.1", "1.1", "2.1")

    if (vBoard[0][2] !== '' && vBoard[0][2] === vBoard[1][2] && vBoard[0][2] === vBoard[2][2])
    winRegions.push("0.2", "1.2", "2.2")

    //linhas diagonais

    if (vBoard[0][0] !== '' && vBoard[0][0] === vBoard[1][1] && vBoard[0][0] === vBoard[2][2])
    winRegions.push("0.0", "1.1", "2.2")

    if (vBoard[0][2] !== '' && vBoard[0][2] === vBoard[1][1] && vBoard[0][2] === vBoard[2][0])
    winRegions.push("0.2", "1.1", "2.0")

    return winRegions;

};

//desabilitando a região do click que envolve o elemento

function disableRegion(element) { 
    element.classList.remove('cursor-pointer');
    element.removeEventListener('click', handleBoardClick);
};

//lidando com as regiões vencedoras

function handleWin(regions) {
    regions.forEach(function(region){
        document.querySelector('[data-region = "'+ region +'"]').classList.add('win')
    });
    const playerName = document.getElementById(turnPlayer).value;
    document.querySelector('h2').innerHTML = playerName + 'Venceu!';
    
};


//função para quando o jogador clicar na região do tabuleiro

function handleBoardClick(ev) {
    const span = ev.currentTarget;
    const region = span.dataset.region;
    const rowColumnPair = region.split('.');
    const row = rowColumnPair[0];
    const column = rowColumnPair[1];
    if (turnPlayer === 'player1') { 
        span.innerText = 'X';
        vBoard[row][column] = 'X';

    } else { 
        span.innerText = 'O';
        vBoard[row][column] = 'O';

    };

    console.clear();
    console.table(vBoard);
    disableRegion(span);

    //alterando o jogador da vez

    const winRegions = getWinRegions();
    if (winRegions.length > 0) {
        document.querySelector('h2').innerHTML = 'Venceu!'
    } else if (vBoard.flat().includes('')) {
        turnPlayer = turnPlayer === 'player1' ? 'player2' : 'player1'
        updateTitle();
    } else {
        document.querySelector('h2').innerHTML = 'Empate!'
    }

};

document.getElementById('start').addEventListener('click', initializeGame);
