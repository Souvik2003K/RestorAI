const User = require('../models/UserModel');
const crypto = require('crypto');
const fs = require("fs")
const Replicate = require("replicate");

const replicate = new Replicate();

const signup = async (req, res) => {
    try {
        const apiKey = crypto.randomBytes(16).toString('hex');
        const {email , password} = req.body;
        const user = new User({ email, password, api_key: apiKey });
        user.save().then(() => {
            res.status(201).json({ message: 'User added successfully' });
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        res.status(200).json({user: user._id});
    } catch (error) {
        console.log(error);
    }
}

// const generate = async (req, res) => {

//     const file = req.file;
//     console.log(file)

    


//     const input = {
//         jpeg: "40",
//         image: fileBuffer,
//         noise: "15"
//     };
//     const output = await replicate.run("jingyunliang/swinir:660d922d33153019e8c263a3bba265de882e7f4f70396546b6c9c8f9d47a021a", { input });
//     console.log(output)
// }


module.exports = { signup, login };