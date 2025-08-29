const mongoose = require('mongoose');

const thanhToanSchema = new mongoose.Schema({
  khach_hang_id: Number,
  phuong_thuc: String,
  so_tien: Number,
  ngay_mua: String,
  ve_id: Number,
  thanh_toan_id: { type: Number, unique: true }
});

const ThanhToan = mongoose.model('ThanhToan', thanhToanSchema);

async function getNextThanhToanId() {
  const last = await ThanhToan.findOne().sort({ thanh_toan_id: -1 });
  return last ? last.thanh_toan_id + 1 : 1;
}

module.exports = { ThanhToan, getNextThanhToanId };
