const { KhachHang, getNextKhachHangId } = require('../models/KhachHang');

exports.createKhachHang = async (req, res) => {
  try {
    const nextId = await getNextKhachHangId();
    const data = { ...req.body, khach_hang_id: nextId };
    const kh = new KhachHang(data);
    await kh.save();
    res.status(201).json(kh);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllKhachHang = async (req, res) => {
  try {
    const query = Object.keys(req.query).length ? { ...req.query } : {};
    const khs = await KhachHang.find(query);
    res.json(khs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getKhachHangById = async (req, res) => {
  try {
    const kh = await KhachHang.findOne({ khach_hang_id: req.params.id });
    if (!kh) return res.status(404).json({ error: 'Not found' });
    res.json(kh);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateKhachHang = async (req, res) => {
  try {
    const kh = await KhachHang.findOneAndUpdate(
      { khach_hang_id: req.params.id },
      req.body,
      { new: true }
    );
    if (!kh) return res.status(404).json({ error: 'Not found' });
    res.json(kh);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteKhachHang = async (req, res) => {
  try {
    const kh = await KhachHang.findOneAndDelete({ khach_hang_id: req.params.id });
    if (!kh) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted', kh });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
