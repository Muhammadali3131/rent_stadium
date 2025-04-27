const db = require("../config/db");
// params, body, query
const createUser = (req, res) => {
  const { first_name, last_name, email, password, phone, role } = req.body;
  db.query(
    `
       INSERT INTO users (first_name, last_name, email, password, phone, role)
       VALUES(?, ?, ?, ?, ?, ?)
      `,
    [first_name, last_name, email, password, phone, role],
    (error, result) => {
      if (error) {
        console.log(`Error adding new user`, error);
        return res.status(500).send({ message: "Serverda xatolik!" });
      }
      console.log(result);
      res
        .status(201)
        .send({ message: "Yangi user qo'shildi", userId: result.insertId });
    }
  );
};

const getAllUsers = (req, res) => {
  db.query(`SELECT * FROM users`, (error, result) => {
    if (error) {
      console.log(`Error - get all users`, error);
      return res.status(500).send({ message: "Serverda xatolik!" });
    }
    res.send(result);
  });
};

const getUserById = (req, res) => {
  const id = req.params.id;
  db.query(`SELECT * FROM users WHERE id = ${id}`, (error, result) => {
    if (error) {
      console.log(`Error - get all users`, error);
      return res.status(500).send({ message: "Serverda xatolik!" });
    }
    res.send(result[0]);
  });
};

const updateUserById = (req, res) => {
  const { role, first_name, last_name, email, password, phone } = req.body;

  const { id } = req.params;

  db.query(
    `UPDATE users set role=?, first_name=?, last_name=?, email=?,
            password=?, phone=? WHERE id=?`,
    [role, first_name, last_name, email, password, phone, id],
    (error, results) => {
      if (error) {
        console.log("Error updating user", error);
        return res.status(500).send({ error: "Internal Server Error" });
      }

      res.status(200).send(results);
    }
  );
};

const deleteUserById = (req, res) => {
  const {id} = req.params;
  db.query("DELETE FROM users WHERE id=?", [id], (error, results) => {
    if (error) {
      console.log("Error deleting user", error);
      return res.status(500).send({ error: "Internal Server Error" });
    }

    res.status(200).send(results);
  });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById
};
