import { connection } from "../connection";
import { selectCountOfUsersTemplate, selectUsersTemplate, } from "./query-templates";
import { User, UserAdder } from "./types";

export const getUsersCount = (): Promise<number> =>

  new Promise((resolve, reject) => {
    connection.get<{ count: number }>(
      selectCountOfUsersTemplate,
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.count);
      }
    );
  });

export const getUsers = ( pageNumber: number,  pageSize: number ): Promise<User[]> =>
  new Promise((resolve, reject) => {
    connection.all<User>(
      selectUsersTemplate,
      [pageNumber * pageSize, pageSize],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results);
      }
    );
  });

export const addUserAdder = ( userId: string, key: string, value: string ): Promise<void> =>
  new Promise((resolve, reject) => {
    const query = `
      INSERT INTO user_adders (user_id, key, value)
      VALUES (?, ?, ?)
    `;
    connection.run(query, [userId, key, value], (error) => {
      if (error) reject(error);
      else resolve();
    });
  });


export const getUserAdders = (userId: string): Promise<UserAdder[]> =>
  new Promise((resolve, reject) => {
    const query = `
      SELECT * FROM user_adders
      WHERE user_id = ?
    `;
    connection.all<UserAdder>(query, [userId], (error, results) => {
      if (error) reject(error);
      else resolve(results);
    });
  });