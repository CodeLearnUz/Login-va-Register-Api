const mongoose = require("mongoose");

// MongoDB-ga ulanish funktsiyasi
const connectDB = async () => {
  // "strictQuery" sozlamasini o'zgartiramiz, bu bilan xabar qilinadigan xatolarni kamaytirishimiz mumkin
  mongoose.set("strictQuery", false);
  // MongoDB ga ulanish
  const connecting = await mongoose.connect(process.env.MONGO_URI);

  // Ulash muvaffaqiyatli bo'lsa, hostni konsolga chiqaramiz
  console.log(`MongoDB ga ulanildi: ${connecting.connection.host}`.bgBlue);
};

// Funktsiyani eksport qilish
module.exports = connectDB;
