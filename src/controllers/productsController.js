const { Product } = require("../models/index");

exports.getAll = async (req, res, next) => {
  try {
    const allProducts = await Product.find();

    res.json(allProducts);
  } catch (error) {
    next(error);
  }
};

exports.search = async (req, res, next) => {
  try {
    const { title } = req.query;
    const allProducts = await Product.find({
      title: {
        $regex: title,
        $options: "i",
      }
    }, null, {});

    res.json(allProducts);
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);

    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      res.status(404).send("Product did not found!");
      return;
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!product) {
      res.status(404).send("Product did not found!");
      return;
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      res.status(404).send("Product did not found!");
      return;
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
};
