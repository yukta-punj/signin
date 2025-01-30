const User = require('../models/user');

const registerUser = async (req, res) => {
    try {
        
        const { name, phoneorEmail, password } = req.body;

        const existingUser = await User.findOne({ $or: [{ name }, { phoneorEmail }] });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User with this name or phone/email already exists',
            });
        }

        const user = await User.create({ name, phoneorEmail, password }); // No hashing

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: {
                id: user._id,
                name,
                phoneorEmail,
            },
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Error in registration',
            error: error.message,
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { phoneorEmail, password } = req.body;

        const user = await User.findOne({ phoneorEmail });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials', // Could be more specific
            });
        }

        if (password!== user.password) { // Basic password check (INSECURE - for demo only)
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: {
                id: user._id,
                name: user.name,
                phoneorEmail: user.phoneorEmail,
            },
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Error in login',
            error: error.message,
        });
    }
};

module.exports = { registerUser, loginUser };