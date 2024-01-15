// Set up db connection here
// import { MongoClient } from "mongodb";

// const connectionString = "mongodb://127.0.0.1:27017";

// export const client = new MongoClient(connectionString, {
//   useUnifiedTopology: true,
// });
// export const db = client.db("practice-mongo");

import { MongoClient } from "mongodb";
const url = "mongodb://localhost:27017";
const dbName = "practice-mongo";

export const client = new MongoClient(url);
export const db = client.db(dbName);
