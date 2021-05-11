const express = require('express');
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
const port = 5000;

const AddressModel = require("./models/Address")

app.use(express.json());
app.use(cors());
// Y1x6666y7mjKLNAX

mongoose.connect("mongodb+srv://AbuSalehFaysal:Y1x6666y7mjKLNAX@cluster-crud-mern.x2kp6.mongodb.net/crudMern", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.post("/insert", async (req, res) => {
    const userName = req.body.userName;
    const userContact = req.body.userContact;
    const address = new AddressModel({userName: userName, userContact: userContact});
    try {
        await address.save();
        console.log("DATA INSERTED");
    } catch (error) {
        console.log(error);
    }
})

app.get("/address", async (req, res) => {
    AddressModel.find({}, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    })
})

app.put("/update", async (req, res) => {
    const newUserName = req.body.newUserName;
    const id = req.body.id;
    // console.log(newUserName);
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



app.listen(port, () => {
    console.log("SERVER HAS STARTED!!!");
})