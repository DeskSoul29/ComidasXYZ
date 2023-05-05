import { config } from "dotenv";

config();

const usuario = "desksoul29";
const password = "desk123";
const dbName = "ComidasXYZ";

export const PORT = process.env.PORT || 4000;
export const MONGODB_URI =
  process.env.MONGODB_URI ||
  `mongodb+srv://${usuario}:${password}@clusterup.yuxje.mongodb.net/${dbName}?retryWrites=true&w=majority`;