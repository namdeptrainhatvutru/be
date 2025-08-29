const mongoose = require('mongoose');

const khachHangSchema = new mongoose.Schema({
  ho_ten: String,
  email: String,
  mat_khau: String,
  vai_tro: Number,
  diem: Number,
  so_dien_thoai: String,
  ngay_sinh: String,
  gioi_tinh: String,
  khach_hang_id: { type: Number, unique: true }
});

const KhachHang = mongoose.model('KhachHang', khachHangSchema);

async function getNextKhachHangId() {
  const last = await KhachHang.findOne().sort({ khach_hang_id: -1 });
  return last ? last.khach_hang_id + 1 : 1;
}

module.exports = { KhachHang, getNextKhachHangId };
