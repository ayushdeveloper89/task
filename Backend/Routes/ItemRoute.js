const router = require("express").Router();
const Item = require("../model/item");
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');
const fs = require('fs');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        req.body.uniqueFileId = uuidv4() + '-' + Date.now();
        console.log("gsdgkfgdkhk")
        cb(null, '../Frontend/public/images/');
    },
    filename: function (req, file, cb) {
        cb(null, req.body.uniqueFileId + path.extname(file.originalname));
        // cb(null, './uploads');
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter });

router.post("/createItem", upload.array('imageFile'), async (req, res) => {
    let itemConst = JSON.parse(req.body.itemConst);
    console.log(req.files)
    await req.files.map((file, index) => {
        // gallery.push(file.filename)
        itemConst[index].imageFileName = file.filename
    });
    itemConst.map(async(val) => {

        const newItem = new Item({
            image: val.imageFileName,
            title: val.title,
            description: val.description,
            quantity: val.quantity,
            price: val.price,
            date: val.date,
        });
        const savedItem =  await newItem.save();
    })
    res.status(200).json(itemConst);
});

router.get('/getAllItems', async(req, res) => {
    const fetchItems = await Item.find()
    res.status(200).json(fetchItems);
})

module.exports = { ItemRoute: router };  