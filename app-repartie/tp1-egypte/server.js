const express = require("express");
const app = express();
app.use(express.json());
const PORT = 3000;

// ======================
// DONNÉES SIMULÉES
// ======================

// PERSONNEL
let personnel = [
    {
        id: "EGY001",
        nomPrenom: "Nour El Fayed",
        etat: "actif",
        service: "finance et gestion",
        frequenceCardiaque: 78,
        position: { lat: 30.0444, lon: 31.2357 }
    },
    {
        id: "EGY002",
        nomPrenom: "Mina Saad",
        etat: "repos",
        service: "direction générale",
        frequenceCardiaque: 70,
        position: { lat: 29.97, lon: 31.25 }
    }
];

// OPERATIONS COMMERCIALES
let operations = [
    {
        id: 1,
        type: "Achat",
        responsable: "EGY001",
        marge: 12000,
        kilometres: 300,
        motCleResponsable: "fournisseur",
        motCleClient: "livraison"
    },
    {
        id: 2,
        type: "Vente",
        responsable: "EGY002",
        marge: 18000,
        kilometres: 120,
        motCleResponsable: "client",
        motCleClient: "qualité"
    }
];

// ======================
// ROUTES
// ======================

app.get("/", (req, res) => {
    res.send("Serveur Égypte TP1-TP2 OK");
});

// PERSONNEL
app.get("/personnel", (req, res) => {
    res.json(personnel);
});

app.post("/personnel", (req, res) => {
    personnel.push(req.body);
    res.status(201).json({ message: "Personnel ajouté" });
});

// OPERATIONS
app.get("/operations", (req, res) => {
    res.json(operations);
});

app.post("/operations", (req, res) => {
    operations.push(req.body);
    res.status(201).json({ message: "Opération ajoutée" });
});

// ======================
// START SERVER
// ======================

app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
