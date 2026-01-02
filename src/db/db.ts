import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function initDB() {
  const db = await open({
    filename: './crypto-dashboard.db',
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS trades (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      symbol TEXT,
      type TEXT,
      price REAL,
      amount REAL,
      timestamp INTEGER
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS portfolio (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      balance REAL
    );
  `);

  const row = await db.get('SELECT * FROM portfolio LIMIT 1');
  if (!row) {
    await db.run('INSERT INTO portfolio(balance) VALUES (?)', 10000);
  }

  return db;
}
