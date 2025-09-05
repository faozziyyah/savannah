import { connection } from "../connection";
import { selectPostsTemplate } from "./query-tamplates";
import { Post } from "./types";
import { v4 as uuidv4 } from "uuid";

export const getPosts = (userId: string): Promise<Post[]> =>
  new Promise((resolve, reject) => {
    connection.all(selectPostsTemplate, [userId], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results as Post[]);
    });
  });

export const deletePost = (postId: string): Promise<void> =>
  new Promise((resolve, reject) => {

    const query = `
      DELETE FROM posts
      WHERE id = ?
    `;

    connection.run(query, [postId], function (error) {
      if (error) {
        reject(error);
      } else if (this.changes === 0) {
        reject(new Error("Post not found"));
      } else {
        resolve();
      }
    });
  });

export const addPost = (
  userId: string,
  title: string,
  body: string
): Promise<void> =>
  new Promise((resolve, reject) => {

    const id = uuidv4(); 

    const query = `
      INSERT INTO posts (id, user_id, title, body, created_at)
      VALUES (?, ?, ?, ?, datetime('now'))
    `;
    connection.run(query, [id, userId, title, body], (error) => {
      if (error) reject(error);
      else resolve();
    });
  });
