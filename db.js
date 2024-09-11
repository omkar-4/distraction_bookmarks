const sqlite3 = require("sqlite3").verbose();
const path = require("node:path");

const dbPath = path.join(__dirname, "database", "bookmarks.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  }
});

db.run(`CREATE TABLE IF NOT EXISTS bookmarks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  summary TEXT NOT NULL,
  link TEXT
)`);

function addBookmark(title, description, summary, link) {
  db.run(
    "INSERT INTO bookmarks (title, description, summary, link) VALUES (?, ?, ?, ?)",
    [title, description, summary, link],
    function (err) {
      if (err) {
        console.error(err.message);
      }
      console.log(`A row has been inserted with row-id ${this.lastID}`);
    }
  );
}

module.exports = { db, addBookmark };
