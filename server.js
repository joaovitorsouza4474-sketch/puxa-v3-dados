const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));
app.use("/static", express.static("static"));

const PAINEL_SENHA = "BOTV3";

// LOGIN
app.post("/login", (req, res) => {
  const { senha } = req.body;
  if (senha === PAINEL_SENHA) return res.json({ ok: true });
  res.json({ ok: false });
});

// APIs
app.get("/api/cep", async (req, res) => {
  try {
    const cep = req.query.valor;
    const r = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    res.json(r.data);
  } catch { res.json({ erro: true }); }
});

app.get("/api/ip", async (req, res) => {
  try {
    const r = await axios.get("https://api.ipify.org?format=json");
    res.json(r.data);
  } catch { res.json({ erro: true }); }
});

app.get("/api/clima", async (req, res) => {
  try {
    const cidade = req.query.cidade;
    const r = await axios.get(`https://wttr.in/${cidade}?format=j1`);
    res.json(r.data);
  } catch { res.json({ erro: true }); }
});

app.get("/api/ping", async (req, res) => {
  res.json({ ok: true, host: req.query.host });
});

app.get("/api/gerar/cpf", (req, res) => {
  const n = () => Math.floor(Math.random() * 9);
  const cpf = Array.from({ length: 11 }, n).join("");
  res.json({ cpf });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, () => console.log("Rodando na porta " + PORT));