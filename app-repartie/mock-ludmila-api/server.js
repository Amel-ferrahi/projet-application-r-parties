const express = require("express");
const app = express();
const PORT = 7000;

/*
  MOCK SERVER
  Conforme au contrat OpenAPI du groupe Ludmila
*/

app.get("/personnel", (req, res) => {
  res.json([
    {
      id: "EGY001",
      nom: "Hassan Ali",
      service: "maintenance",
      etat: "actif",
      site: "Egypte"
    },
    {
      id: "EGY002",
      nom: "Mona Youssef",
      service: "informatique",
      etat: "repos",
      site: "Egypte"
    }
  ]);
});

app.get("/formations", (req, res) => {
  res.json([
    {
      id: "FOR001",
      nomFormation: "Cyber securite",
      sujet: "informatique",
      engagement: 62,
      site: "Egypte"
    }
  ]);
});

app.get("/releves", (req, res) => {
  res.json([
    {
      zone: 301,
      temperature: 39,
      humidite: 22,
      pression: 1.02,
      site: "Egypte"
    }
  ]);
});

app.get("/articles", (req, res) => {
  res.json([
    {
      idProduit: 9001,
      zone: 301,
      etatEmballage: "Correct",
      collisions: 0,
      site: "Egypte"
    }
  ]);
});

app.get("/surveillance", (req, res) => {
  res.json([
    {
      zone: 301,
      dronesActifs: 4,
      dronesEnPanne: 1,
      incendie: "non",
      site: "Egypte"
    }
  ]);
});

app.listen(PORT, () => {
  console.log(`Mock Ludmila API en ligne sur http://localhost:${PORT}`);
});
