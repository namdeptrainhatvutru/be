const mongoose = require('mongoose');

const gheSchema = new mongoose.Schema({
  vi_tri: String,
  suat_chieu_id: Number,
  trang_thai: String,
  id: { type: Number, unique: true }
});

const Ghe = mongoose.model('Ghe', gheSchema);

async function getNextGheId() {
  const last = await Ghe.findOne().sort({ id: -1 });
  return last ? last.id + 1 : 1;
}

module.exports = { Ghe, getNextGheId };
