// Express modulini import qilamiz
const express = require("express");
// Dotenv modulini import qilamiz
const dotenv = require("dotenv");
const morgan = require("morgan");
const errorHandler = require("./middlewares/error");
const colors = require("colors");
// MongoDB-ga ulanishni yaratadigan funktsiyani import qilamiz
const connectDB = require("./config/db");

// .env faylidagi ma'lumotlarni yuklash
dotenv.config();

// MongoDB-ga ulanishni amalga oshiramiz
connectDB();

// Express obyektini yaratamiz
const app = express();

// JSON va URL kodlashni qo'llab-quvvatlash
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Agar "NODE_ENV" muhit o'zgaruvchisi "developmen" bo'lsa, morgan ni ishlatamiz
if (process.env.NODE_ENV === "developmen") {
  app.use(morgan("dev"));
}

app.use("/api/v1/auth", require("./routes/auth.route"));

app.use(errorHandler);

// Server portini o'zgaruvchiga yuklash, agar yo'q bo'lsa 3000 ni ishlatamiz
const PORT = process.env.PORT || 3000;

// Serverni tanlash va uning portida ishga tushiramiz
app.listen(PORT, () => {
  // Serverning ishlayotgan rejimini va portini konsolga chiqaramiz
  console.log(
    `Server ${process.env.NODE_ENV} rejimida ${PORT} portida ishga tushdi`.white
      .bold
  );
});
