const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const multer = require("multer");
const csv = require("csvtojson");

// * Multer storage declaration for csvfile
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/", (req, res) => {
  let queryText = `
    SELECT * FROM "show_reports";
    `;
  pool
    .query(queryText)
    .then((response) => {
      res.send(response.rows);
    })
    .catch((err) => {
      console.log("Error in GET route", err);
      res.sendStatus(500);
    });
});

router.put("/update/:id", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }
  const showId = req.params.id;
  //   console.log(req.file.buffer.toString())

  try {
    const jsonArray = await csv().fromString(req.file.buffer.toString());
    if (jsonArray.length === 0) {
      return res.status(400).send("CSV file is empty or invalid");
    }

    const queryText = `
    UPDATE "show_reports" SET
    "total_tickets_sold"=$1, "total_presale_sold"=$2,
    "total_beer_sold"=$3, "total_liquor_sold"=$4, "total_other_sold"=$5
    WHERE "id"=$6;
    `;

    await pool.query(queryText, [
      jsonArray[0].total_tickets_sold,
      jsonArray[0].total_presale_sold,
      jsonArray[0].total_beer_sold,
      jsonArray[0].total_liquor_sold,
      jsonArray[0].total_other_sold,
      showId,
    ]);
  } catch (err) {
    console.log("Error in put", err);
    res.sendStatus(500);
  }
});

module.exports = router;
