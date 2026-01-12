const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const methodOverride = require("method-override");


const Chat = require("./models/chat.js");

app.set("views" , path.join(__dirname , "views"));
app.set("view engine" , "ejs");
app.use(express.static(path.join(__dirname , "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));


async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

main()
.then(() => {
    console.log("connection successful");
})
.catch(err => console.log(err));



app.get("/" , (req , res) => {
    res.send("root");
})


// see all chats
app.get("/chats" , async (req , res) => {
    let chats = await Chat.find();
    res.render("index.ejs" , {chats});
})


// load "new chat" form
app.get("/chats/new" , (req , res) => {
    res.render("new.ejs");
})


// after submission of form
app.post("/chats" , async (req , res) => {
    let {from , to , msg} = req.body;
    let created_at = new Date();
    const newChat = new Chat({from , to , msg , created_at});
    await newChat.save();
    res.redirect("/chats");
})


// edit form
app.get("/chats/:id/edit" , async (req , res) => {
    let {id} = req.params;
    let thisChat = await Chat.findById(id);
    res.render("edit.ejs" , {chat: thisChat});
})


// after clicking submit in the edit form
app.patch("/chats/:id" , async(req , res) => {
    let {id} = req.params;
    let {newMsg} = req.body;
    await Chat.findByIdAndUpdate(id , {msg: newMsg} , {runValidators: true});
    res.redirect("/chats");
})


// destroy route
app.delete("/chats/:id" , async(req , res) => {
    let {id} = req.params;
    await Chat.findByIdAndDelete({_id : id});
    res.redirect("/chats");
})



app.listen(3000 , () => {
    console.log("listening to port 3000");
})