import foodModel from "../models/foodmodel.js";
import fs from 'fs';
const addFood = async (req, res) => {
    try {

        await foodModel.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: `${req.file.filename}`
        });

        console.log("Data saved successfully");
        res.json({ success: true, message: "Food Added" });

    } catch (err) {
        console.error("Error inserting data into database:", err);
        res.status(500).json({ success: false, message: "Error adding food" });
    }
};


//all food list

const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods })
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: "Error" });
    }
}

//remove food

const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => { })

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "food remove" })
    } catch (err) {
        console.log("err in removeing food", err)
        res.json({ success: false, message: "error" })
    }
}
export { addFood, listFood, removeFood };
