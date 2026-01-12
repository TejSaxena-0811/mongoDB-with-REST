// this is a temporary file that is used to add sample data to the mongodb database for this project.
// ran this file only once.

const mongoose = require('mongoose');
const Chat = require("./models/chat.js");


async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

main()
.then(() => {
    console.log("connection successful");
})
.catch(err => console.log(err));



let allChats = [
    {
    from: "neha",
    to: "priya",
    msg: "send notes pls",
    created_at: new Date()
    },
    {
        from: "rohit",
        to: "mohit",
        msg: "whad d whaa",
        created_at: new Date()
    },
    {
        from: "amit",
        to: "sumit",
        msg: "all the best",
        created_at: new Date()
    },
    {
        from: "anita",
        to: "ramesh",
        msg: "six seven",
        created_at: new Date()
    },
    {
        from: "tony",
        to: "peter",
        msg: "i am iorn man",
        created_at: new Date()
    }
];

Chat.insertMany(allChats);