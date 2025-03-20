/**
 * A (mostly complete) mock of localStorage
 */

const storage = new Map();

export default () => {
    return { //replace localStorage with this fake version
        getItem: (key: string) => { //get item from storage
            return storage.get(key); //return the items in the storage
        },

        setItem: (key: string, value: string) => { //set item in storage
            return storage.set(key, value); //return that you set the items in the storage with the key and value
        },

        length: storage.size, // always return 0 bc we are not actually storing anything (not really needed, these under are not needed for our app but god to know)

        clear: () => {
            return storage.clear(); //clear the storage
        },

        key: () => {
            return null; //return null
        },

        removeItem: (key: string) => {
            return storage.delete(key); //delete the item in the storage
        },
    };
};  