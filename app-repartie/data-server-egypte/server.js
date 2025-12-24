// =======================
// 1. Imports
// =======================
const express = require("express");
const sqlite3 = require("sqlite3").verbose();

// =======================
// 2. App & middleware
// =======================
const app = express();
app.use(express.json());
const PORT = 3001;

// =======================
// 3. Connexion SQLite
// =======================
const db = new sqlite3.Database("./database.db");

// =======================
// 4. Création des tables
// =======================
db.serialize(() => {

  db.run(`
    CREATE TABLE IF NOT EXISTS personnel (
      id TEXT PRIMARY KEY,
      nomPrenom TEXT,
      etat TEXT,
      service TEXT,
      frequenceCardiaque INTEGER,
      latitude REAL,
      longitude REAL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS operations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT,
      responsable TEXT,
      marge REAL,
      kilometres INTEGER,
      motCleResponsable TEXT,
      motCleClient TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS formations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nomFormation TEXT,
      sujet TEXT,
      date TEXT,
      engagement INTEGER,
      satisfaction INTEGER,
      motCleFormateur TEXT,
      motClePersonnel TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS releves (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      zone INTEGER,
      temperature REAL,
      humidite REAL,
      pression REAL,
      co2 REAL,
      pm10 REAL,
      pm25 REAL,
      date TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS articles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      zone INTEGER,
      etatEmballage TEXT,
      responsable TEXT,
      latitude REAL,
      longitude REAL,
      rotationX REAL,
      rotationY REAL,
      rotationZ REAL,
      collisions INTEGER,
      date TEXT
    )
  `);
});
db.run(`
  INSERT OR IGNORE INTO personnel VALUES
  ('EGY001', 'Nour El Fayed', 'actif', 'finance et gestion', 78, 30.0444, 31.2357),
  ('EGY002', 'Omar Hassan', 'actif', 'informatique', 72, 30.0500, 31.2400),
  ('EGY003', 'Mona Adel', 'actif', 'ressources humaines', 75, 30.0600, 31.2500)
`);
db.run(`
  INSERT OR IGNORE INTO operations
  (id, type, responsable, marge, kilometres, motCleResponsable, motCleClient)
  VALUES
  (1, 'Achat', 'EGY001', 3000, 120, 'finance', 'fournisseur'),
  (2, 'Vente', 'EGY002', 4500, 80, 'informatique', 'client'),
  (3, 'Achat', 'EGY003', 2000, 60, 'rh', 'prestataire')
`);
db.run(`
  INSERT OR IGNORE INTO formations
  (id, nomFormation, sujet, date, engagement, satisfaction, motCleFormateur, motClePersonnel)
  VALUES
  (1, 'Sécurité IT', 'informatique', '2024-02-10', 40, 60, 'cyber', 'IT'),
  (2, 'Gestion de projet', 'management', '2024-03-15', 70, 80, 'agile', 'RH')
`);
db.run(`
  INSERT OR IGNORE INTO articles
  (id, zone, etatEmballage, responsable, latitude, longitude,
   rotationX, rotationY, rotationZ, collisions, date)
  VALUES
  (1, 1, 'correct', 'EGY001', 30.0444, 31.2357, 0.1, 0.2, 0.3, 0, '2023-09-01'),
  (2, 2, 'déformé', 'EGY002', 30.0500, 31.2400, 1.2, 0.4, 0.6, 3, '2022-08-15')
`);
db.run(`
  INSERT OR IGNORE INTO releves
  (id, zone, temperature, humidite, pression, co2, pm10, pm25, date)
  VALUES
  (301, 1, 22.5, 45, 1012, 420, 18, 12, '2021-06-01'),
  (302, 2, 21.0, 50, 1010, 410, 20, 14, '2023-03-15')
`);


// =======================
// 5. ROUTES REST
// =======================

// ----- Personnel -----
app.get("/personnel", (req, res) => {
  db.all("SELECT * FROM personnel", [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

app.post("/personnel", (req, res) => {
  const p = req.body;
  db.run(
    `INSERT INTO personnel VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      p.id,
      p.nomPrenom,
      p.etat,
      p.service,
      p.frequenceCardiaque,
      p.latitude,
      p.longitude
    ],
    err => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ message: "Personnel ajouté" });
    }
  );
});

// ----- Opérations -----
app.get("/operations", (req, res) => {
  db.all("SELECT * FROM operations", [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

app.post("/operations", (req, res) => {
  const o = req.body;
  db.run(
    `INSERT INTO operations (type, responsable, marge, kilometres, motCleResponsable, motCleClient)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      o.type,
      o.responsable,
      o.marge,
      o.kilometres,
      o.motCleResponsable,
      o.motCleClient
    ],
    err => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ message: "Opération ajoutée" });
    }
  );
});

// ----- Formations -----
app.get("/formations", (req, res) => {
  db.all("SELECT * FROM formations", [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

app.post("/formations", (req, res) => {
  const f = req.body;
  db.run(
    `INSERT INTO formations (nomFormation, sujet, date, engagement, satisfaction, motCleFormateur, motClePersonnel)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      f.nomFormation,
      f.sujet,
      f.date,
      f.engagement,
      f.satisfaction,
      f.motCleFormateur,
      f.motClePersonnel
    ],
    err => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ message: "Formation ajoutée" });
    }
  );
});

// ----- Relevés sanitaires -----
app.get("/releves", (req, res) => {
  db.all("SELECT * FROM releves", [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

app.post("/releves", (req, res) => {
  const r = req.body;
  db.run(
    `INSERT INTO releves (zone, temperature, humidite, pression, co2, pm10, pm25, date)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      r.zone,
      r.temperature,
      r.humidite,
      r.pression,
      r.co2,
      r.pm10,
      r.pm25,
      r.date
    ],
    err => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ message: "Relevé ajouté" });
    }
  );
});

// ----- Articles -----
app.get("/articles", (req, res) => {
  db.all("SELECT * FROM articles", [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

app.post("/articles", (req, res) => {
  const a = req.body;
  db.run(
    `INSERT INTO articles (zone, etatEmballage, responsable, latitude, longitude,
                           rotationX, rotationY, rotationZ, collisions, date)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      a.zone,
      a.etatEmballage,
      a.responsable,
      a.latitude,
      a.longitude,
      a.rotationX,
      a.rotationY,
      a.rotationZ,
      a.collisions,
      a.date
    ],
    err => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ message: "Article ajouté" });
    }
  );
});

// =======================
// 6. Lancement serveur
// =======================
app.listen(PORT, () => {
  console.log(`Data-server Égypte lancé sur http://localhost:${PORT}`);
});
