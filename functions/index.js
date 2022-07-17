// The Firebase Admin SDK to access Firestore.

const { async } = require("@firebase/util");
const admin = require("firebase-admin");
const functions = require("firebase-functions");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const db = admin.firestore();

//Populate db
const waldoRef = db.collection("easy").doc("waldo");
waldoRef.set({
  x_min: 1218,
  x_max: 1248,
  y_min: 692,
  y_max: 722,
});

const wilmaRef = db.collection("easy").doc("wilma");
wilmaRef.set({
  x_min: 692,
  x_max: 722,
  y_min: 409,
  y_max: 439,
});

const odlawRef = db.collection("easy").doc("odlaw");
odlawRef.set({
  x_min: 444,
  x_max: 474,
  y_min: 613,
  y_max: 643,
});

const wizRef = db.collection("easy").doc("wizard whitebeard");
wizRef.set({
  x_min: 85,
  x_max: 115,
  y_min: 720,
  y_max: 750,
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
      const lvl = req.body.lvl;
      await db
        .collection(lvl)
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

const scoresRef = db.collection("hof");
const tomRef = scoresRef.doc();
const dickRef = scoresRef.doc();
const harryRef = scoresRef.doc();

tomRef.set({
  name: "Tom",
  score: 2244,
});
dickRef.set({
  name: "Dick",
  score: 235,
});
harryRef.set({
  name: "Harry",
  score: 784,
});

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
