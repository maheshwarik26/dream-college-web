import { db } from './firebaseInit.js';
import {
  collection,
  getDocs,
  updateDoc,
  doc
} from "firebase/firestore";

// Function to convert a string to Title Case
function toTitleCase(str) {
  return str
    .split(' ') // Split string by spaces
    .map(word => {
      if (word.length > 0) {
        return word[0].toUpperCase() + word.slice(1).toLowerCase(); // Capitalize first letter, lowercase the rest
      }
      return word; // In case there are multiple spaces, return word as is
    })
    .join(' '); // Join the words back into a single string
}

async function updateTitleCaseFields() {
  const querySnapshot = await getDocs(collection(db, "colleges"));

  // Use for...of to properly handle async updates
  for (const docSnap of querySnapshot.docs) {
    const data = docSnap.data();
    const docRef = doc(db, "colleges", docSnap.id);

    // Convert the fields to Title Case
    const updates = {
      state: toTitleCase(data.STATE || ""),
      city: toTitleCase(data.CITY || ""),
      stream: toTitleCase(data.STREAM || ""),
      typeOfCollege: toTitleCase(data["TYPE OF COLLEGE"] || "")
    };

    try {
      // Update the document with the title-cased fields
      await updateDoc(docRef, updates);
      console.log(`✅ Updated ${data.NAME}`);
    } catch (err) {
      console.error(`❌ Error updating ${data.NAME}:`, err);
    }
  }
}

updateTitleCaseFields();
