// The Firebase Admin SDK to access Firestore.

const admin = require("firebase-admin");
const functions = require("firebase-functions");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const db = admin.firestore();

//Populate db
const docRef = db.collection("easy").doc("waldo");
docRef.set({
  x_min: 1218,
  x_max: 1248,
  y_min: 581,
  y_max: 611,
});

//Get Coordinates
exports.helloHttp = functions.https.onRequest(async (req, res) => {
  try {
    const waldoCoords = await db.collection("easy").doc("waldo").get();
    res.send(waldoCoords.data());
  } catch (error) {
    console.log("Error getting document", error);
  }
});
