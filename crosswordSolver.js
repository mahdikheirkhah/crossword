function canPlaceWord(word, row, col, direction, table) {
    let len = word.length;

    if (direction === "horizontal") {
        if (len > table[row][col].lengthHorizontal) return false; // Out of bounds

        for (let j = 0; j < len; j++) {
            if (table[row][col + j].isOccupied) return false; // Blocked cell
            if (table[row][col + j].letter !== '' && table[row][col + j].letter !== word[j]) {
                return false; // Letter mismatch
            }
        }
    } else { // Vertical check
        if (len > table[row][col].lengthVertical) return false; // Out of bounds

        for (let i = 0; i < len; i++) {
            if (table[row + i][col].isOccupied) return false; // Blocked cell
            if (table[row + i][col].letter !== '' && table[row + i][col].letter !== word[i]) {
                return false; // Letter mismatch
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
        let canRemove = true;  // Assume we can remove unless proven otherwise

        if (direction === "horizontal") {
            currentCell = table[row][col + i];

            // Check if this cell is part of a vertical word
            let tempRow = row - 1;
            while (tempRow >= 0) { // Move upwards
                if (table[tempRow][col + i].isStart) {
                    let verticalStart = table[tempRow][col + i];
                    if (verticalStart.lengthVertical + tempRow >= row) {
                        canRemove = false;  // It's part of another vertical word
                        
                    }
                     break;// Stop checking once we find a start
                }
                tempRow--;
            }
            if (canRemove ) {
                currentCell.letter = '';
                table[row][col + i].letter = '';
             }
        } 
        else { // Vertical removal
            currentCell = table[row + i][col];

            // Check if this cell is part of a horizontal word
            let tempCol = col - 1;
            while (tempCol >= 0) { // Move left
                if (table[row + i][tempCol].isStart ) {
                    let horizontalStart = table[row + i][tempCol];
                    if (horizontalStart.lengthHorizontal + tempCol >= col && table[row + i][tempCol].letter !== '') {
                        canRemove = false;  // It's part of another horizontal word
                        
                    }
                     break;// Stop checking once we find a start
                }
                tempCol--;
            }
            if (canRemove ) {
                currentCell.letter = '';
               table[row + i][col].letter = '';
             }
        }

        // Only remove the letter if it's safe

    }
}



function printTable(table) {
    let output = table.map(row => row.map(cell => (cell.letter === '' ? '.' : cell.letter)).join('')).join('\n');
    console.log(output);
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
                        table[tempI][j].hasCountedVertical = true; // Mark as occupied
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
                        table[i][tempJ].hasCountedHorizontal = true; // Mark as occupied
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
                // for(let k = j; k < table[i].length; k++){
                //     if(k-1 >= 0) {
                //         if (table[i][k-1].value === 0 || table[i][k-1].value === 2){
                //              intersections ++;
                //         } else if (table[i][k-1].value === 1){
                //             if()
                //         }
                //     }
                //     if(k+1 >= 0 )
                //     if(table[i][k].value === -1 ){
                //         if (k > oneHouse.coulmn ){
                //             break;                            
                //         } else{
                //             continue;
                //         }
                //     }
                //     if(table[i][k].isStart && k !== j){
                //         intersections += table[i][k].value;
                //     }
                // }
                // for(let k = 0; k < table.length; k++){
                //     if(table[k][j].value === -1){
                //         if (k > oneHouse.row ){
                //             break;                            
                //         } else{
                //             continue;
                //         }
                //     }
                //     if(table[k][j].isStart && k !== i){
                //         intersections += table[k][j].value;
                //     }
                // }
                // oneHouse.intersection = intersections;
                result.push(oneHouse);
            }
        }
    }
    result.sort((a, b) => b.intersection - a.intersection);
    return result;
}

function crosswordSolver(emptyPuzzle, words) {
    let table = convertToTable(emptyPuzzle);
    let wordsByLength = categorizeWordsByLength(words);
    let startPositions = numberOfIntersection(table);
    let solutions = [];
    let usedWords = new Set();
    // for(let i=0; i < table.length; i++){
    // //     for (let j=0; j < table[i].length; j++){
    // //         if (table[i][j].lengthVertical !== -1 || table[i][j].lengthHorizontal !== -1){
    // //             console.log("row: ",i,"\ncolumn: ",j ,"\n",table[i][j]);
    // //         }
    // //     }
    // // }
    function backtrack(index) {
    if (index >= startPositions.length) {
        // Validate all cells are satisfied (especially 2s)
        for (let pos of startPositions) {
            let cell = table[pos.row][pos.column];
            if (cell.value === 2) {
                // Ensure both directions are used
                if (cell.usedHorizontal === 0 || cell.usedVertical === 0) {
                    return; // Invalid solution
                }
            }
        }
        // Store the solution
        let solution = table.map(row => row.map(cell => cell.letter || '.').join('')).join('\n');
        solutions.push(solution);
        return;
    }

    let { row, column } = startPositions[index];
    let cell = table[row][column];
    let lengthHorizontal = cell.lengthHorizontal;
    let lengthVertical = cell.lengthVertical;

    // Handle cells with value 2 (MUST place both directions)
    if (cell.value === 2) {
        // Place horizontal first
        if (cell.usedHorizontal === 0) {
            for (let word of wordsByLength[lengthHorizontal] || []) {
                if (!usedWords.has(word) && canPlaceWord(word, row, column, "horizontal", table)) {
                    usedWords.add(word);
                    placeWord(word, row, column, "horizontal", table);
                    cell.usedHorizontal = 1;
                    table[row][column].usedHorizontal = 1; // Update directly in the table

                    // Now place vertical
                    for (let word2 of wordsByLength[lengthVertical] || []) {
                        if (!usedWords.has(word2) && word2 !== word && canPlaceWord(word2, row, column, "vertical", table)) {
                            usedWords.add(word2);
                            placeWord(word2, row, column, "vertical", table);
                            cell.usedVertical = 1;
                            table[row][column].usedVertical = 1; // Update directly in the table

                            backtrack(index + 1);

                            // Undo vertical
                            removeWord(word2, row, column, "vertical", table);
                            usedWords.delete(word2);
                            cell.usedVertical = 0;
                            table[row][column].usedVertical = 0; // Reset directly in the table
                        }
                    }

                    // Undo horizontal
                    removeWord(word, row, column, "horizontal", table);
                    usedWords.delete(word);
                    cell.usedHorizontal = 0;
                    table[row][column].usedHorizontal = 0; // Reset directly in the table
                }
            }
        }
    } else {
        // Handle cells with value 1 (place either horizontal or vertical)
        // Try horizontal first
        
        if (lengthHorizontal > 1 && cell.usedHorizontal === 0) {
            for (let word of wordsByLength[lengthHorizontal] || []) {
                if (!usedWords.has(word) && canPlaceWord(word, row, column, "horizontal", table)) {
                    usedWords.add(word);
                    placeWord(word, row, column, "horizontal", table);
                    cell.usedHorizontal = 1;
                    table[row][column].usedHorizontal = 1; // Update directly in the table

                    backtrack(index + 1);

                    // Undo
                    removeWord(word, row, column, "horizontal", table);
                    usedWords.delete(word);
                    cell.usedHorizontal = 0;
                    table[row][column].usedHorizontal = 0; // Reset directly in the table
                }
            }
        }

        // Try vertical
        if (lengthVertical > 1 && cell.usedVertical === 0) {
            for (let word of wordsByLength[lengthVertical] || []) {
                //console.log("vertical1:", word );
                if (!usedWords.has(word) && canPlaceWord(word, row, column, "vertical", table)) {
                    //console.log("vertical2:", word );
                    usedWords.add(word);
                    placeWord(word, row, column, "vertical", table);
                    cell.usedVertical = 1;
                    table[row][column].usedVertical = 1; // Update directly in the table

                    backtrack(index + 1);

                    // Undo
                    
                    removeWord(word, row, column, "vertical", table);
                    usedWords.delete(word);
                    
                    cell.usedVertical = 0;              
                    table[row][column].usedVertical = 0; // Reset directly in the table
                }
            }
        }
    }
    return;
}


    backtrack(0);
    // console.log(solutions)
    if (solutions.length === 1) {
        console.log(solutions[0]);
    } else {
        console.log("Error");
    }
}
const puzzle = `...1...........
..1000001000...
...0....0......
.1......0...1..
.0....100000000
100000..0...0..
.0.....1001000.
.0.1....0.0....
.10000000.0....
.0.0......0....
.0.0.....100...
...0......0....
..........0....`
const words = [
  'sun',
  'sunglasses',
  'suncream',
  'swimming',
  'bikini',
  'beach',
  'icecream',
  'tan',
  'deckchair',
  'sand',
  'seaside',
  'sandals',
].reverse()

if (!checkEmptyPuzzle(puzzle, words)) {
    console.error('Error')
    return
}
crosswordSolver(puzzle, words)

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

function checkEmptyPuzzle(puzzle, words) {
    if (getWordsNumber(puzzle) !== words.length || !checkDuplicateWords(words)) {
        return false
    }
    return true
}
