const { SuatChieu, getNextSuatChieuId } = require('../models/SuatChieu');

exports.createSuatChieu = async (req, res) => {
  try {
    const nextId = await getNextSuatChieuId();
    const data = { ...req.body, suat_chieu_id: nextId };
    const suat = new SuatChieu(data);
    await suat.save();
    res.status(201).json(suat);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllSuatChieu = async (req, res) => {
  try {
    const query = Object.keys(req.query).length ? { ...req.query } : {};
    const suats = await SuatChieu.find(query);
    res.json(suats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSuatChieuById = async (req, res) => {
  try {
    const suat = await SuatChieu.findOne({ suat_chieu_id: req.params.id });
    if (!suat) return res.status(404).json({ error: 'Not found' });
    res.json(suat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateSuatChieu = async (req, res) => {
  try {
    const suat = await SuatChieu.findOneAndUpdate(
      { suat_chieu_id: req.params.id },
      req.body,
      { new: true }
    );
    if (!suat) return res.status(404).json({ error: 'Not found' });
    res.json(suat);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteSuatChieu = async (req, res) => {
  try {
    const suat = await SuatChieu.findOneAndDelete({ suat_chieu_id: req.params.id });
    if (!suat) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted', suat });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
