import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase"; // Ensure correct import of Firebase instance


async function removeDuplicateColleges() {
    try {
        const collegesCollection = collection(db, "colleges");
        const querySnapshot = await getDocs(collegesCollection);

        let collegeMap = {}; // Store unique college names

        for (let document of querySnapshot.docs) {
            let college = document.data();
            let collegeName = college.name.trim().toLowerCase(); // Normalize name to avoid case differences

            if (collegeMap[collegeName]) {
                // 🔥 Duplicate found, delete it
                await deleteDoc(doc(db, "colleges", document.id));
                console.log(`❌ Deleted duplicate: ${college.name}`);
            } else {
                // ✅ First occurrence, keep it
                collegeMap[collegeName] = true;
            }
        }

        console.log("🎉 Duplicate removal completed!");
    } catch (error) {
        console.error("❌ Error removing duplicates: ", error);
    }
}

// Run the function
removeDuplicateColleges();

// 📌 List of Maharashtra Engineering Colleges
const colleges = [
    { NAME: "COEP Pune", STATE: "Maharashtra", CITY: "Pune", RANKING: "5", "TYPE OF COLLEGE": "Autonomous" },
    { NAME: "VJTI Mumbai", STATE: "Maharashtra", CITY: "Mumbai", RANKING: "8", "TYPE OF COLLEGE": "Autonomous" },
    { NAME: "SPIT Mumbai", STATE: "Maharashtra", CITY: "Mumbai", RANKING: "15", "TYPE OF COLLEGE": "Private" },
    { NAME: "MIT Pune", STATE: "Maharashtra", CITY: "Pune", RANKING: "20", "TYPE OF COLLEGE": "Private" },
    { NAME: "Walchand College of Engineering", STATE: "Maharashtra", CITY: "Sangli", RANKING: "25", "TYPE OF COLLEGE": "Autonomous" }
];

// Function to Add Colleges to Firebase **Without Duplicates**
async function addCollegesToFirestore() {
    try {
        const collegesCollection = collection(db, "colleges");

        for (let college of colleges) {
            // 🔍 Check if the college already exists
            const q = query(collegesCollection, where("name", "==", college.name));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                console.log(`⚠️ College already exists: ${college.name}`);
                continue; // Skip duplicate entries
            }

            // ✅ If not found, add the new college
            await addDoc(collegesCollection, college);
            console.log(`✅ Added: ${college.name}`);
        }

        console.log("🎉 College data upload completed!");
    } catch (error) {
        console.error("❌ Error adding colleges: ", error);
    }
}

// Call the function to add colleges
addCollegesToFirestore();
