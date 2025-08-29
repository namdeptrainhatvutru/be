const { ThanhToan, getNextThanhToanId } = require('../models/ThanhToan');

exports.createThanhToan = async (req, res) => {
  try {
    const nextId = await getNextThanhToanId();
    const data = { ...req.body, thanh_toan_id: nextId };
    const tt = new ThanhToan(data);
    await tt.save();
    res.status(201).json(tt);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllThanhToan = async (req, res) => {
  try {
    const query = Object.keys(req.query).length ? { ...req.query } : {};
    const tts = await ThanhToan.find(query);
    res.json(tts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getThanhToanById = async (req, res) => {
  try {
    const tt = await ThanhToan.findOne({ thanh_toan_id: req.params.id });
    if (!tt) return res.status(404).json({ error: 'Not found' });
    res.json(tt);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateThanhToan = async (req, res) => {
  try {
    const tt = await ThanhToan.findOneAndUpdate(
      { thanh_toan_id: req.params.id },
      req.body,
      { new: true }
    );
    if (!tt) return res.status(404).json({ error: 'Not found' });
    res.json(tt);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteThanhToan = async (req, res) => {
  try {
    const tt = await ThanhToan.findOneAndDelete({ thanh_toan_id: req.params.id });
    if (!tt) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted', tt });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
