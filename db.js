require('dotenv').config();
const MongoClient = require("mongodb").MongoClient;
const { ObjectId } = require('mongodb');
const crypto = require('crypto')

const uri = process.env.MONGO_DB_URI;

let db, ideas, users;

const connectToDb = () => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
            if (err) {
                reject(err);
            } else {
                db = client.db("launchfizz");
                ideas = db.collection("ideas");
                users = db.collection("users");
                console.log("Connected to MongoDB")
                resolve();
            }
        });
    });
};

function generateSeed() {
    return crypto.randomBytes(16).toString('hex');
}

const createIdea = (userId, idea_name, description) => {
    const userFilter = { _id: new ObjectId(userId) };
    const ideaToInsert = {
        userID: userId,
        seed: generateSeed(),
        idea_name,
        description
    };
    return ideas.insertOne(ideaToInsert);
};

const getIdeas = () => {
    return ideas.find().toArray();
};

const updateIdea = (ideaId, updates) => {
    const updateObject = {};

    for (let key in updates) {
        updateObject[key] = updates[key]
    }

    return ideas.findOneAndUpdate({ _id: new ObjectId(ideaId) }, { $set: updateObject }, { returnOriginal: false});
}

const deleteIdea = (ideaId) => {
    return ideas.deleteOne({ _id: new ObjectId(ideaId) });
}

const createUser = (name, username) => {
    return users.insertOne({ name, username, favorites: [] });
};

const getUsers = () => {
    return users.find({}).toArray();
};

const updateUser = (userId, updates) => {
  const updateObject = {};

  for (let key in updates) {
    updateObject[key] = updates[key];
  }

  return users.findOneAndUpdate({ _id: new ObjectId(userId) }, { $set: updateObject }, { returnOriginal: false });
}

const deleteUser = (userId) => {
    return users.deleteOne({_id: new ObjectId(userId)});
}

const favoriteIdea = (userId, ideaId) => {
    userId = new ObjectId(userId);
    ideaId = new ObjectId(ideaId);
    return users.updateOne({ _id: userId }, { $addToSet: { favorites: ideaId } });
};

const getFavorites = async (userId) => {
    try {
      const user = await users.findOne({ _id: new ObjectId(userId) });
      return user.favorites;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  

module.exports = {
    connectToDb,
    createIdea,
    getIdeas,
    updateIdea,
    deleteIdea,
    createUser,
    getUsers,
    updateUser,
    deleteUser,
    favoriteIdea,
    getFavorites
};
