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

            //rehash old array into new function 
            //for reach filled bucket
            for(const bucket of tempArray){
                //if bucket is filled
                if(bucket) {
                    if(bucket.isArray() === true){
                        //iterate through array and set each value of linkedList into new hashmap
                    } else {
                        //
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
            this.table[index] = {
                key: key,
                value: value,
            }

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

            console.log(`Index: ${index}, Key: ${this.table[index].key}, Value: ${this.table[index].value}, Size: ${this.size}`);
        }
    }


    get(key) {
        const index = this.hash(key);

        if (index < 0 || index >= this.table.length) {
            throw new Error("Trying to access index out of bounds");
        }

        const value = this.table[index].value; 
        
        if(value) {
            return value;
        } else {
            return null;
        }
    }

    has(key) {
        const index = this.hash(key);

        if (index < 0 || index >= this.table.length) {
            throw new Error("Trying to access index out of bounds");
        }

        if(this.table[index]){
            // if(this.table[index].key === key) {
            //     console.log('key exists');
            //     return true;
            // } else {
            //     console.log('new key entry');
            //     return false;
            // }

            //Go through each node of the linkedList and check if the key exists already

            
        }
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

