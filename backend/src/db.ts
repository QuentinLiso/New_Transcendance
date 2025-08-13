import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

export function createDatabase(): Database.Database {
  if (!fs.existsSync("./data")) {
    fs.mkdirSync("./data", { recursive: true });
  }
  const dbPath = process.env.DB_PATH || "./data/main.db";
  const db = new Database(dbPath);

  db.exec(`
		CREATE TABLE IF NOT EXISTS sqlFiles (
			id TEXT PRIMARY KEY,
			applied_at TEXT DEFAULT CURRENT_TIMESTAMP
		)
	`);

  return db;
}

export function createTables(
  db: Database.Database,
  logger: { info: (...args: any) => void; error: (...args: any) => void }
) {
  const sqlDir = path.join(__dirname, "sql");
  const sqlFiles = fs.readdirSync(sqlDir).sort();
  for (const file of sqlFiles) {
    const fileId = file;
    const alreadyApplied = db
      .prepare("SELECT 1 FROM sqlFiles WHERE id = ? LIMIT 1")
      .get(fileId);
    if (alreadyApplied) {
      logger.info(`🆗 Table ${fileId} already existing`);
      continue;
    }
    const sql = fs.readFileSync(path.join(sqlDir, file), "utf8");
    try {
      db.exec(sql);
      db.prepare("INSERT INTO sqlFiles (id) VALUES (?)").run(fileId);
      logger.info(`✅ Table ${fileId} created`);
    } catch (e: any) {
      logger.error(`❌ Error creating table ${fileId}`);
      throw e;
    }
  }
}
