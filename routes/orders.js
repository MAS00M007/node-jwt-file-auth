const express = require("express");

const router = express.Router();

const orders = [
{
    id: 1,
    Mobile: "Samsung",
    Price: 10000,
    Color: "Black",
    Storage: "128 GB",
    RAM: "4 GB",
    Camera: "16 MP",
    Battery: "5000 mAh",
},
{
    id: 2,
    Mobile: "Apple",
    Price: 12000,
    Color: "Silver",
    Storage: "256 GB",
    RAM: "8 GB",
    Camera: "12 MP",
    Battery: "6000 mAh",
},
{
    id: 3,
    Mobile: "OnePlus",
    Price: 15000,
    Color: "Blue",
    Storage: "512 GB",
    RAM: "12 GB",
    Camera: "32 MP",
    Battery: "7000 mAh",
},
{
    id: 4,
    Mobile: "Vivo",
    Price: 13000,
    Color: "Red",
    Storage: "64 GB",
    RAM: "6 GB",
    Camera: "24 MP",
    Battery: "5500 mAh",
}
]

router.get("/allorders", (req, res) => {
    res.send(orders[orders.length-1]).status(200);
});

module.exports=router;