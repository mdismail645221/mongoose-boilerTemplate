const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());


// schema design
const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    trim: true,
    unique: [true, 'name must be unique'],
    minLength: [3, 'name must be 3 characters'],
    maxLength: [100, 'name is to large']
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: [0, "price can be nagative"]
  },
  // unit: {
  //   type: String,
  //   required: true,
  //   enum: {
  //     values: ["kg", "litter", "psc"],
  //     message: `unit value can't be {VALUE}, must be kg/litter/pcs`
  //   }
  // },
  quantity: {
    type: Number,
    required: true,
    min: [0, "price can be nagative"],
    validate: {
      validator: (value) => {
        const isInteger = Number.isInteger(value)
        console.log(isInteger)
        if (isInteger) {
          return true
        } else {
          return false
        }
      },
      message: "quantity is must be integer"
    }
  },
  status: {
    type: String,
    required: true,
    enum: {
      values: ["out-of-stock", "in-stock", "discontinued"],
      message: `unit value can't be {VALUE}`
    }
  },
  // createDate: {
  //   type: Date,
  //   default: Date.now
  // },
  // updateDated: {
  //   type: Date,
  //   default: Date.now
  // },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier"
  }

}, { timestamps: true })


// SCHEME -> MODEL -> QUERY
const Product = mongoose.model('Product', ProductSchema)


app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

app.post('/api/v2/product', async (req, res, next) => {
  try {
    // save or create
    // const product = new Product(req.body);
    // const result = await product.save()
    const result = await Product.create(req.body)
    res.status(200).json({
      status: true,
      data: result,
      message: 'data insert successfully'
    })
  } catch (error) {
    res.status(400).json({
      status: false,
      data: null,
      message: error.message
    })
  }

})




module.exports = app;
