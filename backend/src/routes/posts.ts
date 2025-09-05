import { Router, Request, Response } from "express";
import { getPosts, deletePost, addPost } from "../db/posts/posts";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const userId = req.query.userId?.toString();
  if (!userId) {
    res.status(400).send({ error: "userId is required" });
    return;
  }
  const posts = await getPosts(userId);
  res.send(posts);
});

router.post("/", async (req: Request, res: Response) => {

  const { userId, title, body } = req.body;

  if (!userId || !title || !body) {
    res.status(400).send({ error: "userId, title, and body are required" });
    return;
  }

  try {
    //await addPost(userId, title, body);
    //res.status(201).send({ message: "Post created successfully" });
    const newPost = await addPost(userId, title, body);
    res.status(201).send(newPost);
  } catch (error) {
    res.status(500).send({ error: "Failed to create post" });
  }

});


router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await deletePost(id);
    res.status(200).send({ message: "Post deleted successfully" });
  } catch (error: any) {
    if (error.message === "Post not found") {
      res.status(404).send({ error: "Post not found" });
    } else {
      res.status(500).send({ error: "Failed to delete post" });
    }
  }
});

export default router;
