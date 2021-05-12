// =================================================================
// REQUIRED PACKAGES
// =================================================================
const express = require('express');
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
const port = 5000;
require('dotenv').config();
const AddressModel = require("./models/Address")

// =================================================================
// APP USE
// =================================================================
app.use(express.json());
app.use(cors());

// =================================================================
// DATABASE CONNECTION
// =================================================================
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster-crud-mern.x2kp6.mongodb.net/${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

// =================================================================
// POST DATA ROUTE
// =================================================================
app.post("/insert", async (req, res) => {
    const userName = req.body.userName;
    const userContact = req.body.userContact;
    const address = new AddressModel({userName: userName, userContact: userContact});
    try {
        await address.save();
        console.log("DATA INSERTED");
    } catch (error) {
        console.log(error);
        alert(error);
    }
})

// =================================================================
// GET ALL DATA ROUTE
// =================================================================
app.get("/address", async (req, res) => {
    AddressModel.find({}, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    })
    .sort({ userName: 1 });
})

// =================================================================
// UPDATE NAME DATA ROUTE
// =================================================================
app.put("/update", async (req, res) => {
    const newUserName = req.body.newUserName;
    const id = req.body.id;
    try {
        await AddressModel.findById(id, (error, updatedUserName)=> {
            updatedUserName.userName = newUserName;
            updatedUserName.save();
            res.send("update");
        });
    } catch (error) {
        console.log(error);
    }
})

// =================================================================
// UPDATE CONTACT DATA ROUTE
// =================================================================
app.put("/updatecontact", async (req, res) => {
    const newUserContact = req.body.newUserContact;
    const id = req.body.id;
    try {
        await AddressModel.findById(id, (error, updatedUserContact)=> {
            updatedUserContact.userContact = newUserContact;
            updatedUserContact.save();
            res.send("update-contact");
        });
    } catch (error) {
        console.log(error);
    }
})

// =================================================================
// DELETE DATA ROUTE
// =================================================================
app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    // res.send(id);
    await AddressModel.findByIdAndRemove(id).exec();
    res.send("deleted");
})

// =================================================================
// APP LISTEN 
// =================================================================
app.listen(process.env.PORT || port, () => {
    console.log("SERVER HAS STARTED!!!");
})