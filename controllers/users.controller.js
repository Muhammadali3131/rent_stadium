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

const getUserByRole = (req, res) => {
  const { role } = req.body;
  db.query(`SELECT * FROM users WHERE role = ?`, [role], (error, results) => {
    if (error) {
      console.log(`Error - get all users`, error);
      return res.status(500).send({ message: "Serverda xatolik!" });
    }
    res.send(results);
  });
};

// const getUsersByAnyParams = (req, res) => {
//   const { name, color, start_price, finish_price } = req.body;
//   let where = "true";
//   if (name) {
//     where += ` and name like '%${name}'`;
//   }
//   if (color) {
//     where += ` and color like '%${color}'`;
//   }
//   if (start_price && finish_price) {
//     where += ` and price BETWEEN ${start_price} and ${finish_price}`;
//   } else if (start_price) {
//     where += ` and price > ${start_price} `;
//   } else if (finish_price) {
//     where += ` and price < ${finish_price}`;
//   }
//   console.log(where);

//   if (where != "true") {
//     db.query(`SELECT * FROM flowers WHERE ${where}`, (error, results) => {
//       if (error) {
//         console.log("Error selecting flower by Name", error);
//         return res.status(500).json({
//           error: "Internal Server Error",
//         });
//       }
//       if (results.length == 0) {
//         return res.status(404).json({ message: "Flower not found" });
//       }
//       res.json(results);
//     });
//   } else {
//     return res.status(400).json({ message: "Qidirish parametrini kiriting" });
//   }
// };

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
  const { id } = req.params;
  db.query("DELETE FROM users WHERE id=?", [id], (error, results) => {
    if (error) {
      console.log("Error deleting user", error);
      return res.status(500).send({ error: "Internal Server Error" });
    }

    res.status(200).send(results);
  });
};

const getUserByOwner = (req, res) => {
  const { first_name, last_name } = req.body;
  db.query(
    `SELECT u.first_name, u.phone, s.name, i.image_url FROM users u
    LEFT JOIN stadium s ON u.id = s.owner_id
    LEFT JOIN images i ON s.id = i.stadion_id
    WHERE first_name = ? AND last_name = ?`,
    [first_name, last_name],
    (error, results) => {
      if (error) {
        console.log(`Error - get all users`, error);
        return res.status(500).send({ message: "Serverda xatolik!" });
      }
      res.send(results);
    }
  );
};

const callProcedureUsers = (req, res) => {
  db.query("call getAllUsers()", (error, results) => {
    if (error) {
      console.log(`Error - get all users`, error);
      return res.status(500).send({ message: "Serverda xatolik!" });
    }
    res.send(results[0]);
  });
};

const getFieldOwner = (req, res) => {
  const { id } = req.params;

  db.query(
    `
    SELECT
      f.name AS field_name,
      CONCAT(u.first_name, ' ', u.last_name) AS owner_name
    FROM
      fields f
    LEFT JOIN
      users u ON u.id = f.owner_id
    WHERE
      f.id = ?
    `,
    [id],
    (error, result) => {
      if (error) {
        console.error("Error fetching field and owner:", error);
        return res
          .status(500)
          .send({ message: "Server error while fetching field and owner" });
      }
      if (result.length === 0) {
        return res.status(404).send({ message: "Field not found" });
      }

      res.status(200).send({ data: result[0] });
    }
  );
};

const getfielsdwithBookingTime = (req, res) => {
  const { minPrice, maxPrice } = req.body;

  db.query(
    `
    SELECT
        f.name AS field_name,
        f.price_per_hour,
        b.booking_date,
        b.start_time,
        b.end_time,
        TIMESTAMPDIFF(HOUR, b.start_time, b.end_time) AS booking_duration
    FROM
        fields f
    JOIN
        booking b ON b.stadion_id = f.id
    WHERE
        f.price_per_hour BETWEEN ? AND ?
        AND TIMESTAMPDIFF(HOUR, b.start_time, b.end_time) > 2
    ORDER BY
        b.booking_date;
    `,
    [minPrice, maxPrice],
    (error, result) => {
      if (error) {
        console.error("Error fetching fields and bookings:", error);
        return res
          .status(500)
          .send({ message: "Server error fetching fields and bookings" });
      }
      res.status(200).send({ data: result });
    }
  );
};


module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  getUserByRole,
  // getUserBySearch,
  getUserByOwner,
  callProcedureUsers,
  getFieldOwner,
  getfielsdwithBookingTime,
};
