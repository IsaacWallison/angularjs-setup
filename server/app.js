import express from "express";

const app = express();

const tasks = [];

app.use(express.json());

app.get("/api/tasks", (req, res) => {
  res.status(200).json(tasks);
});

app.post("/api/tasks", (req, res) => {
  const { title } = req.body;
  const task = {
    id: Date.now(),
    title,
  };
  tasks.push(task);
  res.status(201).json(task);
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`[server] started - port ${port}`));
