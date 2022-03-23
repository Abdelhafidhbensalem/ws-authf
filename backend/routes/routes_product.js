const express = require("express");
const Product = require("../models/Mproduct");
const router = express.Router();
const upload = require("../utils/multer")
//test
router.get("/test", (req, res) => {
  res.send("hello router");
});
//addNewProduct
router.post("/addProduct", upload("products").single("file"), async (req, res) => {
  const url = `${req.protocol}://${req.get('host')}`;
  console.log(req.file);
  const { file } = req;
  try {
    const newProduct = new Product(req.body);
    newProduct.image = `${url}/${file.path}`;
    await newProduct.save();
    res.send({ product: newProduct, message: "product succesffuly" });
  } catch (err) {
    res.status(400).send(err.message);
  }
});
//getAllProducts
router.get("/", async (req, res) => {
  try {
    const allProducts = await Product.find({});
    res.send({ allProducts });
  } catch (err) {
    res.status(400).send(err.message);
  }
});
//get product by Id
router.get("/:id", async (req, res) => {
  try {
    const oneProduct = await Product.findById(req.params.id);
    res.send({ oneProduct });
    //console.log(req.params.id);
  } catch (err) {
    res.status(400).send(err.message);
  }
});
//update product
router.put("/:id", async (req, res) => {
  try {
    let updateProduct = await Product.updateOne(
      { _id: req.params.id },
      { $set: { ...req.body } }
    );
    //let updateProduct2=await Product.findOne({_id:req.params.id})
    //updateProduct2.name=req.body.name
    //console.log(updateProduct2);
    //console.log(updateProduct2 instanceof Product)
    // await updateProduct2.save()
    if (updateProduct.modifiedCount == 1) {
      return res.send({ msg: "product secessufly update" });
    }
    res.status(400).send({ msg: " no thing to update" });
  } catch (err) {
    res.status(400).send(err.message);
  }
});
// Delete Product
router.delete("/:id", async (req, res) => {
  try {
    const deleteProduct = await Product.deleteOne({ _id: req.params.id });
    console.log(deleteProduct);
    if (deleteProduct.deletedCount == 1) {
      return res.send({ msg: "product secessufly deleted" });
    }
    res.status(400).send({ msg: "product already deleted" })
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
