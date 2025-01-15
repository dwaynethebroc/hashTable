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
            hashCode = ((primeNumber * hashCode + key.charCodeAt(i)) % this.capacity);
        }
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
        }

        const testIfKeyExists = this.has(key);


        //if  If a key already exists, then the old value is overwritten, 
        // and we can say that we update the key’s value (e.g. Carlos is our key but it is called twice: once with value I am the old value., and once with value I am the new value.. 
        // Following this logic, Carlos should contain only the latter value).
        if(testIfKeyExists){
            const index = this.hash(key);
            const linkedList = this.table[index];
            linkedList.append(key, value);

            this.table[index] = linkedList;

            console.log('key has been updated');
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

        if (index < 0 || index >= this.table.length) {
            throw new Error("Trying to access index out of bounds");
        }

        if(this.table[index]){

            const linkedList = this.table[index];
            if(linkedList.contains(key)) {
                return true;
            } else {
                return false;
            }
        }
    }

    // takes a key as an argument. If the given key is in the hash map, it should remove the entry with that key and return true. If the key isn’t in the hash map, it should return false.
    remove(key) {
        const index = this.hash(key);

        if (index < 0 || index >= this.table.length) {
            throw new Error("Trying to access index out of bounds");
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
        this.table = new Array(this.capacity);
    }

    //returns an array containing all the values.
    values() {
        
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
        let current = this.head;

        while(current){
            if(current.key === key){
                console.log(`FOUND KEY! \n`);
                return true
            }

            current = current.nextNode;
        }

        return false; 
    }

    //find index of key in node tree

    find(key){
        let current = this.head;
        let count = 0;

        while(current.nextNode){
            if(current.key === key){
                console.log(`KEY FOUND AT INDEX:`);
                console.log(`${count} \n`);
                return count;
            }

            current = current.nextNode;
            count++;
        }

        console.log(`VALUE NOT FOUND AT ANY INDEX :(((`);
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
        if(index > 0 && index > this.size) {
            return;
        }

        let count = 0;
        let current;
        let previous;

        //if list is empty
        if(!this.head) {
            //make head
            this.head = node;
            return;
        }   else {
            //start at beginning of list
            previous = null;
            current = this.head;
            
            //cycle through list until the correct index node
            while(count < index) {
                //node before index
                previous = current; 
                count++;
                //node after index
                current = current.nextNode;
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

masterHash.set('tuesday', 'dog');
masterHash.set('wednesday', 'cat');
masterHash.set('thursday', 'parrot');
masterHash.set('friday', 'Koala');
masterHash.set('saturday', 'god');
masterHash.set('sunday', 'findMeaning');
masterHash.set('inTheEnd', 'itDoesntEven');
masterHash.set('matter', 'iveComeSoFar');
masterHash.set('sugarPie', 'honeyBun');
masterHash.set('hereComesTheSun', 'doDooDooDoo');


console.log(masterHash);

