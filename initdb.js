const Database = require('better-sqlite3');
const db = new Database('database.sqlite', { verbose: console.log });
const bcrypt = require("bcrypt")

// Create a new table called "users"

const sentencia = db.prepare(
    `CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL
);`
);

sentencia.run();

const insert = db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)');

const hashedPassword = bcrypt.hashSync("1234",10)
insert.run('admin', hashedPassword, 'admin');

const hashedPassword2 = bcrypt.hashSync("4567",10);
insert.run('user1', hashedPassword2, 'user');

//db.prepare('DELETE FROM users').run();
