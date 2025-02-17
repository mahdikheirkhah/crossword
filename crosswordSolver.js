function getWordsNumber(puzzle) {
    if (!puzzle)
        return

    let count = 0
    for (let i = 0; i < puzzle.length; i++) {
        if (puzzle[i] === '0' || puzzle[i] === '1' || puzzle[i] === '2')
            count += parseInt(puzzle[i])
        else if (puzzle[i] != '.' && puzzle[i] != '\n')
            return -1
    }
    return count
}

function checkDuplicateWords(words) {
    if (!Array.isArray(words))
        return

    for (let i = 0; i < words.length-1; i++) {
        for (let j = i+1; j < words.length; j++) {
            if (words[i] === words[j])
                return false
        }
    }
    return true
}

function checkPuzzle(puzzle, words) {
    if (!Array.isArray(words))
        return false
    if (getWordsNumber(puzzle) !== words.length || !checkDuplicateWords(words)) {
        return false
    }
    return true
}

function canPlaceWord(word, row, col, direction, table) {
    let len = word.length;

    if (direction === "horizontal") {
        if (len > table[row][col].lengthHorizontal) return false; 

        for (let j = 0; j < len; j++) {
            if (table[row][col + j].isOccupied) return false; 
            if (table[row][col + j].letter !== '' && table[row][col + j].letter !== word[j]) {
                return false;
            }
        }
    } else { // Vertical check
        if (len > table[row][col].lengthVertical) return false; 

        for (let i = 0; i < len; i++) {
            if (table[row + i][col].isOccupied) return false; 
            if (table[row + i][col].letter !== '' && table[row + i][col].letter !== word[i]) {
                return false; 
            }
        }
    }
    return true;
}

function placeWord(word, row, col, direction, table) {
    let len = word.length;
    for (let i = 0; i < len; i++) {
        if (direction === "horizontal") {
            table[row][col + i].letter = word[i];
        } else {
            table[row + i][col].letter = word[i];
        }
    }
}

function removeWord(word, row, col, direction, table) {
    let len = word.length;

    for (let i = 0; i < len; i++) {
        let currentCell;
        let canRemove = true;

        if (direction === "horizontal") {
            currentCell = table[row][col + i];

            // Check if this cell is part of a vertical word
            let tempRow = row - 1;
            while (tempRow >= 0) {
                if (table[tempRow][col + i].isStart) {
                    let verticalStart = table[tempRow][col + i];
                    if (verticalStart.lengthVertical + tempRow > row && verticalStart.letter !== '' && table[row -1][col + i].letter !== '') {
                        canRemove = false;  
                        
                    }
                    break;
                }   else if(table[tempRow][col + i].value === -1){
                    break;
                }
                tempRow--;
            }
        } 
        else { // Vertical removal
            currentCell = table[row + i][col];

            // Check if this cell is part of a horizontal word
            let tempCol = col - 1;
            while (tempCol >= 0) {
                if (table[row + i][tempCol].isStart ) {
                    let horizontalStart = table[row + i][tempCol];
                    if (horizontalStart.lengthHorizontal + tempCol > col && horizontalStart.letter !== '' && table[row + i][col - 1].letter !== '') {
                        canRemove = false;  
                    }
                    break;
                } else if(table[row + i][tempCol].value === -1){
                    break;
                }
                tempCol--;
            }
        }
        if (canRemove) {
            currentCell.letter = '';
        }
    }
}


function convertToTable(emptyPuzzle) {
    let rows = emptyPuzzle.split("\n");
    let result = [];

    for (let i = 0; i < rows.length; i++) {
        let rowToNumbers = [];
        for (let j = 0; j < rows[i].length; j++) {
            let house = {
                letter: '',
                value: -1,
                isOccupied: false,
                isStart: false,
                hasCountedVertical:0,
                hasCountedHorizontal:0,
                lengthVertical: -1,
                lengthHorizontal: -1,
                usedHorizontal: 0,
                usedVertical: 0

            };

            if (rows[i][j] === '.') {
                house.isOccupied = true;
            } else if (rows[i][j] === '0') {
                house.value = 0;
            } else if (rows[i][j] === '1') {
                house.value = 1;
                house.isStart = true;
            } else if (rows[i][j] === '2') {
                house.value = 2;
                house.isStart = true;
            }
            rowToNumbers.push(house);
        }
        result.push(rowToNumbers);
    }

    result = findLengthHorizontal(result);
    result = findLengthVertical(result);
    return result;
}

function findLengthVertical(table) {
    for (let j = 0; j < table[0].length; j++) { 
        for (let i = 0; i < table.length; i++) {
            if (table[i][j].isStart) { 
                let length = 1;
                let tempI = i + 1;
                if (tempI < table.length && !table[tempI][j].hasCountedVertical){
                    while (tempI < table.length && table[tempI][j].value !== -1) {
                        length++;
                        table[tempI][j].hasCountedVertical = true;
                        tempI++;
                    }
                }
                table[i][j].lengthVertical = length; 
            }
        }
    }
    return table;
}

function findLengthHorizontal(table) {
    for (let i = 0; i < table.length; i++) {
        for (let j = 0; j < table[i].length; j++) {
            if (table[i][j].isStart) { 
                let length = 1;
                let tempJ = j + 1;
                if (tempJ < table[i].length && !table[i][tempJ].hasCountedHorizontal){
                    while (tempJ < table[i].length && table[i][tempJ].value !== -1) {
                        length++;
                        table[i][tempJ].hasCountedHorizontal = true;
                        tempJ++;
                    }
                }
                table[i][j].lengthHorizontal = length;
            }
        }
    }
    return table;
}

function categorizeWordsByLength(words) {
    let categorizedWords = {};
    for (const word of words) {
        const length = word.length;
        if (!categorizedWords[length]) {
            categorizedWords[length] = [];
        }
        categorizedWords[length].push(word);
    }
    return categorizedWords;
}

function numberOfIntersection(table){
    let result = [];
    for(let i = 0; i < table.length; i++){
        for(let j = 0; j < table[i].length; j++){
            if(table[i][j].isStart){
                let intersections = table[i][j].value;
                let oneHouse={
                    intersection: intersections,
                    column: j,
                    row: i,
                }
                if(table[i][j].lengthHorizontal > 1 || table[i][j].value === 2){
                    for(let k = j; k < table[i][j].lengthHorizontal + j; k++){
                        if(table[i][k].value === -1 ){
                            break;                            
                        }                    
                        if(i-1 >= 0) {
                            if (table[i-1][k].value === 2 || table[i-1][k].value === 0){
                                 intersections ++;
                            } else if (table[i-1][k].value === 1 && table[i-1][k].lengthVertical > 1){
                                 intersections ++;
                            }
                        }
                        if(table[i][k].isStart && k !== j){
                            intersections += table[i][k].value;
                        }
                    }
                }
                if(table[i][j].lengthVertical > 1 || table[i][j].value === 2){
                    for(let k = i; k < table[i][j].lengthVertical + i; k++){
                        if(table[k][j].value === -1 ){
                            break;                            
                        }                    
                        if(j-1 >= 0) {
                            if (table[k][j-1].value === 2 || table[k][j-1].value === 0){
                                 intersections ++;
                            } else if (table[k][j-1].value === 1 && table[k][j-1].lengthHorizontal > 1){
                                 intersections ++;
                            }
                        }
                        if(table[k][j].isStart && k !== i){
                            intersections += table[k][j].value;
                        }
                    }
                }
                oneHouse.intersection = intersections;
                result.push(oneHouse);
            }
        }
    }
    result.sort((a, b) => b.intersection - a.intersection); //descending order
    return result;
}

function crosswordSolver(puzzle, words) {
    if (!checkPuzzle(puzzle, words)) {
        console.log("Error");
        return 'Error'
    }
    let table = convertToTable(puzzle);
    let wordsByLength = categorizeWordsByLength(words);
    let startPositions = numberOfIntersection(table);
    let solutions = [];
    let usedWords = new Set();
    function backtrack(index) {
    if (index >= startPositions.length) {
        
        for (let pos of startPositions) {
            let cell = table[pos.row][pos.column];
            if (cell.value === 2) {
                if (cell.usedHorizontal === 0 || cell.usedVertical === 0) {
                    return;
                }
            }
        }

        let solution = table.map(row => row.map(cell => cell.letter || '.').join('')).join('\n');
        solutions.push(solution);
        return;
    }

    let { row, column } = startPositions[index];
    let cell = table[row][column];
    let lengthHorizontal = cell.lengthHorizontal;
    let lengthVertical = cell.lengthVertical;

    if (cell.value === 2) {

        if (cell.usedHorizontal === 0) {
            for (let word of wordsByLength[lengthHorizontal] || []) {
                if (!usedWords.has(word) && canPlaceWord(word, row, column, "horizontal", table)) {
                    usedWords.add(word);
                    placeWord(word, row, column, "horizontal", table);
                    cell.usedHorizontal = 1;

                    for (let word2 of wordsByLength[lengthVertical] || []) {
                        if (!usedWords.has(word2) && word2 !== word && canPlaceWord(word2, row, column, "vertical", table)) {
                            usedWords.add(word2);
                            placeWord(word2, row, column, "vertical", table);
                            cell.usedVertical = 1;

                            backtrack(index + 1);

                            // Undo vertical
                            removeWord(word2, row, column, "vertical", table);
                            usedWords.delete(word2);
                            cell.usedVertical = 0;
                        }
                    }

                    // Undo horizontal
                    removeWord(word, row, column, "horizontal", table);
                    usedWords.delete(word);
                    cell.usedHorizontal = 0;
                }
            }
        }
    } else {
        if (lengthHorizontal > 1 && cell.usedHorizontal === 0) {
            for (let word of wordsByLength[lengthHorizontal] || []) {
                if (!usedWords.has(word) && canPlaceWord(word, row, column, "horizontal", table)) {
                    usedWords.add(word);
                    placeWord(word, row, column, "horizontal", table);
                    cell.usedHorizontal = 1;

                    backtrack(index + 1);

                    removeWord(word, row, column, "horizontal", table);
                    usedWords.delete(word);
                    cell.usedHorizontal = 0;
                }
            }
        }

        if (lengthVertical > 1 && cell.usedVertical === 0) {
            for (let word of wordsByLength[lengthVertical] || []) {
                if (!usedWords.has(word) && canPlaceWord(word, row, column, "vertical", table)) {
                    usedWords.add(word);
                    placeWord(word, row, column, "vertical", table);
                    cell.usedVertical = 1;

                    backtrack(index + 1);
                    
                    removeWord(word, row, column, "vertical", table);
                    usedWords.delete(word);
                    cell.usedVertical = 0;
                }
            }
        }
    }
    return;
}


    backtrack(0);
    if (solutions.length === 1) {
        console.log(solutions[0]);
        return solutions[0];

    } else {
        console.log("Error");
        return "Error";
    }
}
const puzzle = '2001\n0..0\n1000\n0..0'
const words = ['casa', 'alan', 'ciao', 'anta']

crosswordSolver(puzzle, words)
module.exports = { crosswordSolver }
