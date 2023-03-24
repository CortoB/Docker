import express from "express";
const app = express();
const port = 8081;

let employees = [
  {
    id: 1,
    firstName: "Corto",
    lastName: "Bruzda",
    emailId: "cortobruzda@gmail.com",
  },

  {
    id: 2,
    firstName: "AAA",
    lastName: "BBB",
    emailId: "CCC",
  },

  {
    id: 3,
    firstName: "DDD",
    lastName: "EEE",
    emailId: "FFF",
  },
];

// Middleware pour parser les données JSON
app.use(express.json());

// GET: Récupérer tous les utilisateurs
app.get("/employees", (req, res) => {
  res.json(employees);
});

// GET: Récupérer un utilisateur par son ID
app.get("/employees/id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = employees.find((user) => user.id === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send("Utilisateur non trouvé");
  }
});

// POST: Créer un nouvel utilisateur
app.post("/employees", (req, res) => {
  const user = req.body;
  employees.push(user);
  res.json(user);
});

// PUT: Mettre à jour un utilisateur existant
app.put("/employees/id", (req, res) => {
  const id = parseInt(req.params.id);
  const newUser = req.body;
  const index = employees.findIndex((user) => user.id === id);
  if (index !== -1) {
    employees[index] = { id, ...newUser };
    res.json(employees[index]);
  } else {
    res.status(404).send("Utilisateur non trouvé");
  }
});

// DELETE: Supprimer un utilisateur existant
app.delete("/employees/id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = employees.findIndex((user) => user.id === id);
  if (index !== -1) {
    employees.splice(index, 1);
    res.send("Utilisateur supprimé avec succès");
  } else {
    res.status(404).send("Utilisateur non trouvé");
  }
});

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
