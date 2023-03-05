const router = require("express").Router();
const db = require("../db/db.json");
const fs = require("fs");
const util = require("util");

const readFromFile = util.promisify(fs.readFile);

router.get("/notes", (req, res) => {
  try {
    readFromFile("./db/db.json").then((data) =>
      res.status(200).json(JSON.parse(data))
    );
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/notes", (req, res) => {
  try {
    const { title, text } = req.body;

    fs.readFile("./db/db.json", (err, data) => {
      if (err) throw err;

      dbNotes = JSON.parse(data);
      if (req.body) {
        const addNote = {
          title,
          text,
          id: Math.floor(Math.random() * 1000),
        };

        dbNotes.splice(0, 0, addNote);

        stringData = JSON.stringify(dbNotes);

        fs.writeFile("./db/db.json", stringData, (err) => {
          if (err) throw err;
        });
      }
    });
    res.status(200).send();
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/notes/:id", (req, res) => {
  try {
    const noteId = req.params.id;
    fs.readFile("./db/db.json", (err, data) => {
      if (err) throw err;

      dbNotes = JSON.parse(data);
      for (let i = 0; i < dbNotes.length; i++) {
        if (dbNotes[i].id === Number(noteId)) {
          dbNotes.splice([i], 1);
        }
      }
      stringData = JSON.stringify(dbNotes);

      fs.writeFile("./db/db.json", stringData, (err) => {
        if (err) throw err;
      });
    });
    res.status(200).send();
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
