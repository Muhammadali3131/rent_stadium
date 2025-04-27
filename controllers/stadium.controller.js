const db = require("../config/db");
// params, body, query
const createStadium = (req, res) => {
  const { name, address, location, description, price, owner_id } = req.body;
  db.query(
    `
       INSERT INTO stadium (name, address, location, description, price, owner_id)
       VALUES(?, ?, ?, ?, ?, ?)
      `,
    [name, address, location, description, price, owner_id],
    (error, result) => {
      if (error) {
        console.log(`Error adding new stadium`, error);
        return res.status(500).send({ message: "Serverda xatolik!" });
      }
      console.log(result);
      res
        .status(201)
        .send({ message: "Yangi stadion qo'shildi", data: result.insertId });
    }
  );
};

const getAllStadiums = (req, res) => {
  db.query(`SELECT * FROM stadium`, (error, result) => {
    if (error) {
      console.log(`Error - get all stadiums`, error);
      return res.status(500).send({ message: "Serverda xatolik!" });
    }
    res.send(result);
  });
};

const getStadiumById = (req, res) => {
  const id = req.params.id;
  db.query(`SELECT * FROM stadium WHERE id = ${id}`, (error, result) => {
    if (error) {
      console.log(`Error - get stadium by id`, error);
      return res.status(500).send({ message: "Serverda xatolik!" });
    }
    res.send(result[0]);
  });
};

const updateStadiumById = (req, res) => {
  const { name, address, location, description, price, owner_id } = req.body;

  const { id } = req.params;

  db.query(
    `UPDATE stadium set name=?, address=?, location=?, description=?,
            price=?, owner_id=? WHERE id=?`,
    [name, address, location, description, price, owner_id, id],
    (error, results) => {
      if (error) {
        console.log("Error updating stadium", error);
        return res.status(500).send({ error: "Internal Server Error" });
      }

      res.status(200).send(results);
    }
  );
};

const deleteStadiumById = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM stadium WHERE id=?", [id], (error, results) => {
    if (error) {
      console.log("Error deleting stadium", error);
      return res.status(500).send({ error: "Internal Server Error" });
    }

    res.status(200).send(results);
  });
};

module.exports = {
  createStadium,
  getAllStadiums,
  getStadiumById,
  updateStadiumById,
  deleteStadiumById,
};
