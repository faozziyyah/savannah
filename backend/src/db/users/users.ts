import { connection } from "../connection";
import { selectCountOfUsersTemplate, selectUsersTemplate, } from "./query-templates";
import { User, UserAdder, Address } from "./types";

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

export const getUsersWithAddresses = (
  pageNumber: number,
  pageSize: number
): Promise<(User & { addresses: Address[] })[]> =>
  new Promise((resolve, reject) => {
    const query = `
      SELECT 
        u.id as userId, u.name, u.username, u.email, u.phone,
        a.id as addressId, a.street, a.state, a.city, a.zipcode
      FROM users u
      LEFT JOIN addresses a ON u.id = a.user_id
      LIMIT ?, ?
    `;

    connection.all(query, [pageNumber * pageSize, pageSize], (error, results) => {
      if (error) {
        reject(error);
      } else {
        // group rows by userId
        const usersMap: Record<string, User & { addresses: Address[] }> = {};

        results.forEach((row: any) => {
          if (!usersMap[row.userId]) {
            usersMap[row.userId] = {
              id: row.userId,
              name: row.name,
              username: row.username,
              email: row.email,
              phone: row.phone,
              addresses: []
            };
          }

          if (row.addressId) {
            usersMap[row.userId].addresses.push({
              id: row.addressId,
              user_id: row.userId,
              street: row.street,
              state: row.state,
              city: row.city,
              zipcode: row.zipcode,
            });
          }
        });

        resolve(Object.values(usersMap));
      }
    });
  });
