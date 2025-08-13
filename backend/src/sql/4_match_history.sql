-- Table match_history
CREATE TABLE IF NOT EXISTS match_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    player1_id INTEGER NOT NULL,
    player2_id INTEGER NOT NULL,
    winner_id INTEGER,
    player1_score INTEGER DEFAULT 0,
    player2_score INTEGER DEFAULT 0,
    match_type TEXT DEFAULT '1v1',
    match_date DATETIME NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%f','now')),
    duration INTEGER DEFAULT 0,
    tournament_id INTEGER DEFAULT NULL,
    status TEXT DEFAULT 'completed',
    FOREIGN KEY (player1_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (player2_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (winner_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (tournament_id) REFERENCES tournaments(id) ON DELETE SET NULL
);
