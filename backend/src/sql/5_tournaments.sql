-- Table tournaments
CREATE TABLE IF NOT EXISTS tournaments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    max_players INTEGER DEFAULT 8,
    current_players INTEGER DEFAULT 0,
    status TEXT DEFAULT 'pending',
    winner_id INTEGER DEFAULT NULL,
    created_by INTEGER NOT NULL,
    created_at DATETIME NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%f','now')),
    started_at DATETIME DEFAULT NULL,
    ended_at DATETIME DEFAULT NULL,
    FOREIGN KEY (winner_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
);