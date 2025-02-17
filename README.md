# Crossword Solver

## Description

This project implements a **Crossword Solver** using **backtracking**. The solver fills in an empty crossword grid with given words while ensuring a **unique solution**. It prioritizes positions with the **most intersections** first to maximize efficiency.

## Features

- Solves crossword puzzles with a unique solution.
- Uses backtracking with an **optimized word placement strategy**.
- Supports different grid sizes and word lists.
- Returns 'Error' if the puzzle cannot be uniquely solved.

---

## Requirements

- **Node.js** (v18.12.1 or later)

---

## Installation & Setup

### Clone the repository

```sh
git clone https://github.com/mahdikheirkhah/crossword.git
cd crossword
```

---

## Usage

### Running the Solver

To run the **crossword solver**, execute:

```sh
node crosswordSolver.js
```

### Running Tests

The project includes a `test.js` file for testing the solver. To run the tests, execute:

```sh
node test.js
```

---

## Example Input/Output

### **Input:**

```js
const puzzle = `2001
0..0
1000
0..0`;
const words = ['casa', 'alan', 'ciao', 'anta'];
crosswordSolver(puzzle, words);
```

### **Output:**

```
casa
i..l
anta
o..n
```

If the input does not lead to a unique solution, the output will be:

```
Error
```

---

## Algorithm Overview

1. **Parse the grid** to identify word placement constraints.
2. **Sort positions by intersections**, prioritizing positions with the highest number of connections.
3. **Apply backtracking** to try placing words, ensuring a valid configuration.
4. If a **unique solution** is found, print the completed grid; otherwise, print **'Error'**.

---

## Author

Developed by :
- **[Anass TOUBA](https://github.com/atouba)**
- **[Mohammad Mahdi Kheirkhah](https://github.com/mahdikheirkhah/)**

---

