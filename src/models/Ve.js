const mongoose = require('mongoose');

const veSchema = new mongoose.Schema({
  ten_phong: String,
  ngay_chieu: String,
  gio_chieu: String,
  trang_thai: String,
  dia_chi_rap: String,
  khach_hang_id: Number,
  ma_qr: String,
  ve_id: { type: Number, unique: true },
  ten_phim: String,
  vi_tri_ghe: String
});

const Ve = mongoose.model('Ve', veSchema);

async function getNextVeId() {
  const last = await Ve.findOne().sort({ ve_id: -1 });
  return last ? last.ve_id + 1 : 1;
}

module.exports = { Ve, getNextVeId };
