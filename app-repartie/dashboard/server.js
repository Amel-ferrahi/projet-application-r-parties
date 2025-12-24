const express = require("express");

const app = express();
const PORT = 8080;

// servir le dossier dashboard
app.use(express.static(__dirname));

app.listen(PORT, () => {
    console.log(`Dashboard lancé sur http://localhost:${PORT}`);
});
