import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";
import { cookieOptions, clearCookieOptions } from "../utils/cookieOptions.js";
import { hashToken, compareToken } from "../utils/hashToken.js";

// ================= REGISTER =================
export const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name?.trim() || !email?.trim() || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await userModel.findOne({
      email: normalizedEmail,
    });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });

    const accessToken = generateAccessToken(user._id);

    const refreshToken = generateRefreshToken(user._id);

    const hashedRefreshToken = hashToken(refreshToken);

    user.refreshToken = hashedRefreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, cookieOptions);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: Object.values(error.errors)[0].message,
      });
    }
    console.error("Register error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ================= LOGIN =================
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await userModel
      .findOne({ email: normalizedEmail })
      .select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "No account found with this email",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password" });

    const accessToken = generateAccessToken(user._id);

    const refreshToken = generateRefreshToken(user._id);

    const hashedRefreshToken = hashToken(refreshToken);

    user.refreshToken = hashedRefreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, cookieOptions);

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// called when the frontend's access token has expired
export const refresh = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken)
    return res
      .status(401)
      .json({ success: false, message: "No refresh token provided" });

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const user = await userModel.findById(decoded.id);

    if (!user || !user.refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    const isTokenValid = compareToken(refreshToken, user.refreshToken);

    if (!isTokenValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    const newAccessToken = generateAccessToken(user._id);

    const newRefreshToken = generateRefreshToken(user._id);

    const hashedRefreshToken = hashToken(newRefreshToken);

    user.refreshToken = hashedRefreshToken;
    await user.save();

    res.cookie("refreshToken", newRefreshToken, cookieOptions);

    res.status(200).json({
      success: true,
      message: "Access token refreshed successfully",
      accessToken: newAccessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Refresh token error:", error);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired refresh token",
    });
  }
};

// ================= LOGOUT =================
export const userLogout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (refreshToken) {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

      await userModel.findByIdAndUpdate(decoded.id, {
        refreshToken: null,
      });
    }

    res.clearCookie("refreshToken", clearCookieOptions);

    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    res.clearCookie("refreshToken", clearCookieOptions);

    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  }
};
