const User = require("../models/user.model");
const uploadOnCloudinary = require("../data/cloudinary");
const nodemailer = require("nodemailer");

const getUsers = async function (req, res) {
  try {
    const users = await User.find().populate("Role");
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `failed to get users` });
  }
};

const getUser = async function (req, res) {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).populate("Role");
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `failed to get user` });
  }
};

const addUser = async function (req, res) {
  try {

    const {
      Name,
      Email,
      ApiKey,
      LoginId,
      Password,
      SecurityQuestion,
      SecurityAnswer,
      BirthDate,
      ContactNumber,
      Image,
      Role,
    } = req.body;
    const userExists = await User.findOne({
      $or: [{ Email }, { LoginId }],
    });
    if (userExists)
      return res
        .status(404)
        .json({ message: `User with Email or Login id already exists` });
        
    const imageLocalPath = req.file?.path;
    if (!imageLocalPath)
      return res.status(404).json({ message: "Image is required" });

    const image = await uploadOnCloudinary(imageLocalPath);

    if (!image) return res.status(404).json({ message: `Image is required` });

    const verification = String(Math.floor(Math.random() * 900000) + 100000);

    const user = await User.create({
      Name,
      Email,
      ApiKey,
      LoginId,
      Password,
      SecurityQuestion,
      SecurityAnswer,
      BirthDate,
      ContactNumber,
      Image: image.url,
      Role,
      Token: verification

    });
    res.header("location", `${req.originalUrl}/${user._id}`);
    const token = await user.generateToken();
    res.header(process.env.JWT_TOKEN_HEADER, token);


    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: "Pak Classified",
      to: Email,
      subject: "Email Verification",
      text: verification,
    };

    transporter.sendMail(mailOptions, (error, data) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to send email" });
      }
      console.log("Email sent: " + data.response);
    });


    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `failed to add user` });
  }
};

const updateUser = async function (req, res) {
  try {
    const {
      Name,
      Email,
      ApiKey,
      LoginId,
      Password,
      SecurityQuestion,
      SecurityAnswer,
      BirthDate,
      ContactNumber,
      Image,
      Role,
    } = req.body;
    const userId = req.params.id;
    const updated = await User.findByIdAndUpdate(
      userId,
      {
        Name,
        Email,
        ApiKey,
        LoginId,
        Password,
        SecurityQuestion,
        SecurityAnswer,
        BirthDate,
        ContactNumber,
        Image,
        Role,
      },
      { new: true }
    );
    if (!updated)
      return res
        .status(404)
        .json({ message: `failed to update user because it is not found` });
    return res.status(200).json(updated);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `failed to update user` });
  }
};

const deleteUser = async function (req, res) {
  try {
    const userId = req.params.id;
    const deleted = await User.findByIdAndDelete(userId);
    if (!deleted)
      return res
        .status(404)
        .json({ message: `failed to delete user because it is not found` });
    return res.status(200).json(deleted);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `failed to delete user` });
  }
};

const login = async function (req, res) {
  try {
    const { LoginId, Email, Password } = req.body;

    const userExists = await User.findOne({
      $or: [{ LoginId }, { Email }],
    });
    if (!userExists)
      return res.status(404).json({ message: `Invalid loginId or Email` });

    const isPasswordValid = await userExists.comparePassword(Password);
    if (!isPasswordValid)
      return res.status(404).json({ message: `Invalid password` });

    const token = await userExists.generateToken();
    res.header(process.env.JWT_TOKEN_HEADER, token);

    res.status(200).json({user:userExists, token:token});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `failed to login` });
  }
};

async function getCurrentUser(req, res) {
  try {
    const user = req.user;

    if (!user) return res.status(400).json({ message: `user not found` });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `error from the user route` });
  }
}
module.exports = {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
  login,
  getCurrentUser,
};
