const url = require("url");
const MongoClient = require("mongodb").MongoClient;
const Twitter = require("twitter-lite");

let cachedDb = null;
let cachedClient = null;

async function connectToDatabase(uri) {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(uri, { useNewUrlParser: true });

  const db = await client.db(url.parse(uri).pathname.substr(1));

  cachedDb = db;
  return db;
}

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

function generateReport(tweets) {
  const arr = tweets
    .filter(({ entities: { urls } }) => urls.length > 0)
    .map(({ entities, user }) => ({
      urls: entities.urls.map((i) => i.expanded_url),
      user,
    }));
  const userReport = Array.from(
    arr.reduce((map, { user: { screen_name } }) => {
      map.set(screen_name, (map.get(screen_name) || 0) + 1);
      return map;
    }, new Map())
  ).sort(([, val1], [, val2]) => val2 - val1);
  const websiteReport = Array.from(
    arr.reduce((map, { urls }) => {
      urls.forEach((url) => {
        const { host } = new URL(url);
        map.set(host, (map.get(host) || 0) + 1);
      });
      return map;
    }, new Map())
  ).sort(([, val1], [, val2]) => val2 - val1);
  return [userReport, websiteReport];
}

module.exports = async (req, res) => {
  const { screen_name, oauth_token, oauth_token_secret } = req.headers;

  const client = getTwitterClient(oauth_token, oauth_token_secret);

  const [tweets, db] = await Promise.all([
    client.get("statuses/home_timeline", {
      exclude_replies: true,
      count: 20,
      tweet_mode: "extended",
    }),
    connectToDatabase(process.env.MONGODB_URI),
  ]);

  const [userReport, websiteReport] = generateReport(tweets);

  const [tweetsCollection, reportsCollection] = await Promise.all([
    db.collection("tweets"),
    db.collection("reports"),
  ]);

  await Promise.all([
    tweetsCollection.findOneAndReplace(
      { screen_name },
      { screen_name, tweets },
      { upsert: true }
    ),
    reportsCollection.insertOne({
      screen_name,
      created_at: Date.now(),
      userReport,
      websiteReport,
    }),
  ]).catch((err) => {
    res.status(500).json({ err });
  });
  res.status(200).json(tweets);
};
