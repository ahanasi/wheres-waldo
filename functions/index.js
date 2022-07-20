// The Firebase Admin SDK to access Firestore.

const { async } = require("@firebase/util");
const admin = require("firebase-admin");
const functions = require("firebase-functions");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const db = admin.firestore();
const scoresRef = db.collection("hof");

//Get Coordinates
exports.getCoords = functions.https.onRequest(async (req, res) => {
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
      const lvl = req.body.lvl;
      await db
        .collection(lvl)
        .doc(docName)
        .get()
        .then((resolve) => {
          const actualLocation = resolve.data();
          console.log(req.body.coords.x, req.body.coords.y, actualLocation);
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

//Add new score
exports.addScore = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") {
    // Send response to OPTIONS requests
    res.set("Access-Control-Allow-Methods", "POST");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Max-Age", "3600");
    res.status(204).send("");
  } else {
    const name = req.body.name;
    const time = req.body.time;
    const lvl = req.body.lvl;
    const writeResult = await scoresRef.add({ name: name, score: time, level: lvl });
    res.json({ result: `Score with ID: ${writeResult.id} added.` });
  }
});
