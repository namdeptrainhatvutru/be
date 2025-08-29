const mongoose = require('mongoose');

const phongChieuSchema = new mongoose.Schema({
  cinema_id: Number,
  ten_phong: String,
  room_id: { type: Number, unique: true }
});

const PhongChieu = mongoose.model('PhongChieu', phongChieuSchema);

async function getNextRoomId() {
  const last = await PhongChieu.findOne().sort({ room_id: -1 });
  return last ? last.room_id + 1 : 1;
}

module.exports = { PhongChieu, getNextRoomId };
