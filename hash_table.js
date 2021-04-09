/** Class representing a Hash Table */

class HashTable {
    constructor() {
        this._storage = [];
        this._size = 25;
    }
    /*
    * Inserts a new key-value pair
    * @param {string} key - the key associated with the value
    * @param {*} value - the value to insert
    */
    insert(key, value) {
        const index = this._hash(key, this._size);
        if (!this._storage[index]) this._storage[index] = [];
        this._storage[index].push([key, value])
    }
    /*
    * Deletes a key-value pair
    * @param {string} key - the key associated with the value
    * @return {*} value - the deleted value
    */
    remove(key) {
        const index = this._hash(key, this._size);
        if (this._storage[index]) {
            return this._storage[index].pop();
        }
    }
    /* 
    * Returns the value associated with a key
    * @param {string} key - the key to search for
    * @return {*} - the value associated with the key
    */
    retrieve(key) {
        const index = this._hash(key, this._size)
        const arrayAtIndex = this._storage[index]
        if (arrayAtIndex) {
            for (let i = 0; i < arrayAtIndex.length; i++) {
                if (arrayAtIndex[i][0] === key) {
                    return arrayAtIndex[i][1]
                }
            }
        }
    }
    /*
    * Hashes string value into an integer that can be mapped to an array index
    * @param {string} str - the string to be hashed
    * @param {number} n - the size of the storage array
    * @return {number} - an integer between 0 and n
    */
    _hash(str, n) {
        let sum = 0;
        for (let i = 0; i < str.length; i++)
            sum += str.charCodeAt(i) * 3

        return sum % n;
    }
}

let hashtable = new HashTable();

console.log(hashtable);

hashtable.insert('one', 1)
hashtable.insert('two', 2)
hashtable.insert('two', 22)
hashtable.insert('three', 3)

console.log(hashtable.remove('two'));

console.log(hashtable);

hashtable.insert('two', 22)

console.log(hashtable);

console.log(hashtable.retrieve('two'));
