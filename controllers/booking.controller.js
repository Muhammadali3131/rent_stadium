const db = require("../config/db");
// params, body, query
const createBooking = (req, res) => {
  const {
    stadion_id,
    user_id,
    booking_date,
    start_time,
    end_time,
    total_price,
    status,
  } = req.body;
  db.query(
    `
       INSERT INTO booking (stadion_id, user_id, booking_date, start_time, end_time, total_price, status)
       VALUES(?, ?, ?, ?, ?, ?, ?)
      `,
    [
      stadion_id,
      user_id,
      booking_date,
      start_time,
      end_time,
      total_price,
      status,
    ],
    (error, result) => {
      if (error) {
        console.log(`Error adding new booking`, error);
        return res.status(500).send({ message: "Serverda xatolik!" });
      }
      console.log(result);
      res
        .status(201)
        .send({ message: "Yangi booking qo'shildi", data: result.insertId });
    }
  );
};

const getAllBookings = (req, res) => {
  db.query(`SELECT * FROM booking`, (error, result) => {
    if (error) {
      console.log(`Error - get all bookings`, error);
      return res.status(500).send({ message: "Serverda xatolik!" });
    }
    res.send(result);
  });
};

const getBookingById = (req, res) => {
  const id = req.params.id;
  db.query(`SELECT * FROM booking WHERE id = ${id}`, (error, result) => {
    if (error) {
      console.log(`Error - get booking by id`, error);
      return res.status(500).send({ message: "Serverda xatolik!" });
    }
    res.send(result[0]);
  });
};

const updateBookingById = (req, res) => {
  const {
    stadion_id,
    user_id,
    booking_date,
    start_time,
    end_time,
    total_price,
    status,
  } = req.body;

  const { id } = req.params;

  db.query(
    `UPDATE booking set stadion_id=?, user_id=?, booking_date=?, start_time=?,
            end_time=?, total_price=?, status=? WHERE id=?`,
    [
      stadion_id,
      user_id,
      booking_date,
      start_time,
      end_time,
      total_price,
      status,
      id,
    ],
    (error, results) => {
      if (error) {
        console.log("Error updating booking", error);
        return res.status(500).send({ error: "Internal Server Error" });
      }

      res.status(200).send(results);
    }
  );
};

const deleteBookingById = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM booking WHERE id=?", [id], (error, results) => {
    if (error) {
      console.log("Error deleting booking", error);
      return res.status(500).send({ error: "Internal Server Error" });
    }

    res.status(200).send(results);
  });
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBookingById,
  deleteBookingById,
};
