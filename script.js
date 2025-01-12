if (index < 0 || index >= buckets.length) {
    throw new Error("Trying to access index out of bounds");
}


  class HashMap {
    constructor(capacity, loadFactor){
        this.capacity = capacity;
        this.loadFactor = loadFactor;
    }

    hash(key){
        let hashCode = 0;
      
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }

        return hashCode;
    }

    set(key, value){
        //if  If a key already exists, then the old value is overwritten, 
        // and we can say that we update the key’s value (e.g. Carlos is our key but it is called twice: once with value I am the old value., and once with value I am the new value.. 
        // Following this logic, Carlos should contain only the latter value).

        this.key = key;
        this.value = value; 
    }
  }

const masterHash = new HashMap(10, 0.75);