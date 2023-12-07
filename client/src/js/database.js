import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    console.log('PUT to the database');
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');  
    const request = store.put({ value: content }); 
    await tx.done;
    console.log('Data saved to the database', content);
    return content;
  } catch (error) {
    console.error('Error putting data to the database', error);
    throw error;
  }
};
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async (key) => {
  try {
    console.log(`Attempting to retrieve data with key ${key} from the database`);
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const request = store.get(key);
    const result = await request;
    
    if (result) {
      console.log(`Data successfully retrieved for key ${key}:`, result.value);
      return result.value;
    } else {
      console.log(`No data found in the database for key ${key}`);
      return null; 
    }
  } catch (error) {
    console.error(`Error retrieving data from the database for key ${key}:`, error);
    throw error;
  }
};

initdb();
