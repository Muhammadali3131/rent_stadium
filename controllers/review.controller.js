const db = require("../config/db");
// params, body, query
const createReview = (req, res) => {
  const { stadion_id, user_id, rating, comment } = req.body;
  db.query(
    `
       INSERT INTO review (stadion_id, user_id, rating, comment)
       VALUES(?, ?, ?, ?)
      `,
    [stadion_id, user_id, rating, comment],
    (error, result) => {
      if (error) {
        console.log(`Error adding new review`, error);
        return res.status(500).send({ message: "Serverda xatolik!" });
      }
      console.log(result);
      res
        .status(201)
        .send({ message: "Yangi review qo'shildi", data: result.insertId });
    }
  );
};

const getAllReviews = (req, res) => {
  db.query(`SELECT * FROM review`, (error, result) => {
    if (error) {
      console.log(`Error - get all reviews`, error);
      return res.status(500).send({ message: "Serverda xatolik!" });
    }
    res.send(result);
  });
};

const getReviewById = (req, res) => {
  const id = req.params.id;
  db.query(`SELECT * FROM review WHERE id = ${id}`, (error, result) => {
    if (error) {
      console.log(`Error - get review by id`, error);
      return res.status(500).send({ message: "Serverda xatolik!" });
    }
    res.send(result[0]);
  });
};

const updateReviewById = (req, res) => {
  const { stadion_id, user_id, rating, comment } = req.body;

  const { id } = req.params;

  db.query(
    `UPDATE review set stadion_id=?, user_id=?, rating=?, comment=? WHERE id=?`,
    [stadion_id, user_id, rating, comment, id],
    (error, results) => {
      if (error) {
        console.log("Error updating review", error);
        return res.status(500).send({ error: "Internal Server Error" });
      }

      res.status(200).send(results);
    }
  );
};

const deleteReviewById = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM review WHERE id=?", [id], (error, results) => {
    if (error) {
      console.log("Error deleting review", error);
      return res.status(500).send({ error: "Internal Server Error" });
    }

    res.status(200).send(results);
  });
};

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReviewById,
  deleteReviewById,
};
