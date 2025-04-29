// uploadData.js

import { db } from './firebase';  // Import your Firebase configuration
import { collection, addDoc } from 'firebase/firestore';  // Import Firestore methods
import * as fs from 'fs';  // File system module to read JSON file

// Load the college data from your JSON file
const colleges = JSON.parse(fs.readFileSync('colleges.json', 'utf-8'));

// Function to upload data to Firestore
async function uploadData() {
  for (const college of colleges) {
    try {
      // Add each college as a document in the "colleges" collection
      await addDoc(collection(db, 'colleges'), college);
      console.log(`${college.NAME} added successfully!`);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  console.log("Data upload completed!");''
}

// Call the function to start uploading
uploadData();
