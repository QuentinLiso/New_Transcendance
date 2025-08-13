import Database from "better-sqlite3";

// User table
// CREATE TABLE IF NOT EXISTS users (
//   id          INTEGER PRIMARY KEY AUTOINCREMENT,
//   pseudo      TEXT    NOT NULL UNIQUE,
//   email       TEXT    NOT NULL UNIQUE,
//   pwd_hash    TEXT    NOT NULL,
//   nb_games    INTEGER NOT NULL DEFAULT 0,
//   is2fa       INTEGER NOT NULL DEFAULT 0,
//   totp_secret TEXT,
//   locale      TEXT,
//   avatar_url  TEXT DEFAULT NULL '/uploads/avatars/default-avatar.png',
//   created_at  DATETIME NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%f','now')),
//   updated_at  DATETIME NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%f','now'))
// );

export interface IUser {
  id: number;
  pseudo: string;
  email: string;
  pwd_hash: string;
  nb_games: number;
  is2fa: boolean;
  totp_secret: string | null;
  locale: string | null;
  created_at: string;
  updated_at: string;
}

export class UserModel {
  constructor(private db: Database.Database) {}

  private rowToUser(row: any): IUser {
    return {
      ...row,
      is2fa: !!row.is2fa,
    };
  }

  findByPseudoOrEmail(pseudo: string, email: string): IUser | undefined {
    const row = this.db
      .prepare("SELECT * FROM users WHERE pseudo = ? or email = ? LIMIT 1")
      .get(pseudo, email) as any | undefined;
    return row ? this.rowToUser(row) : undefined;
  }

  existsByPseudoOrEmail(pseudo: string, email: string): boolean {
    return !!this.findByPseudoOrEmail(pseudo, email);
  }

  getUserById(id: number): IUser | undefined {
    const row = this.db
      .prepare("SELECT * FROM users WHERE id = ? LIMIT 1")
      .get(id) as any | undefined;
    return row ? this.rowToUser(row) : undefined;
  }

  createUser(pseudo: string, email: string, pwd_hash: string) {
    const statement = this.db.prepare(
      "INSERT INTO users (pseudo, email, pwd_hash) VALUES (?, ?, ?)"
    );
    return statement.run(pseudo, email, pwd_hash);
  }

  getUserPseudoAndEmailFromId(
    id: number
  ): { email: string; pseudo: string } | undefined {
    const row = this.db
      .prepare("SELECT email, pseudo FROM users WHERE id = ? LIMIT 1")
      .get(id) as { email: string; pseudo: string } | undefined;
    return row ?? undefined;
  }

  getUserForLogin(
    pseudo: string,
    email: string
  ):
    | {
        id: number;
        email: string;
        pseudo: string;
        pwd_hash: string;
        is2fa: boolean;
      }
    | undefined {
    const row = this.db
      .prepare(
        "SELECT email, pseudo, pwd_hash, is2fa FROM users WHERE pseudo = ? or email = ? LIMIT 1"
      )
      .get(pseudo, email) as
      | {
          id: number;
          email: string;
          pseudo: string;
          pwd_hash: string;
          is2fa: number;
        }
      | undefined;
    return row ? { ...row, is2fa: !!row.is2fa } : undefined;
  }

  updateUser2faStatus(id: number) {
    return this.db.prepare("UPDATE users SET is2fa = 1 WHERE id = ?").run(id);
  }

  getUserTotpSecret(id: number): string | undefined {
    const row = this.db
      .prepare("SELECT totp_secret FROM users WHERE id = ? LIMIT 1")
      .get(id) as { totp_secret?: string } | undefined;
    return row?.totp_secret;
  }

  updateUserTotpSecret(id: number, totp_secret: string) {
    return this.db
      .prepare("UPDATE users SET totp_secret = ? WHERE id = ?")
      .run(totp_secret, id);
  }

  getUserAvatarUrl(id: number): string | undefined {
    const row = this.db
      .prepare("SELECT avatar_url FROM users WHERE id = ? LIMIT 1")
      .get(id) as { avatar_url?: string } | undefined;
    return row?.avatar_url;
  }

  updateUserAvatarUrl(id: number, avatarUrl: string) {
    return this.db
      .prepare("UPDATE users SET avatar_url = ? WHERE id = ?")
      .run(avatarUrl, id);
  }

  findAllUsers(): IUser[] {
    const rows = this.db.prepare("SELECT * FROM users").all() as any[];
    return rows.map((r) => this.rowToUser(r));
  }
}
