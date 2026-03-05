const express = require("express");
const cors = require("cors");

const app = express();
let messages = [];
let users = []; 

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/messages", (req, res) => {
  res.json(messages);
});

app.post("/messages", (req, res) => {

  const { user, text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "mensaje vacío" });
  }

  const message = {
    id: Date.now(),
    user,
    text,
    date: new Date()
  };

  messages.push(message);

  res.json(message);
});

app.post("/auth/register", (req,res)=>{

  const {identifier,password} = req.body;

  if(!identifier || !password){
    return res.status(400).json({error:"datos inválidos"});
  }

  const user = {
    id: Date.now(),
    identifier,
    password
  };

  users.push(user);

  res.json({message:"usuario creado"});
});
app.post("/auth/login", (req,res)=>{

  const {identifier,password} = req.body;

  const user = users.find(u =>
    u.identifier === identifier &&
    u.password === password
  );

  if(!user){
    return res.status(401).json({error:"credenciales incorrectas"});
  }

  res.json({
    token:"fake-token"
  });

});
app.listen(3000, () => {
  console.log("Servidor iniciado en puerto 3000");
});