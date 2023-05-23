import express from "express";
import db from "../databases/db.js";

const router = express.Router();

export default router;

router.get("/", async (req, res) => {
  try {
    const [students] = await db.query("SELECT * FROM students");

    res.json({ data: students });
  } catch (err) {
    console.error("Error: ", err);
  }
});

router.post("/", async (req, res) => {
  const { studentName, className, rollNumber, section } = req.body;

  try {
    const [existingStudent] = await db.query(
      "SELECT * FROM students WHERE rollNumber = ?",
      [rollNumber]
    );
    if (existingStudent.length) {
      return res
        .status(409)
        .json({ message: "Student with this rollNumber already exists" });
    }

    await db.query(
      "INSERT INTO students (studentName,className,rollNumber,section) VALUES (?,?,?,?)",
      [studentName, className, rollNumber, section]
    );

    res.json({ message: "Student record created" });
  } catch (err) {
    console.error("Error: ", err);
  }
});

router.patch("/", async (req, res) => {
  const { id, studentName, className, rollNumber, section } = req.body;

  try {
    const [existingStudent] = await db.query(
      "SELECT * FROM students WHERE rollNumber = ?",
      [rollNumber]
    );

    if (existingStudent.length) {
      return res.status(409).json({
        message: "Cannot set rollNumber this rollNumber alradey in assigned",
      });
    }

    await db.query(
      "UPDATE students SET studentName = ? ,className = ? ,rollNumber = ?, section = ? WHERE id = ?",
      [studentName, className, rollNumber, section, id]
    );

    res.status(200).json({ message: "Update Successfull" });
  } catch (err) {
    console.log("Error:", err);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [existingStudent] = await db.query(
      "SELECT * FROM students WHERE id = ?",
      [+id]
    );

    if (existingStudent.length === 0) {
      return res
        .status(409)
        .json({ message: "Student id which you are trying to does not exist" });
    }

    await db.query("DELETE FROM students WHERE id = ?", [id]);

    res.status(200).json({ message: "Delete successfull" });
  } catch (err) {
    console.log("Error:", err);
  }
});
