const Verify = require("../models/verification.model");
const User = require("../models/user.model");

const toVerify = async function (req, res) {
    try {
        const { Id } = req.body;
        console.log(Id);
        

        // Find the user by token
        const user = await User.findOne({ Token: Id });
        console.log(user);
        
        if (user) {
            // Update user details
            user.Token = ""; // Clear the token
            user.isVerified = true; // Set the user as verified
            await user.save(); // Save the updated user

            // Respond with success
            res.status(200).json({ message: 'User verified successfully' });
        } else {
            // Respond with failure if user is not found
            res.status(400).json({ message: 'Failed to verify: Invalid token' });
        }
    } catch (error) {
        // Handle and log errors
        console.error('Error verifying user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { toVerify };
