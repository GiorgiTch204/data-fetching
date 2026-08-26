const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "..", "app.db");
console.log("Opening database at:", dbPath);

const db = new Database(dbPath);

const badRows = db
  .prepare("SELECT id, title, price FROM Product WHERE price > 1000000")
  .all();
console.log("Bad rows found:", badRows);

if (badRows.length === 0) {
  console.log("No bad rows found. Checking ALL rows instead:");
  const allRows = db.prepare("SELECT id, title, price FROM Product").all();
  console.log(allRows);
} else {
  const update = db.prepare("UPDATE Product SET price = 500 WHERE id = ?");
  for (const row of badRows) {
    update.run(row.id);
    console.log(`Fixed product ${row.id} (${row.title})`);
  }
}

db.close();
console.log("Done.");
