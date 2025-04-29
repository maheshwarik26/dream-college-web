import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { db } from "./firebaseInit.js";

async function fetchColleges() {
    const params = new URLSearchParams(window.location.search);
    const state = params.get('state');
    const city = params.get('city');
    const stream = params.get('stream');
    const collegeType = params.get('type');

    console.log("Query Params:", { state, city, stream, collegeType });

    const filters = [];
    if (state) filters.push(where("STATE", "==", state));
    if (city) filters.push(where("CITY", "==", city));
    if (stream) filters.push(where("STREAM", "==", stream));
    if (collegeType) filters.push(where("TYPE OF COLLEGE", "==", collegeType));

    console.log("Firestore Filters:", filters);

    const q = query(collection(db, "colleges"), ...filters);

    try {
        const querySnapshot = await getDocs(q);
        console.log("Number of Colleges Found:", querySnapshot.size);

        const resultsDiv = document.getElementById("results");
        if (querySnapshot.empty) {
            resultsDiv.innerHTML = "<p>No colleges found with selected filters.</p>";
        } else {
            resultsDiv.innerHTML = ""; // Clear previous results
            querySnapshot.forEach((doc) => {
            const data = doc.data();
            console.log("College Data:", data);

            resultsDiv.innerHTML += `
                <div class="col-md-4 mb-4">
                <div class="card p-3 shadow-sm">
                    <h5>${data.NAME}</h5>
                    <p><strong>City:</strong> ${data.CITY}</p>
                    <p><strong>Stream:</strong> ${data.STREAM}</p>
                    <p><strong>Type:</strong> ${data["TYPE OF COLLEGE"]}</p>
                    <p><strong>Ranking:</strong> ${data.RANKING || 'N/A'}</p>
                </div>
                </div>
            `;
            });
        }
    } catch (error) {
        console.error("Error fetching colleges:", error);
        document.getElementById("results").innerHTML = "<p>Error loading colleges. Please try again later.</p>";
    }
}

fetchColleges();
