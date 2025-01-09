import {React, useRef, useEffect} from 'react';
import s from './chess.module.css';

function Chess() {
    const TABLE_LENGTH = 8;
    const PIECES = {
        rook: {type: 'rook', color: '', position: [0,0]},
        knight: {type: 'knight', color: '', position: [0,0]},
        bishop: {type: 'bishop', color: '', position: [0,0]},
        queen: {type: 'queen', color: '', position: [0,0]},
        king: {type: 'king', color: '', position: [0,0]},
        pawn: {type: 'pawn', color: '', position: [0,0], has_moved: false},
    };

    let table = [];
    let started = false;
    let selected_piece = null;
    let turn_of = 'white';
    
    let chess_table = useRef();
    let chess_status = useRef();
    let start_btn = useRef();

    useEffect(() => {
        document.title = 'Chess';
    });

    function onClickStart(event) {
        let btn = event.target;

        if (!started) {
            btn.disabled = true;
            start();
        };
    };

    function getCellElementByIndex(row, cell) {
        let rows = Array.from(chess_table.current.firstChild.children);
        let cells;
        try {
            cells = rows[row].children;
        } catch (err) {
            console.log("An error has ocurred: " + err);
            return null;
        };
        let element;
        try {
            element = cells[cell];
        } catch (err) {
            console.log("An error has ocurred: " + err);
            return null;
        };
        return element;
    };

    function initTable() {
        table = [];
        for (let i = 0; i < TABLE_LENGTH; i++) {
            table[i] = [];
            for (let j = 0; j < TABLE_LENGTH; j++) {
                switch (i) {
                    case 0:
                        switch (j) {
                            case 0:
                            case TABLE_LENGTH - 1:
                                table[i][j] = {...PIECES.rook};
                                table[i][j].color = 'black';
                                table[i][j].position = [i, j];
                                break;
                            case 1:
                            case TABLE_LENGTH - 2:
                                table[i][j] = {...PIECES.knight};
                                table[i][j].color = 'black';
                                table[i][j].position = [i, j];
                                break;
                            case 2:
                            case TABLE_LENGTH - 3:
                                table[i][j] = {...PIECES.bishop};
                                table[i][j].color = 'black';
                                table[i][j].position = [i, j];
                                break;
                            case 3:
                                table[i][j] = {...PIECES.queen};
                                table[i][j].color = 'black';
                                table[i][j].position = [i, j];
                                break;
                            case 4:
                                table[i][j] = {...PIECES.king};
                                table[i][j].color = 'black';
                                table[i][j].position = [i, j];
                                break;
                            default:
                                break;
                        };
                        break;
                    case 1:
                        table[i][j] = {...PIECES.pawn};
                        table[i][j].color = 'black';
                        table[i][j].position = [i, j];
                        break;
                    case TABLE_LENGTH - 2:
                        table[i][j] = {...PIECES.pawn};
                        table[i][j].color = 'white';
                        table[i][j].position = [i, j];
                        break;
                    case TABLE_LENGTH - 1:
                        switch (j) {
                            case 0:
                            case TABLE_LENGTH - 1:
                                table[i][j] = {...PIECES.rook};
                                table[i][j].color = 'white';
                                table[i][j].position = [i, j];
                                break;
                            case 1:
                            case TABLE_LENGTH - 2:
                                table[i][j] = {...PIECES.knight};
                                table[i][j].color = 'white';
                                table[i][j].position = [i, j];
                                break;
                            case 2:
                            case TABLE_LENGTH - 3:
                                table[i][j] = {...PIECES.bishop};
                                table[i][j].color = 'white';
                                table[i][j].position = [i, j];
                                break;
                            case 3:
                                table[i][j] = {...PIECES.queen};
                                table[i][j].color = 'white';
                                table[i][j].position = [i, j];
                                break;
                            case 4:
                                table[i][j] = {...PIECES.king};
                                table[i][j].color = 'white';
                                table[i][j].position = [i, j];
                                break;
                            default:
                                break;
                        };
                        break;
                    default:
                        table[i][j] = {type: 'cell'};
                }
            }
        }
    };

    function updatePiecesImage() {
        let rows = Array.from(chess_table.current.firstChild.children);
        rows.forEach((row, i) => {
            let cells = Array.from(row.children);
            cells.forEach((cell, j) => {
                let piece = table[i][j];
                let cell_piece = cell.firstChild;
                if (piece.type === 'cell') {
                    cell_piece.innerHTML = '';
                    cell_piece.style.backgroundColor = 'rgba(0,0,0,0.0)';
                    cell_piece.style.color = 'rgba(0,0,0,0.0)';
                }
                else {
                    cell_piece.innerHTML = piece.type[0].toUpperCase() + piece.type.slice(1);
                    if (piece.color === 'black') {
                        cell_piece.style.backgroundColor = 'rgb(25, 25, 25)';
                        cell_piece.style.color = 'rgb(225,225,225)';
                    } else {
                        cell_piece.style.backgroundColor = 'rgb(225, 225, 225)';
                        cell_piece.style.color = 'rgb(25, 25, 25)';
                    };
                };
            })
        });
    };

    function start() {
        initTable();
        updatePiecesImage();
        updateCellsInteraction();
        turn_of = "white"
        chess_status.current.innerHTML = "White's turn";
        started = true;
    };

    function updateCellsInteraction() {
        let rows = Array.from(chess_table.current.firstChild.children);
        rows.forEach((row, i) => {
            let cells = Array.from(row.children);
            cells.forEach((cell, j) => {
                if (table[i][j].type === 'cell') {
                    if (cell.classList.contains(s.clickable)) {
                        cell.classList.remove(s.clickable);
                    }
                } else {
                    if (table[i][j].color === turn_of) {
                        cell.classList.add(s.clickable);
                    } else {
                        if (cell.classList.contains(s.clickable)) {
                            cell.classList.remove(s.clickable)
                        }
                    };
                };
            });
        });
    };

    function nextTurn() {
        if (turn_of === "white") {
            turn_of = "black";
            chess_status.current.innerHTML = "Black's turn";
        } else {
            turn_of = "white";
            chess_status.current.innerHTML = "White's turn";
        };
        updateCellsInteraction();
    };

    function onClick(row, cell) {
        if (started === false) {return};

        let cell_table = table[row][cell];

        if (selected_piece && !arrayInArray(selected_piece[1], [row, cell])) {
            removeHighlightedCells();
            selected_piece = null;
        } else if (selected_piece && arrayInArray(selected_piece[1], [row, cell])) {
            if (table[row][cell].type === 'cell') {
                movePieceTo(selected_piece[0], [row, cell]);
                selected_piece = null;
                nextTurn();
                return;
            } else {
                let result = attackPieceAt(selected_piece[0], [row, cell]);
                if (result) {
                    console.log(selected_piece[0]);
                    gameEnded(selected_piece[0].color);
                } else {
                    nextTurn();
                };
                selected_piece = null;
                return;
            };
        };

        if (cell_table.type !== 'cell') {
            if (cell_table.color === turn_of) {
                selected_piece = [cell_table, []];
                getMovementCells();
            };
        }; 
    };

    function getMovementCells() {
        let cells = []
        switch (selected_piece[0].type) {
            case 'pawn':
                cells = getPawnMovements(selected_piece[0]);
                
                break;
            case 'rook':
                cells = getRookMovements(selected_piece[0]);
                
                break;
            case 'knight':
                cells = getKnightMovements(selected_piece[0]);
                
                break;
            case 'bishop':
                cells = getBishopMovements(selected_piece[0]);
                break;
            case 'queen':
                cells = getQueenMovements(selected_piece[0]);
                break;
            case 'king':
                cells = getKingMovements(selected_piece[0]);
                break;
            default:
                break;
        };

        selected_piece[1] = selected_piece[1].concat(cells);
        highlightCells(cells);
    };

    function getPawnMovements(pawn) {
        let cells = [];
        let pos = pawn.position;
        let dir = pawn.color === 'white' ? -1 : 1;
        // eslint-disable-next-line
        if (pos == [0, pos[1]] || pos == [TABLE_LENGTH - 1, pos[1]]) {return};

        if (pos[1] === 0) {
            if (table[pos[0] + dir][pos[1] + 1].type !== 'cell' && table[pos[0] + dir][pos[1] + 1].color !== pawn.color) {
                cells.push([pos[0] + dir, pos[1] + 1]);
            };
        } else if (pos[1] === TABLE_LENGTH - 1) {
            if (table[pos[0] + dir][pos[1] - 1].type !== 'cell' && table[pos[0] + dir][pos[1] - 1].color !== pawn.color) {
                cells.push([pos[0] + dir, pos[1] - 1]);
            };
        } else {
            if (table[pos[0] + dir][pos[1] + 1].type !== 'cell' && table[pos[0] + dir][pos[1] + 1].color !== pawn.color) {
                cells.push([pos[0] + dir, pos[1] + 1]);
            };
            if (table[pos[0] + dir][pos[1] - 1].type !== 'cell' && table[pos[0] + dir][pos[1] - 1].color !== pawn.color) {
                cells.push([pos[0] + dir, pos[1] - 1]);
            };
        };

        if (pawn.has_moved) {
            if (table[pos[0] + dir][pos[1]].type === 'cell') {
                cells.push([pos[0] + dir, pos[1]]);
            } 
        } else {
            if (table[pos[0] + dir][pos[1]].type === 'cell') {
                cells.push([pos[0] + dir, pos[1]]);
                if (table[pos[0] + dir * 2][pos[1]].type === 'cell') {
                    cells.push([pos[0] + dir * 2, pos[1]]);
                };
            } ;
        };

        
        return cells
    };

    function getRookMovements(rook) {
        let cells = [];
        let pos = rook.position;

        if (pos[0] !== TABLE_LENGTH - 1) {
            for (let i = pos[0] + 1; i < TABLE_LENGTH; i++) {
                if (table[i][pos[1]].type === 'cell') {
                    cells.push([i, pos[1]]);
                } else if (table[i][pos[1]].color !== rook.color) {
                    cells.push([i, pos[1]]);
                    break;
                } else {
                    break;
                };
            };
        };
        if (pos[0] !== 0) {
            for (let i = pos[0] - 1; i > -1; i--) {
                if (table[i][pos[1]].type === 'cell') {
                    cells.push([i, pos[1]]);
                } else if (table[i][pos[1]].color !== rook.color) {
                    cells.push([i, pos[1]]);
                    break;
                } else {
                    break;
                };
            };
        };
        if (pos[1] !== TABLE_LENGTH - 1) {
            for (let i = pos[1] + 1; i < TABLE_LENGTH; i++) {
                if (table[pos[0]][i].type === 'cell') {
                    cells.push([pos[0], i]);
                } else if (table[pos[0]][i].color !== rook.color) {
                    cells.push([pos[0], i]);
                    break;
                } else {
                    break;
                };
            };
        };
        if (pos[1] !== 0) {
            for (let i = pos[1] - 1; i > -1; i--) {
                if (table[pos[0]][i].type === 'cell') {
                    cells.push([pos[0], i]);
                } else if (table[pos[0]][i].color !== rook.color) {
                    cells.push([pos[0], i]);
                    break;
                } else {
                    break;
                };
            };
        };
        return cells;
    };

    function getKnightMovements(knight) {
        let cells = [];
        let pos = knight.position;
        
        const movements = [
            [pos[0] - 2, pos[1] - 1],
            [pos[0] - 2, pos[1] + 1],
            [pos[0] - 1, pos[1] - 2],
            [pos[0] - 1, pos[1] + 2],
            [pos[0] + 1, pos[1] - 2],
            [pos[0] + 1, pos[1] + 2],
            [pos[0] + 2, pos[1] - 1],
            [pos[0] + 2, pos[1] + 1],
        ].filter((coords) => {
            if (coords[0] < 0 || coords[0] >= TABLE_LENGTH || coords[1] < 0 || coords[1] >= TABLE_LENGTH) {return false};
            let cell = table[coords[0]][coords[1]];
            return cell.type === 'cell' || cell.color !== knight.color;
        });
        cells = cells.concat(movements);
        console.log(movements);
        return cells;
    };

    function getBishopMovements(bishop) {
        let cells = [];
        let pos = bishop.position;

        if (pos[0] !== TABLE_LENGTH - 1) {
            if (pos[1] !== TABLE_LENGTH - 1) {
                for (let i = pos[0] + 1, j = pos[1] + 1; i < TABLE_LENGTH && j < TABLE_LENGTH; i++, j++) {
                    if (table[i][j].type === 'cell') {
                        cells.push([i, j]);
                    } else if (table[i][j].color !== bishop.color) {
                        cells.push([i, j]);
                        break;
                    } else {
                        break;
                    };
                };
            };
            if (pos[1] !== 0) {
                for (let i = pos[0] + 1, j = pos[1] - 1; i < TABLE_LENGTH && j > -1; i++, j--) {
                    if (table[i][j].type === 'cell') {
                        cells.push([i, j]);
                    } else if (table[i][j].color !== bishop.color) {
                        cells.push([i, j]);
                        break;
                    } else {
                        break;
                    };
                };
            };
        };
        if (pos[0] !== 0) {
            if (pos[1] !== TABLE_LENGTH - 1) {
                for (let i = pos[0] - 1, j = pos[1] + 1; i > -1 && j < TABLE_LENGTH; i--, j++) {
                    if (table[i][j].type === 'cell') {
                        cells.push([i, j]);
                    } else if (table[i][j].color !== bishop.color) {
                        cells.push([i, j]);
                        break;
                    } else {
                        break;
                    };
                };
            };
            if (pos[1] !== 0) {
                for (let i = pos[0] - 1, j = pos[1] - 1; i > -1 && j > -1; i--, j--) {
                    if (table[i][j].type === 'cell') {
                        cells.push([i, j]);
                    } else if (table[i][j].color !== bishop.color) {
                        cells.push([i, j]);
                        break;
                    } else {
                        break;
                    };
                };
            };
        };
        return cells;
    }

    function getQueenMovements(queen) {
        let cells = [];

        cells = cells.concat(getRookMovements(queen));
        cells = cells.concat(getBishopMovements(queen));
        return cells;
    }

    function getKingMovements(king) {
        let cells = [];
        let pos = king.position;

        const movements = [
            [pos[0] - 1, pos[1] - 1],
            [pos[0] - 1, pos[1] + 1],
            [pos[0] + 1, pos[1] - 1],
            [pos[0] + 1, pos[1] + 1],
            [pos[0] - 1, pos[1]],
            [pos[0] + 1, pos[1]],
            [pos[0], pos[1] - 1],
            [pos[0], pos[1] + 1],
        ].filter((coords) => {
            if (coords[0] < 0 || coords[0] >= TABLE_LENGTH || coords[1] < 0 || coords[1] >= TABLE_LENGTH) {return false};
            let cell = table[coords[0]][coords[1]];
            return cell.type === 'cell' || cell.color !== king.color;
        });
        cells = cells.concat(movements);
        return cells;
    }

    function removeHighlightedCells() {
        let rows = Array.from(chess_table.current.firstChild.children);
        rows.forEach((row, i) => {
            let cells = Array.from(row.children);
            cells.forEach((cell, j) => {
                if (cell.classList.contains(s.highlighted)) {
                    cell.classList.remove(s.highlighted);
                };
            });
        });
    };

    function highlightCells(cells) {
        removeHighlightedCells();

        if (cells.length === 0) {return};
        cells.forEach((coords) => {
            let element = getCellElementByIndex(coords[0], coords[1]);
            if (!element.classList.contains(s.highlighted)) {
                element.classList.add(s.highlighted);
            };
        })
    };

    function movePieceTo(piece, pos) {
        if (!Array.isArray(pos) || pos.length !== 2 || typeof piece !== "object") {return};

        let old_pos = piece.position;
        table[pos[0]][pos[1]] = piece;
        table[old_pos[0]][old_pos[1]] = {type: 'cell'};
        piece.position = pos;
        if (piece.type === 'pawn') {
            piece.has_moved = true;
        };

        updatePiecesImage();
        removeHighlightedCells();
    };

    function attackPieceAt(piece, pos) {
        if (!Array.isArray(pos) || pos.length !== 2 || typeof piece !== "object") {return};
        
        let old_pos = piece.position;
        let is_target_king = false;
        if (table[pos[0]][pos[1]].type === 'king') { is_target_king = true };
        table[pos[0]][pos[1]] = piece;
        table[old_pos[0]][old_pos[1]] = {type: 'cell'};
        piece.position = pos;
        if (piece.type === 'pawn') {
            piece.has_moved = true;
        };

        updatePiecesImage();
        removeHighlightedCells();

        if (is_target_king) {
            return true;
        };
        return false
    };

    function gameEnded(winner) {
        let message = `The game is ended. The winner is ${winner === 'white' ? 'white' : 'black'}`;
        chess_status.current.innerHTML = message;
        started = false;
        disableAllPieces();
        let btn = start_btn.current;
        btn.disabled = false;
        btn.innerHTML = 'Restart';
    };

    function disableAllPieces() {
        let rows = Array.from(chess_table.current.firstChild.children);
        rows.forEach((row, i) => {
            let cells = Array.from(row.children);
            cells.forEach((cell, j) => {
                if (cell.classList.contains(s.clickable)) {
                    cell.classList.remove(s.clickable);
                };
            });
        });
    };

    function compareArrays(arr1, arr2) {
        if (arr1.length !== arr2.length) {return false};

        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) {return false};
        };
        return true;
    };

    function arrayInArray(array, find_array) {
        if (!Array.isArray(array) || !Array.isArray(find_array)) {return false};
        if (array.length === 0 || find_array.length === 0) {return false};


        for (let i = 0; i < array.length; i++) {
            let ele = array[i];
            if (Array.isArray(ele)) {
                if (compareArrays(ele, find_array)) {return true};
            } else {continue};
        };
        return false
    };

    return (
        <>
            <div className='default_theme'>
                <h3>Chess</h3>
            </div>
            <div className='default_theme'>
                <div className={s.scoreBoard}>
                    <span>0</span>
                    <span>X</span>
                    <span>0</span>
                </div>
                <div id={s.chessBoardDiv}>
                    <span ref={chess_status} id={s.chess_status}>The game is not started yet</span>
                    <table id={s.chessBoard} ref={chess_table}>
                        <tbody>
                        {[...Array(8)].map((_, i) => (
                            <tr key={i} className={s.row}>
                                {[...Array(8)].map((_, j) => {
                                    if ((i + j) % 2 === 0) {
                                        return (
                                            <td key={j} id={JSON.stringify([i, j])} className={s.darkCell + ' ' + s.cell} onClick={onClick.bind(this, i, j)}><span></span></td>
                                        )
                                    }
                                    else {
                                        return (
                                            <td key={j} id={JSON.stringify([i, j])} className={s.lightCell + ' ' + s.cell} onClick={onClick.bind(this, i, j)}><span></span></td>
                                        )
                                    }
                                    
                                })}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <button className={'button '} id={s.controlBtn} ref={start_btn} onClick={onClickStart}>Start</button><br />
                <span className={s.warning}>This app is not complete and some features are missing.</span>
            </div>
        </>
    );
};

export default Chess;