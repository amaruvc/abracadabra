const express = require("express");
const { nextTick } = require("process");

const app = express();

app.use(express.static("static"));
app.use(express.static("assets"));

const usuarios = [
  "Javier",
  "Carlos",
  "Amaya",
  "Lucía",
  "Daniela",
  "Carmen",
  "Amanda",
  "Antonio",
  "Esteban",
];
app.get("/abracadabra/usuarios", async (req, res) => {
  return res.json(usuarios);
});

app.use("/abracadabra/juego/:usuario", (req, res, next) => {
  const usuario = req.params.usuario;

  const encontrado = usuarios.find((u) => {
    u.toLowerCase() == usuario.toLowerCase();
  });

  if (encontrado) {
    return next();
  }
  res.redirect("/assets/who.jpeg");
});

app.get("/abracadabra/juego/:usuario", (req, res) => {
  res.send("Hola" + req.params.usuario);
});

app.get("/abracadabra/conejo/:n", (req, res) => {
  const num_azar = Math.floor(Math.random() * 4);
  if (req.params.n == num_azar) {
    return res.redirect("/assets/conejito.jpg");
  }

  res.redirect("/assets/voldemort.jpg");
});

app.get("*", (req, res) => {
  res.send("Esta ruta no existe");
});

app.listen(3000, () => {
  console.log("servidor ejecutando en puerto 3000");
});
