const express = require("express");
const mongoose = require("mongoose");
const Student = require("./model/studentModel");
const app = express();
app.use(express.json());
// Connectiong ot mongodb
mongoose
  .connect(
    "mongodb+srv://meevarunkumar:18dec1999@cluster0.filkrb3.mongodb.net/test",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log(" CONNECTED TO MONGODB");
  })
  .catch((err) => {
    console.log(err);
  });

const port = 3000;

// "/" is end point here and it is root directory
app.get("/", async (req, res) => {
  // Local host url:- http://localhost:3000
  res.send("It fun studying Node");
});
app.get("/get-student-data", async (req, res) => {
  //Local host url:- http://localhost:3000/get-student-data
try{
    const data = await Student.find();
    res.status(201).json({
      status: "ok",
      data: data,
    });
}catch(err){
    console.log(err);
}

});
app.post("/create-student", async (req, res) => {
  //Local host url:- http://localhost:3000/create-student
  const { name, age, contact } = req.body;
  const data = await Student.create({ name, age, contact });
  res.status(201).json({
    status: "ok",
    data: data,
  });
});
app.patch("/update-student/:id", async (req, res) => {
  //Local host url:- http://localhost:3000/update-student
  const id = req.params.id;
  const body = req.body;
  const result = await Student.findOneAndUpdate({ _id: id }, body, {
    new: true,
  });
  res.status(200).json({
    status: "ok",
    data: result,
  });
});
app.delete("/delete-student/:id", async (req, res) => {
  //Local host url:- http://localhost:3000/delete-student
  const id= req.params.id;

  const result = await Student.deleteOne({_id: id});
  res.status(200).json({
    status: "ok",
    message: "Student has been deleted",
  });
});

// App Listening on port 3000
app.listen(port, () => {
  console.log(`server started at  local host ${port}`);
});
