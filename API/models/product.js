import mongoose from "mongoose";

const reviewsSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  discountedPrice: {
    type: Number,
  },
  review: [reviewsSchema],
  userRef: {
    type: String,
    required: true,
  },
  imageURLs: {
    type: Array,
    required: true,
    validate: {
      validator: function (value) {
        return value.length >= 1 && value.length <= 5;
      },
      message: "Product image array must have a length between 1 and 5.",
    },
  },
});

const Product = mongoose.model("product", productSchema);
export default Product;
