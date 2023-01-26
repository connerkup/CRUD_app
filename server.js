require('dotenv').config();
const express = require("express")
const mongo = require("mongodb").MongoClient

const uri = process.env.MONGO_DB_URI

const app = express();

let db, ideas, expenses;

mongo.connect(
  uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, client) => {
    if (err) {
      console.error(err)
      return
    }
    db = client.db("launchfizz")
    ideas = db.collection("ideas")
    users = db.collection("users")
    console.log("Connected to MongoDB succesfully")
  }
)

app.use(express.json())


app.post("/ideas", (req, res) => {
  ideas.insertOne(
    {
      seed: req.body.seed,
      idea_name: req.body.idea_name,
      description: req.body.description
    },
    (err, result) => {
      if (err) {
        console.error(err)
        res.status(500).json({ err: err })
        return
      }
      console.log(result)
      res.status(200).json({ ok: true })
    })
})

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

app.post("/users", (req, res) => {
  users.insertOne(
    {
      name: req.body.name,
      username: req.body.username
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

app.get("/users", (req, res) => {
  /* */
  users.find({}).toArray((err, items) => {
    if (err) {
      console.error(err)
      res.status(500).json({ err: err })
      return
    }
    res.status(200).json({ users: items })
  })
});

app.listen(3000, () => console.log("Server listening on port 3000"))