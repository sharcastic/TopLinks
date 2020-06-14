import Twitter from "twitter-lite";
const url = require("url");
const MongoClient = require("mongodb").MongoClient;

let cachedClient = null;
let cachedDb = null;

const connectToDatabase = async (uri) => {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(uri, { useNewUrlParser: true });

  const db = await client.db(url.parse(uri).pathname.substr(1));

  cachedDb = db;
  return db;
};

function getTwitterClient(access_token_key, access_token_secret) {
  if (cachedClient) {
    return cachedClient;
  }
  const client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY, // from Twitter.
    consumer_secret: process.env.CONSUMER_SECRET, // from Twitter.
    access_token_key, // from your User (oauth_token)
    access_token_secret, // from your User (oauth_token_secret)
    tweet_mode: "extended",
  });
  cachedClient = client;
  return client;
}

module.exports = async (req, res) => {
  const { screen_name, oauth_token, oauth_token_secret } = req.headers;

  const client = getTwitterClient(oauth_token, oauth_token_secret);

  const [tweets, db] = await Promise.all([
    client.get("statuses/home_timeline", {
      exclude_replies: true,
      count: 200,
      tweet_mode: "extended",
    }),
    connectToDatabase(process.env.MONGODB_URI),
  ]);

  const collection = await db.collection("tweets");
  await collection.findOneAndReplace(
    { screen_name },
    { screen_name, tweets },
    { upsert: true }
  );

  res.status(200).json(tweets);
};
