import { db } from './firebaseInit.js';

import {
  collection,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// ✅ Function to convert string to Title Case
function toTitleCase(str) {
  return str.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
}

async function searchColleges() {
  try {
    // ✅ Get query parameters from URL
    const urlParams = new URLSearchParams(window.location.search);

    const state = urlParams.get('state') ? toTitleCase(urlParams.get('state')) : '';
    const city = urlParams.get('city') ? toTitleCase(urlParams.get('city')) : '';
    const stream = urlParams.get('stream') ? toTitleCase(urlParams.get('stream')) : '';
    const type = urlParams.get('type') ? toTitleCase(urlParams.get('type')) : '';

    let q = collection(db, "colleges");

    let conditions = [];
if (state) conditions.push(where("STATE", "==", state));
if (city) conditions.push(where("CITY", "==", city));
if (stream) conditions.push(where("STREAM", "==", stream));
if (type) conditions.push(where("TYPE OF COLLEGE", "==", type));

q = query(collection(db, "colleges"), ...conditions);


    const querySnapshot = await getDocs(q);
    const resultsDiv = document.getElementById("results");

    if (querySnapshot.empty) {
      resultsDiv.innerHTML = "<p>No colleges found matching your criteria.</p>";
      return;
    }
    // ✅ Normalize query parameters to match the database field case
    const normalize = str => str.toUpperCase();

    const normalizedState = state ? normalize(state) : '';
    const normalizedCity = city ? normalize(city) : '';
    const normalizedStream = stream ? normalize(stream) : '';
    const normalizedType = type ? normalize(type) : '';

    // ✅ Update conditions with normalized values
    conditions = [];
    if (normalizedState) conditions.push(where("STATE", "==", normalizedState));
    if (normalizedCity) conditions.push(where("CITY", "==", normalizedCity));
    if (normalizedStream) conditions.push(where("STREAM", "==", normalizedStream));
    if (normalizedType) conditions.push(where("TYPE OF COLLEGE", "==", normalizedType));

    q = query(collection(db, "colleges"), ...conditions);
    querySnapshot.forEach(doc => {
      const college = doc.data();

      resultsDiv.innerHTML += `
        <div class="col-md-4">
          <div class="card mb-4">
            <div class="card-body">
              <h5 class="card-title">${college.NAME}</h5>
              <p class="card-text"><strong>City:</strong> ${college.CITY}</p>
              <p class="card-text"><strong>Stream:</strong> ${college.STREAM}</p>
              <p class="card-text"><strong>Ranking:</strong> ${college.RANKING}</p>
              <p class="card-text"><strong>Type:</strong> ${college["TYPE OF COLLEGE"]}</p>
              <a href="${college.WEBSITE}" class="btn btn-primary" target="_blank">Visit Website</a>
            </div>
          </div>
        </div>
      `;
    });
  } catch (error) {
    console.error("Error fetching colleges:", error);
  }
}

// ✅ Corrected function call
searchColleges();
