const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// Import các router
const khachHangRoutes = require('./src/routes/khachHangRoutes');
const phimRoutes = require('./src/routes/phimRoutes');
const rapChieuRoutes = require('./src/routes/rapChieuRoutes');
const phongChieuRoutes = require('./src/routes/phongChieuRoutes');
const suatChieuRoutes = require('./src/routes/suatChieuRoutes');
const veRoutes = require('./src/routes/veRoutes');
const thanhtoanRoutes = require('./src/routes/thanhtoanRoutes');
const voucherRoutes = require('./src/routes/voucherRoutes');
const gheRoutes = require('./src/routes/gheRoutes');

// Sử dụng các router
app.use('/khachhang', khachHangRoutes);
app.use('/phim', phimRoutes);
app.use('/rapchieu', rapChieuRoutes);
app.use('/phongchieu', phongChieuRoutes);
app.use('/suatchieu', suatChieuRoutes);
app.use('/ve', veRoutes);
app.use('/thanhtoan', thanhtoanRoutes);
app.use('/voucher', voucherRoutes);
app.use('/ghe', gheRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
