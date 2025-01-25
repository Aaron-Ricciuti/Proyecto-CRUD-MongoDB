import Product from '../models/productModel.js'

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate({
            path: "category",
            select: "name"
        })
        if(products.length === 0){
            return res.status(400).json({ message: "There are no products"})
        }
        return res.status(200).json(products)
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error})
    }
}

export const createProduct = async (req, res) => {
    try {
        const productData = req.body
        const { name } = productData
        const productExist = await Product.findOne({ name })
        if(productExist){
            return res.status(400).json({message:` Product ${name} already exists` })
        }
        const newProduct = new Product(productData)
        const savedProduct = await newProduct.save()

        return res.status(200).json(savedProduct)
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error})
    }
};

export const findProductByName = async (req, res) => {
    try {
      const { name } = req.body; 
      if (!name || name.trim() === "") {
        return res.status(400).json({ message: "Name is required" });
      }
      const parsedName = name.trim().toLowerCase();
      const productExist = await Product.find({
        name: { $regex: parsedName, $options: "i" }
      });
      if (productExist.length === 0) {
        return res.status(400).json({ message: `Product ${name} doesn't exist` });
      }
      res.status(200).json({ productExist });
    } catch (error) {
        console.log(error);
      res.status(500).json({ message: "Internal server error", error });
    }
  };
  

export const findProductById = async (req, res) => {
    try {
     const _id = req.params.id;
     const productExist = await Product.findOne({ _id });
     if(!productExist){
        return res.status(400).json({ message: `Product ${_id} doesn't exist` })
     }
     res.status(200).json({ productExist });
    } catch (error) {
     res.status(500).json({ message: "Internal server error", error});
    }
};

export const updateProduct = async (req, res) => {
    try {
      console.log("Cuerpo de la solicitud:", req.body); 

      const _id = req.params.id;
      const productExist = await Product.findOne({ _id });
      if(!productExist){
          return res.status(400).json({ message: "The user you're trying to update does not exist"})
      }
      const updateProduct = await Product.findByIdAndUpdate({ _id }, req.body, {new: true})
      res.status(201).json(updateProduct)
    } catch (error) {
      res.status(500).json({ message: "Interal server error", error})
    }
};

export const deleteProduct = async (req, res) => {
  try {
    const _id = req.params.id;
    const productExist = await Product.findOne({ _id });
    if(!productExist){
        return res.status(404).json({ message: "Product not found"});
    }
    await Product.findByIdAndDelete({ _id });
    res.status(201).json({message: "Product deleted succesfully" });
  } catch (error) {
    res.status(500).json({ message: "Interal server error", error})
  }
};