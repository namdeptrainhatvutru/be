const mongoose = require('mongoose');

const suatChieuSchema = new mongoose.Schema({
  room_id: Number,
  phim_id: Number,
  thoi_gian_bat_dau: String,
  thoi_gian_ket_thuc: String,
  ngay_chieu: String,
  suat_chieu_id: { type: Number, unique: true }
});

const SuatChieu = mongoose.model('SuatChieu', suatChieuSchema);

async function getNextSuatChieuId() {
  const last = await SuatChieu.findOne().sort({ suat_chieu_id: -1 });
  return last ? last.suat_chieu_id + 1 : 1;
}

module.exports = { SuatChieu, getNextSuatChieuId };
