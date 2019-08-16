function Boggle(m, n) {
    this.M = m;
    this.N = n;
    this.dictionary = ["GEEKS", "FOR", "QUIZ", "GO"]; 
}

Boggle.prototype.DFSSearch = function(row, col, matrix, visitedMap, str, results) {
    visitedMap[row][col] = true;
    console.log(str)
    // search for str in dictionary
    if (this.dictionary.includes(str)) {
     
        results.push(str);
    }

    // add neighboring unvisited characters and for each neighbor, repeat DFSSearch
    for(let i=row-1; i<=row+1 && i<this.M; i++) {
        for(let j=col-1; j<=col+1 && i<this.N; i++) {
            // make sure that i and j are >=0 and unvisited
            if (i >= 0 && j >=0 && !visitedMap[i][j]) {
                str = str + matrix[i][j];

                // continue searching adjacent cells of item [i][j]
                this.DFSSearch(i, j, matrix, visitedMap, str, results)
            }
        }
    }

    // remove matrix[row][col] from str
    str = str.slice(0, str.length - 1);

    // clean up visited for row and col
    visitedMap[row][col] = false;
}

Boggle.prototype.findWords = function(matrix) {
    // for each character in matrix, add neighboring unvisited characters one-by-one and
    // every time you add a character, compare that string to see if it is a valid word in the dictionary
    var visitedMap = [];
    var str = "";
    var results = [];

    for(let i=0; i<this.M; i++) {
        visitedMap[i] = [];
        for(let j=0; j<this.N; j++) {
            // initialize visitedMap
            visitedMap[i][j] = false;
        }
    }

    for(let i=0; i<this.M; i++) {
        for(let j=0; j<this.N; j++) {
            this.DFSSearch(i, j, matrix, visitedMap, str + matrix[i][j], results);
        }
    }

    return results;
}

var matrix = [["G", "I", "Z"],
              ["U", "E", "K"],
              ["Q", "S", "E"]];

var boggle = new Boggle(matrix.length, matrix[0].length);

console.log(boggle.findWords(matrix));