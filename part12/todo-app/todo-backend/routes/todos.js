const express = require("express");
const { Todo } = require("../mongo");
const router = express.Router();
const redis = require("../redis");

/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post("/", async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });
  let added = await redis.getAsync("added_todos");
  if (!added) {
    redis.setAsync("added_todos", 0);
  } else {
    redis.setAsync("added_todos", added + 1);
  }
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get("/", async (req, res) => {
  res.json(req.todo);
});

/* PUT todo. */
singleRouter.put("/", async (req, res) => {
  const todo = {
    id: req.todo.id,
    text: req.body.text,
    done: req.body.done,
  };
  await Todo.findByIdAndUpdate(req.todo.id, todo, { new: true });
  res.json(todo);
});

router.use("/:id", findByIdMiddleware, singleRouter);

module.exports = router;
