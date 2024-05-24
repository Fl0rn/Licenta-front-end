import * as SQLite from "expo-sqlite";
import { Plangeri } from '../components/reclamatiiComponents/UserCreatorPage'
import { ReclamatiiToSend } from "../components/reclamatiiComponents/AddReclamatieModal";

const db = SQLite.openDatabaseAsync("plangeri.db");
type PlangeriToInsert = Omit<ReclamatiiToSend, "image">;
export async function init() {
  (await db).execAsync(`
    CREATE TABLE IF NOT EXISTS plangeri(
        id INTEGER PRIMARY KEY NOT NULL
        accoutId TEXT NOT NULL
        accoutName TEXT NOT NULL
        title TEXT NOT NULL
        description TEXT NOT NULL
        status TEXT NOT NULL
        latitude REAL NOT NULL
        longitude REAL NOT NULL
    )`);
}
export async function insertPlangeri(plangeri: PlangeriToInsert) {
  const result = (await db).runAsync(
    "INSERT INTO plangeri (accoutId,accoutName,title,description,status,latitude,longitude VALUES (?,?,?,?,?,?,?)",
    [
      plangeri.accountId,
      plangeri.accountName,
      plangeri.title,
      plangeri.description,
      plangeri.status,
      plangeri.latitude,
      plangeri.longitude,
    ]
  );
  return result
}
