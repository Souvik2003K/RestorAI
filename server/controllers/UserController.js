const User = require('../models/UserModel');
const crypto = require('crypto');

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


module.exports = { signup, login };