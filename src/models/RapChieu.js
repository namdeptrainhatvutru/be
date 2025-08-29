const mongoose = require('mongoose');

const rapChieuSchema = new mongoose.Schema({
  ten_rap: String,
  dia_chi: String,
  cinema_id: { type: Number, unique: true }
});

const RapChieu = mongoose.model('RapChieu', rapChieuSchema);

async function getNextCinemaId() {
  const last = await RapChieu.findOne().sort({ cinema_id: -1 });
  return last ? last.cinema_id + 1 : 1;
}

module.exports = { RapChieu, getNextCinemaId };
