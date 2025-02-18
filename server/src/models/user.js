import {Schema, model} from "mongoose";
import {genSalt, compare, hash} from "bcrypt";


const userSchema = new Schema({
    pseudo: {type: String, required: true, unique: true, trim: true},
    email: {type: String, required: true, unique: true, lowercase: true, trim: true},
    password: {type: String, required: true, minlength: 6},
    avatar: {type: String, default: ""},
    description: {type: String, default: ""},
}, {timestamps: true});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        const salt = await genSalt(10);
        this.password = await hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

userSchema.methods.comparePassword = async function (password) {
    return await compare(password, this.password);
};

const User = model("User", userSchema);

export default User;