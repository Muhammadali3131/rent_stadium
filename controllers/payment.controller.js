const db = require("../config/db");
// params, body, query
const createPayment = (req, res) => {
  const { booking_id, amount, payment_time, payment_method } = req.body;
  db.query(
    `
       INSERT INTO payment (booking_id, amount, payment_time, payment_method)
       VALUES(?, ?, ?, ?)
      `,
    [booking_id, amount, payment_time, payment_method],
    (error, result) => {
      if (error) {
        console.log(`Error adding new payment`, error);
        return res.status(500).send({ message: "Serverda xatolik!" });
      }
      console.log(result);
      res
        .status(201)
        .send({ message: "Yangi payment qo'shildi", data: result.insertId });
    }
  );
};

const getAllPayments = (req, res) => {
  db.query(`SELECT * FROM payment`, (error, result) => {
    if (error) {
      console.log(`Error - get all payments`, error);
      return res.status(500).send({ message: "Serverda xatolik!" });
    }
    res.send(result);
  });
};

const getPaymentById = (req, res) => {
  const id = req.params.id;
  db.query(`SELECT * FROM payment WHERE id = ${id}`, (error, result) => {
    if (error) {
      console.log(`Error - get payment by id`, error);
      return res.status(500).send({ message: "Serverda xatolik!" });
    }
    res.send(result[0]);
  });
};

const updatePaymentById = (req, res) => {
  const { booking_id, amount, payment_time, payment_method } = req.body;

  const { id } = req.params;

  db.query(
    `UPDATE payment set booking_id=?, amount=?, payment_time=?, payment_method=? WHERE id=?`,
    [booking_id, amount, payment_time, payment_method, id],
    (error, results) => {
      if (error) {
        console.log("Error updating payment", error);
        return res.status(500).send({ error: "Internal Server Error" });
      }

      res.status(200).send(results);
    }
  );
};

const deletePaymentById = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM payment WHERE id=?", [id], (error, results) => {
    if (error) {
      console.log("Error deleting payment", error);
      return res.status(500).send({ error: "Internal Server Error" });
    }

    res.status(200).send(results);
  });
};

module.exports = {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePaymentById,
  deletePaymentById,
};
