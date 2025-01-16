  class HashMap {
    constructor(capacity, loadFactor) {
        this.table = new Array(capacity);
        this.capacity = capacity;
        this.loadFactor = loadFactor;

        this.size = 0; 
    }

    hash(key){
        let hashCode = 0;


        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (((primeNumber * hashCode)  + key.charCodeAt(i)) % this.capacity);
        }
        // console.log(`Hashing key "${key}" to index ${hashCode}`);
        return hashCode;
    }

    //takes two arguments: the first is a key, and the second is a value that is assigned to this key. If a key already exists, then the old value is overwritten, and we can say that we update the key’s value (e.g. Carlos is our key but it is called twice: once with value I am the old value., and once with value I am the new value.. Following this logic, Carlos should contain only the latter value).
    set(key, value){
        //if the number of entries in the hashmap exceed our loadfactor of the total capacity of our hashmap
        //double the capacity and re-hash current entries into new array
        if(this.size > (this.capacity * this.loadFactor)) {
            //make temporary array of old hashmap
            const tempArray = this.table;

            //double capacity from previous iteration
            this.capacity *= 2;

            //generate new hashmap with doubled capacity
            this.table = new Array(this.capacity);

            //reset size 
            this.size = 0;

            //rehash old linkedList into new function 
            for(const bucket of tempArray){
                //if bucket is filled
                if(bucket) {
                    //iterate through array and call set method on each key/value of linkedList
                    const linkedList = bucket;
                    let current = linkedList.head;

                    while (current){
                        this.set(current.key, current.value);
                        current = current.nextNode;
                    }
                }
            }
            console.log(`New capacity: ${this.capacity}`);
        }

        const testIfKeyExists = this.has(key);


        //if  If a key already exists, then the old value is overwritten, 
        // and we can say that we update the key’s value (e.g. Carlos is our key but it is called twice: once with value I am the old value., and once with value I am the new value.. 
        // Following this logic, Carlos should contain only the latter value).
        if(testIfKeyExists){
            
            const index = this.hash(key);
            let current = this.table[index].head;

            while(current) {
                if(current.key === key){
                    current.value = value;
                }
                current = current.nextNode;
            }

            console.log(`Key "${key}" already exists. Updating its value to "${value}".`);
        } 
        //if key doesn't already exists, make a key, set index, and value as object pair
        else {       
            //get index for new object
            const index = this.hash(key);

            //make sure index is never out of range of hashmap
            if (index < 0 || index >= this.table.length) {
                throw new Error("Trying to access index out of bounds");
            }

            //if index of hashmap is empty, create a linked list and add the key/value as the first entry
            if(!this.table[index]){
                const linkedList = new LinkedList;
                linkedList.append(key, value);

                this.table[index] = linkedList;
            } 
            //Otherwise if the linked list already exists, add new key/value to end of linked list
            else {
                const linkedList = this.table[index];
                linkedList.append(key, value);
            }
            this.size++; 

            for(const bucket of this.table){
                if(!bucket === undefined){
                    console.log(bucket.toString());
                }
            }

            // console.log(`Key "${key}" does not exist. Adding new key-value pair.`);
        }
    }

    //takes one argument as a key and returns the value that is assigned to this key. If a key is not found, return null.
    get(key) {
        const index = this.hash(key);

        if (index < 0 || index >= this.table.length) {
            throw new Error("Trying to access index out of bounds");
        }

        const linkedList = this.table[index];
        let keyExistsInList = linkedList.contains(key);
        let value = null;

        if(keyExistsInList){
            value = linkedList.retrieveValueFromKey(key);
        }
        
        return value;
    }

    //takes a key as an argument and returns true or false based on whether or not the key is in the hash map.
    has(key) {
        const index = this.hash(key);
        // console.log(`Checking if key "${key}" exists at index ${index}.`);

            if (index < 0 || index >= this.table.length) {
                throw new Error("Trying to access index out of bounds");
            }
    
            if(this.table[index]){

                if(this.table[index].contains(key)) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
    }

    // takes a key as an argument. If the given key is in the hash map, it should remove the entry with that key and return true. If the key isn’t in the hash map, it should return false.
    remove(key) {

        const index = this.hash(key);

        if (index < 0 || index >= this.table.length) {
            throw new Error("Trying to access index out of bounds");
        }

        if(!this.table[index]){
            console.log(`No linked list at index ${index}, key "${key}" not found.`);
            return false;
        }

        if(this.table[index]){
            if(this.table[index].contains(key)){
                let depthOfKey = this.table[index].find(key);

                this.table[index].removeAt(depthOfKey);
                this.size--;
                return true;
            } else {
                return false;
            }
        }
    }

    //returns the number of stored keys in the hash map.
    length() {
        console.log(`total keys in hash map: ${this.size}`);
        return this.size;
    }

    //removes all entries in the hash map.
    clear() {
        this.capacity = 10;
        this.table = new Array(this.capacity);
        this.size = 0;
        console.log(`The HashMap has been cleared and reset`);
    }

    //returns an array containing all the values.
    values() {
        //make copy of HashMap
        const hashMapCopy = this.table;
        const valueArray = [];

        //go through each index of HashArray
        for(const bucket of hashMapCopy){
            //if index has a linkedList
            if(bucket) {
                //iterate through array and call set method on each key/value of linkedList
                let current = bucket.head;

                while (current){
                    valueArray.push(current.value);
                    current = current.nextNode;
                }
            }
        }
        return valueArray;
    }

    //returns an array that contains each key, value pair. Example: [[firstKey, firstValue], [secondKey, secondValue]]
    entries() {
        //make copy of HashMap
        const hashMapCopy = this.table;
        const entryArray = [];

        //go through each index of HashArray
        for(const bucket of hashMapCopy){
            //if index has a linkedList
            if(bucket) {
                //iterate through array and call set method on each key/value of linkedList
                let current = bucket.head;

                while (current){
                    const key = current.key;
                    const value = current.value; 
                    
                    entryArray.push({key, value});
                    current = current.nextNode;
                }
            }
        }
        return entryArray;
    }
  }

class Node {
    constructor(key = null, value = null, nextNode = null){
        this.key = key;
        this.value = value;
        this.nextNode = nextNode;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    append(key, value) {
        let node = new Node(key, value);
        let current;

        //if list is empty, make it the head

        if(!this.head) {
            this.head = node;
        }   else {
            //start at beginning of list
            current = this.head;
            
            //cycle through list until the end node
            while(current.nextNode) {
                current = current.nextNode;
            }

            //new node becomes the last node and appended to the end of the list
            current.nextNode = node;
        }
         //increase tally of linked list size
        this.size++;
    }

    pop() {
        let secondLast;

        //if list is empty
        if(!this.head) {
            return
        }   else {
            //start at beginning of list
            secondLast = this.head;
            
            //cycle through list until the second to last node
            while(secondLast.nextNode.nextNode) {
                secondLast = secondLast.nextNode;
            }
            secondLast.nextNode = null;
            this.size--;
        }
    }

    contains(key) {
        if(!this.head){
            return false;
        }

        let current = this.head;

        while(current){
            if(current.key === key){
                return true
            } else {
                current = current.nextNode;
            }
        }

        return false; 
    }

    //find index of key in node tree

    find(key){
        let current = this.head;
        let count = 0;

        while(current){
            if(current.key === key){
                console.log(`Key "${key}" found at node depth (index) of -> ${count}`);
                return count;
            }

            current = current.nextNode;
            count++;
        }

        console.log(`Key "${key}" not found.`);
        return null;
    }

    retrieveValueFromKey(key, value) {
        let current = this.head;

        while(current){
            if(current.key === key){
                return current.value;
            }

            current = current.nextNode;
        }

        console.log("NO MATCHING KEY WAS FOUND!! \n ")
        return false; 
    }

    //Remove node at paticular index

    removeAt(index) {
        //if index is out of range 
        if(index < 0 || index >= this.size) {
            console.log(`Index ${index} is an out of bounds index`)
            return;
        }

        
        let current = this.head;

        //if list is empty
        if(index === 0) {
            //make head
            this.head = current.nextNode
        }   else {
            //start at beginning of list
            let previous = null;
            let count = 0;
            
            //cycle through list until the correct index node
            while(count < index) {
                //node before index
                previous = current; 
                current = current.nextNode;
                count++;
            }

            //delete node at index  
            previous.nextNode = current.nextNode;
        }
         //decrease tally of linked list size
        this.size--;
    }

    toString(){
        let current;
        current = this.head;
        let str = '';

        while(current) {
            str += `( Key: ${current.key}, Value: ${current.value} ) -> `;
            current = current.nextNode;
        }

        str += `null`;

        console.log(str);
    }
}

const masterHash = new HashMap(10, 0.75);

//Personal Test Case

// masterHash.set('tuesday', 'dog');
// masterHash.set('wednesday', 'cat');
// masterHash.set('thursday', 'parrot');
// masterHash.set('friday', 'Koala');
// masterHash.set('saturday', 'god');
// masterHash.set('sunday', 'findMeaning');
// masterHash.set('inTheEnd', 'itDoesntEven');
// masterHash.set('matter', 'iveComeSoFar');
// masterHash.set('sugarPie', 'honeyBun');
// masterHash.set('hereComesTheSun', 'doDodoDooDoo');

// console.log(masterHash);
// console.log(masterHash.length());
// console.log(masterHash.values());
// console.log(masterHash.entries());

// console.log(masterHash.get('matter'));
// console.log(masterHash.get('sugarPie'));

// console.log(masterHash.has('hereComesTheSun'));
// console.log(masterHash.has('monday'));
// console.log(masterHash.has('friday'));

// console.log(masterHash.remove('hereComesTheSun')); 
// console.log(masterHash.remove('monday'));
// console.log(masterHash.remove('friday')); //error in removeAt function

// console.log(masterHash.length());
// console.log(masterHash.values());
// console.log(masterHash.entries());

// masterHash.clear();
// console.log(masterHash);")


//ODIN PROJECT TEST CASE
const test = new HashMap(15, .75);

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')

console.log(test);

test.set('hat', 'white');
test.set('dog', 'pug');
test.set('apple', 'honeycrisp');

test.length();
console.log(test);

test.set('moon', 'silver');


