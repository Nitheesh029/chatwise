import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.util.js";
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if ((!name, !email, !password))
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });

    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res
        .status(409)
        .json({ success: false, message: "User already exists, Please login" });

    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken({
      userId: newUser._id,
      email: newUser.email,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log("Registration error: ", error);

    if (error.name === "ValidationError") {
      const message = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: message[0],
      });
    }

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });

    const user = await User.findOne({ email });

    if (!user)
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });

    const token = generateToken({
      userId: user._id,
      email: user.email,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error: ", error);
    return res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};

export const getLoggedInUser = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    console.error("Get User Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error fetching user",
    });
  }
};
