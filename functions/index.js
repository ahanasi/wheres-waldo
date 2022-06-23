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
  y_min: 692,
  y_max: 722,
});

//Get Coordinates
exports.helloHttp = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") {
    // Send response to OPTIONS requests
    res.set("Access-Control-Allow-Methods", "GET");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Max-Age", "3600");
    res.status(204).send("");
  } else {
    try {
      const docName = req.body.name.toLowerCase();
      const waldoCoords = await db
        .collection("easy")
        .doc(docName)
        .get()
        .then((resolve) => {
          const actualLocation = resolve.data();
          console.log(actualLocation.x_max);
          const result = isWithinBounds(req.body.coords.x, req.body.coords.y, actualLocation);
          res.status(200).send(result);
        });
    } catch (error) {
      console.log("Error getting document", error);
    }
  }
});

const isWithinBounds = (x, y, range) => {
  return x >= range.x_min && x <= range.x_max && y >= range.y_min && y <= range.y_max;
};
