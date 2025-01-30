const registerUser = async (req, res) => {
    const { name, phoneorEmail, password } = req.body;

    try {
        const existingUser = await User.findOne({ phoneorEmail });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists!' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            phoneorEmail,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error!' });
    }
};

const loginUser = async (req, res) => {
    const { phoneorEmail, password } = req.body;

    try {
        const user = await User.findOne({ phoneorEmail });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials!' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials!' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error...' });
    }
};
