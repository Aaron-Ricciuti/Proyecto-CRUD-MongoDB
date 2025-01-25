import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { isGoodPassword } from "../utils/validators.js";

const rolesEnum = ["ADMIN", "MERCHANT", "CUSTOMER"]

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name field is required"],
        trim: true,
        lowercase: true,
        minLength: 3,
        masLength: 30,
    },

    lastName: {
        type: String,
        required: true,
        maxlength: 20,
        minlength: 2,
        trim: true,
        lowercase: true,
    },

    age: {
        type: Number,
        required: true,
        min: 16,
        max: 115,
    },

    password: {
        required: true,
        type: String,
        validate: {
          validator: function (value) {
            return isGoodPassword(value);
          },
          message: "Password must be between 6 and 12 characters, with at least one number, one upercase letter and one lowercase letter",
        },
    },

    email: {
        type: String,
        required: [true, "Email field is required"],
        trim: true,
        unique: true,
    },

    role: {
        type: String, 
        validate: {
            validator: function (status) {
                return rolesEnum.includes(status)
            },
            message: (props) => `${props.value} is not a valid role`
        }, 
        enum: rolesEnum, 
        required: [true, "Role field is required"],
    },

    registrationDate: {
        type: Date,
        default: Date.now(),
    },
});

userSchema.pre("save", function (next){
    this.password = bcrypt.hashSync(this.password, 10)
    next()
})

export default model("user", userSchema);