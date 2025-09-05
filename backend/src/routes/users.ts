import { Router, Request, Response } from "express";
import { getUsers, getUsersCount, addUserAdder, getUserAdders, getUsersWithAddresses } from "../db/users/users";

const router = Router();

/*router.get("/", async (req: Request, res: Response) => {

  const pageNumber = Number(req.query.pageNumber) || 0;
  const pageSize = Number(req.query.pageSize) || 4;

  if (pageNumber < 0 || pageSize < 1) {
    res.status(400).send({ message: "Invalid page number or page size" });
    return;
  }

  const users = await getUsersWithAddresses(pageNumber, pageSize);
  res.send(users);
  
});*/

router.get("/", async (req: Request, res: Response): Promise<void> => {
  const pageNumber = Number(req.query.pageNumber) || 0;
  const pageSize = Number(req.query.pageSize) || 4;

  if (pageNumber < 0 || pageSize < 1) {
    res.status(400).send({ message: "Invalid page number or page size" });
    return;
  }

  try {
    const users = await getUsersWithAddresses(pageNumber, pageSize);
    const totalUsers = await getUsersCount();
    const totalPages = Math.ceil(totalUsers / pageSize);

    res.send({
      users,
      pagination: {
        pageNumber,
        pageSize,
        totalUsers,
        totalPages,
        hasNextPage: pageNumber + 1 < totalPages,
        hasPreviousPage: pageNumber > 0,
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send({ error: "Failed to fetch users" });
  }
});


router.get("/count", async (req: Request, res: Response) => {
  const count = await getUsersCount();
  res.send({ count });
});

router.get("/:id/adders", async (req: Request, res: Response) => {

  const { id } = req.params;

  try {
    const adders = await getUserAdders(id);
    res.send(adders);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch adders" });
  }

});

router.post("/:id/adders", async (req: Request, res: Response) => {

    const { id } = req.params;
    const { key, value } = req.body;

    if (!key || !value) {
      res.status(400).send({ error: "Key and value are required" });
      return;
    }

    try {
      await addUserAdder(id, key, value);
      res.status(201).send({ message: "Adder created successfully" });
    } catch (error: any) {
      console.error("DB Error:", error.message);
      res.status(500).send({ error: "Failed to create adder" });
    }

});

export default router;
