const mongoose = require("mongoose");
const { v4 } = require("uuid");
const bcrypt = require("bcryptjs");

const SALT_ROUNDS = 10;

// Foydalanuvchi skhemasini yaratish
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    adminStatus: {
      type: Boolean,
      default: false,
    },
    apiKey: {
      type: String,
      unique: true,
      required: true,
      default: v4(), // Avtomatik API kalit yaratish
    },
    balance: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Parol heshlashi uchun middleware funksiya
userSchema.pre("save", async function (next) {
  // Parol o'zgartirilganmi tekshirish
  if (!this.isModified("password")) {
    return next();
  }
  // Parolni heshlash
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Foydalanuvchi modelini yaratish
const User = mongoose.model("User", userSchema);

module.exports = User;
