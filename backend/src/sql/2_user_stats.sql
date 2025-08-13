-- Table user_stats
CREATE TABLE IF NOT EXISTS user_stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL UNIQUE,
    wins INTEGER DEFAULT 0,
    losses INTEGER DEFAULT 0,
    games_played INTEGER DEFAULT 0,
    win_ratio REAL DEFAULT 0.0,
    total_score INTEGER DEFAULT 0,
    best_score INTEGER DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%f','now')),
    updated_at DATETIME NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%f','now')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Trigger pour mise à jour automatique user_stats
CREATE TRIGGER IF NOT EXISTS trg_user_stats_update
AFTER UPDATE ON user_stats
FOR EACH ROW
BEGIN
    UPDATE user_stats SET updated_at = strftime('%Y-%m-%d %H:%M:%f','now')
    WHERE id = NEW.id;
END;

-- Trigger pour calculer automatiquement le win_ratio
CREATE TRIGGER IF NOT EXISTS trg_calculate_win_ratio
AFTER UPDATE ON user_stats
FOR EACH ROW
BEGIN
    UPDATE user_stats 
    SET win_ratio = CASE 
        WHEN NEW.games_played > 0 THEN ROUND((NEW.wins * 1.0) / NEW.games_played, 3)
        ELSE 0.0 
    END
    WHERE id = NEW.id;
END;