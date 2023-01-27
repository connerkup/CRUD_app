require('dotenv').config();
const express = require("express");
const mongo = require("mongodb").MongoClient;
const crypto = require('crypto');
const { ObjectId } = require('mongodb');
const db = require('./db')
const ideasRouter = require('./routes/ideas')
const usersRouter = require('./routes/users')
const uri = process.env.MONGO_DB_URI
const port = process.env.PORT
const app = express();

app.use(express.json())

app.use('/ideas', ideasRouter);
app.use('/users', usersRouter);

/*

// Create an Idea
app.post("/ideas", (req, res) => {
  const userId = req.body.userID;
  const userFilter = { _id: new ObjectId(userId) }
  const ideaToInsert = {
    userID: userId,
    seed: generateSeed(),
    idea_name: req.body.idea_name,
    description: req.body.description
  }

  ideas.insertOne(ideaToInsert,
    (err, result) => {
      if (err) {
        console.error(err)
        res.status(500).json({ err: err })
        return
      } else {
        console.log(ideaToInsert._id)
        const ideaID = ideaToInsert._id;
        users.updateOne(
          userFilter,
          {
            $addToSet:
            {
              favorites: ideaID
            }
          },
          (err, result) => {
            if (err) {
              console.log("error executing user update")
              console.error(err)
              res.status(500).json({ err: err })
              return;
            }
            res.status(200).json({ ok: true })
          }
        )
      }
    });
})

// Return all Ideas
app.get("/ideas", (req, res) => {
  ideas.find().toArray((err, items) => {
    if (err) {
      console.error(err)
      res.status(500).json({ err: err })
      return
    }
    res.status(200).json({ ideas: items })
  })
});

// Create a new user
app.post("/users", (req, res) => {
  users.insertOne(
    {
      name: req.body.name,
      username: req.body.username,
      favorites: []
    },
    (err, result) => {
      if (err) {
        console.error(err)
        res.status(500).json({ err: err })
        return
      }
      res.status(200).json({ ok: true })
    }
  )
})

// Favorite an idea
app.put("/users/:userId/favorites/:ideaId", (req, res) => {
  let userId = new ObjectId(req.params.userId);
  let ideaId = req.params.ideaId;
  console.log(userId)
  console.log(ideaId)
  users.updateOne(
    { _id: userId },
    { $addToSet: { favorites: ideaId } },
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ err: err });
        return;
      }
      res.status(200).json({ ok: true });
    }
  );
});

app.get("/users", (req, res) => {
  users.find({}).toArray((err, items) => {
    if (err) {
      console.error(err)
      res.status(500).json({ err: err })
      return
    }
    res.status(200).json({ users: items })
  })
});

*/

db.connectToDb()
  .then(() => {
    // Server code here
    app.listen(port, () => console.log(`Server listening on port ${port}`))
  })
  .catch((err) => {
    console.error(err);
  });