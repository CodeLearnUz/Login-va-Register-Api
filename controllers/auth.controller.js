const User = require("../models/user.model");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const uuid = require("uuid");

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const apiKey = uuid.v4();

  const user = await User.create({
    name,
    email,
    password,
    apiKey,
  });

  res.status(201).json({
    success: true,
    data: user,
  });
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new ErrorResponse("Iltimos, elektron pochta va parolni kiriting", 400)
    );
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorResponse("Yaroqsiz hisob ma'lumotlari", 401));
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Yaroqsiz hisob ma'lumotlari", 401));
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});
