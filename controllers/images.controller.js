const db = require("../config/db");
// params, body, query
const createImage = (req, res) => {
  const { stadion_id, image_url } = req.body;
  db.query(
    `
       INSERT INTO images (stadion_id, image_url)
       VALUES(?, ?)
      `,
    [stadion_id, image_url],
    (error, result) => {
      if (error) {
        console.log(`Error adding new image`, error);
        return res.status(500).send({ message: "Serverda xatolik!" });
      }
      console.log(result);
      res
        .status(201)
        .send({ message: "Yangi image qo'shildi", data: result.insertId });
    }
  );
};

const getAllImages = (req, res) => {
  db.query(`SELECT * FROM images`, (error, result) => {
    if (error) {
      console.log(`Error - get all images`, error);
      return res.status(500).send({ message: "Serverda xatolik!" });
    }
    res.send(result);
  });
};

const getImageById = (req, res) => {
  const id = req.params.id;
  db.query(`SELECT * FROM images WHERE id = ${id}`, (error, result) => {
    if (error) {
      console.log(`Error - get image by id`, error);
      return res.status(500).send({ message: "Serverda xatolik!" });
    }
    res.send(result[0]);
  });
};

const updateImageById = (req, res) => {
  const { stadion_id, image_url } = req.body;

  const { id } = req.params;

  db.query(
    `UPDATE images set stadion_id=?, image_url=? WHERE id=?`,
    [stadion_id, image_url, id],
    (error, results) => {
      if (error) {
        console.log("Error updating image", error);
        return res.status(500).send({ error: "Internal Server Error" });
      }

      res.status(200).send(results);
    }
  );
};

const deleteImageById = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM images WHERE id=?", [id], (error, results) => {
    if (error) {
      console.log("Error deleting image", error);
      return res.status(500).send({ error: "Internal Server Error" });
    }

    res.status(200).send(results);
  });
};

module.exports = {
  createImage,
  getAllImages,
  getImageById,
  updateImageById,
  deleteImageById,
};
