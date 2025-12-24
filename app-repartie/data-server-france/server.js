const express = require("express");
const app = express();
app.use(express.json());

const PORT = 3002;

// Données simulées (France)
let personnel = [
    { id: "FR001", nomPrenom: "Claire Martin", etat: "actif", service: "direction générale" },
    { id: "FR002", nomPrenom: "Yanis Benali", etat: "actif", service: "informatique" }
];

let operations = [
    { id: 1, type: "Achat", responsable: "FR001", marge: 5000, kilometres: 120 },
    { id: 2, type: "Vente", responsable: "FR002", marge: 9000, kilometres: 80 }
];

app.get("/personnel", (req, res) => res.json(personnel));
app.get("/operations", (req, res) => res.json(operations));

app.listen(PORT, () => {
    console.log(`Data-server France lancé sur http://localhost:${PORT}`);
});
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  next();
});

let formations = [
  {
    id: "FR-F01",
    nomFormation: "Sécurité informatique",
    sujet: "informatique",
    date: "2023-02-01",
    engagement: 40,
    satisfaction: 70,
    motCleFormateur: "cyber",
    motClePersonnel: "IT"
  },
  {
    id: "FR-F02",
    nomFormation: "Cloud computing",
    sujet: "informatique",
    date: "2023-05-10",
    engagement: 70,
    satisfaction: 80,
    motCleFormateur: "cloud",
    motClePersonnel: "IT"
  }
];

app.get("/formations", (req, res) => res.json(formations));
let releves = [
  {
    id: "FR-R01",
    type: "drone",
    date: "2023-01-10",
    temperature: 22
  },
  {
    id: "FR-R02",
    type: "drone",
    date: "2022-11-05",
    temperature: 20
  }
];
app.get("/releves", (req, res) => res.json(releves));
