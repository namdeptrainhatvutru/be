const mongoose = require('mongoose');

const phimSchema = new mongoose.Schema({
  ten_phim: String,
  dao_dien: String,
  ngon_ngu: String,
  do_tuoi: Number,
  mo_ta: String,
  thoi_luong: Number,
  poster_url: String,
  trailer_url: String,
  the_loai: String,
  phim_id: { type: Number, unique: true }
});

const Phim = mongoose.model('Phim', phimSchema);

async function getNextPhimId() {
  const last = await Phim.findOne().sort({ phim_id: -1 });
  return last ? last.phim_id + 1 : 1;
}

module.exports = { Phim, getNextPhimId };
