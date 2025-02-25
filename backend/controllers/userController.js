// import userModel from "../models/usermodel";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
// import validator from "validator";


// //login user

// const loginUser = async (req, res) => {

// }
// //create token
// const createToken = (id) => {
//     return jwt.sign({ id }, process.env.JWT_SECRET)
// }

// //register user
// const registerUser = async (req, res) => {
//     const { name, password, email } = req.body;
//     try {
//         const exists = await userModel.findOne({ email });
//         if (exists) {
//             return res.json({ success: false, message: "User already esists" });
//         }

//         if (!validator.isEmail(email)) {
//             return res.json({ success: false, message: "Pleace enter a valid email" });
//         }
//         if (password.length < 8) {
//             return res.json({ success: false, message: "Pleace enter a string password" });
//         }

//         //hasing user password
//         const salt = await bcrypt.genSalt(10)
//         const hashedpassword = await bcrypt.hash(password, salt);


//         const user = await userModel.create({
//             name: name,
//             email: email,
//             password: hashedpassword
//         })

//         const token= createToken(user._id);

//         res.json({success:true,token})


//     } catch (err) {
//        console.log("error in register user part",err);
//        res.json({success:false,message:"Error"})
//     }
// }

// export { loginUser, registerUser };



import userModel from "../models/usermodel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";

// Create Token with Expiry
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "200h" });
};

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.json({ success: false, message: "Incorrect password" });
        }

        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (err) {
        console.log("Error in loginUser:", err);
        res.json({ success: false, message: "Error logging in" });
    }
};

// Register User
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters long" });
        }

        // Hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await userModel.create({
            name,
            email,
            password: hashedPassword
        });

        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (err) {
        console.log("Error in registerUser:", err);
        res.json({ success: false, message: "Error registering user" });
    }
};

export { loginUser, registerUser };
