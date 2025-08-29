const { PhongChieu, getNextRoomId } = require('../models/PhongChieu');

exports.createPhongChieu = async (req, res) => {
  try {
    const nextId = await getNextRoomId();
    const data = { ...req.body, room_id: nextId };
    const phong = new PhongChieu(data);
    await phong.save();
    res.status(201).json(phong);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllPhongChieu = async (req, res) => {
  try {
    const query = Object.keys(req.query).length ? { ...req.query } : {};
    const phongs = await PhongChieu.find(query);
    res.json(phongs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPhongChieuById = async (req, res) => {
  try {
    const phong = await PhongChieu.findOne({ room_id: req.params.id });
    if (!phong) return res.status(404).json({ error: 'Not found' });
    res.json(phong);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePhongChieu = async (req, res) => {
  try {
    const phong = await PhongChieu.findOneAndUpdate(
      { room_id: req.params.id },
      req.body,
      { new: true }
    );
    if (!phong) return res.status(404).json({ error: 'Not found' });
    res.json(phong);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deletePhongChieu = async (req, res) => {
  try {
    const phong = await PhongChieu.findOneAndDelete({ room_id: req.params.id });
    if (!phong) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted', phong });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
