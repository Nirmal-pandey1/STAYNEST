const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL ="mongodb+srv://Nirmal:ikQJUUEbsIaJgPd5@cluster0.g0maax9.mongodb.net/?appName=Cluster0";

main()
.then(() => {
    console.log("connected to DB");
})
.catch((err) => {
    console.log(err);
});

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
    ...obj, 
    owner: "6a3babb0f6efed55d78dba06"
    }));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}

initDB();