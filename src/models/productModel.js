import { model, Schema } from "mongoose";

const statusEnum = ["AVAILABLE", "NOT AVAILABLE", "DISCONTINUED"]

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name field is required"],
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30,
    },

    description: {
        type: String,
    },

    status: {
        type: String,
        validate: {
            validator: function (status) {
                return statusEnum.includes(status)
            },
            message: (props) => `${props.value} is not a valid status`
        },
        required: true,  
        enum: statusEnum, 
    },

    price: {
        type: Number,
        required: [true, "Price field is required"],
        min: [0, "Price field has to be a number"]
    },

    image: {
        type: String,
        default: "hhtps://picsum.photos/400"
    },

    stock: {
        type: Number,
        default: 0,
    },

    category: {
        type: Schema.Types.ObjectId, ref: "category",
    },

    createdAt: {
        type: Date,
        default: Date.now()
    },

    updatedAt: {
        type: Date,
        default: Date.now(),
    },
  },
  
  { timestamps: true }
);

export default model("product", productSchema);