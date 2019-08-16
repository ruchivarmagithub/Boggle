class TrieNode {
    constructor() {
        this.leaf = false;
        this.children = [];

        // each child can be initialized to null
        for(let i=0; i<26; i++) {
            this.children[i] = null;
        }
    }
}

class Boggle {
    constructor(m, n) {
        this.M = m;
        this.N = n;
    }

    insertWordsTrie(root, dictionary) {
        for(let i=0; i<dictionary.length; i++) {
            // slice each word and insert into Trie
            let word = dictionary[i];
            for(let j=0; j<word.length; j++) {
                // get the index for each character, relative to "A"
                let index = word.charCodeAt(j) - 65;

                // Insert character at the correct index in Trie if the node does not already exist
                if (!root.children[index]) {
                    root.children[index] = new TrieNode();
                }

                // this child becomes the new root for the next character in the word
                root = root.children[index];
            }

            // the last node should be marked as leaf
            root.leaf = true;

            // this updated root is now used for the next word in dictionary
        }

    }

    searchWords(matrix, currentNode, i, j, visitedMap, str) {
        // explore matrix and trie starting from character matrix[i][j]
        visitedMap[i][j] = true;

        if (currentNode.leaf === true) {
            console.log(str);
        }

        // continue going down trie path investigating child nodes 
        for (let k = 0; k < 26; k++) {
            // do this for not null child nodes
            if (currentNode.children[k] != null) {
                // check if this child node exists in matrix
                let ch = String.fromCharCode(k + 65);

                // search adjacent characters in matrix to find ch
                for (let row = i - 1; row <= i + 1 && row < this.M; row++) {
                    for (let col = i - 1; col <= i + 1 && col < this.N; col++) {
                        // make sure that the matrix[row][col] item is not visited
                        if (row >= 0 && col >= 0 && !visitedMap[row][col]) {
                            // find this character in matrix and recursively call this function
                            if (ch === matrix[row][col]) {
                                this.searchWords(matrix, currentNode.children[k], row, col, visitedMap, str + matrix[row][col])
                            }
                        }
                    }
                }
            }
        }

        visitedMap[i][j] = false;
    }

    findWords(matrix, root) {
        var visitedMap = [];
        for (let i = 0; i < this.M; i++) {
            visitedMap[i] = [];
            for (let j = 0; j < this.N; j++) {
                visitedMap[i][j] = false;
            }
        }

        var str = "";

        // go through every character in matrix
        // and check if it exists in trie
        // only the characters that exist should be further explored
        for (let i = 0; i < this.M; i++) {
            for (let j = 0; j < this.N; j++) {
                // check to see if character matrix[i][j] exists in Trie
                let charIndex = matrix[i][j].charCodeAt(0) - 65;

                if (root.children[charIndex]) {
                    // the starting character is found as a child of trie root
                    // explore this path
                    this.searchWords(matrix, root.children[charIndex], i, j, visitedMap, str+matrix[i][j]);
                }
            }
        }
    }

    init(matrix, dictionary) {
        // insert dictionary words into Trie
        var root = new TrieNode();

        this.insertWordsTrie(root, dictionary);

        this.findWords(matrix, root);
    }
}

var matrix = [['G','I','Z'], 
              ['U','E','K'], 
              ['Q','S','E']];

var boggle = new Boggle(matrix.length, matrix[0].length);

// dictionary of valid words
// map dictionary to a trie to help
// limit the number of search paths in the matrix
// we only explore matrix for those words 
// that are in the TRIE. if we dont find characters for a word in matrix
// we stop that search path for further exploring 
var dictionary = ["GEEKS", "FOR", "QUIZ", "GEE"];
boggle.init(matrix, dictionary);