const { Phim, getNextPhimId } = require('../models/Phim');

exports.createPhim = async (req, res) => {
  try {
    const nextId = await getNextPhimId();
    const data = { ...req.body, phim_id: nextId };
    const phim = new Phim(data);
    await phim.save();
    res.status(201).json(phim);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllPhim = async (req, res) => {
  try {
    const query = Object.keys(req.query).length ? { ...req.query } : {};
    const phims = await Phim.find(query);
    res.json(phims);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPhimById = async (req, res) => {
  try {
    const phim = await Phim.findOne({ phim_id: req.params.id });
    if (!phim) return res.status(404).json({ error: 'Not found' });
    res.json(phim);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePhim = async (req, res) => {
  try {
    const phim = await Phim.findOneAndUpdate(
      { phim_id: req.params.id },
      req.body,
      { new: true }
    );
    if (!phim) return res.status(404).json({ error: 'Not found' });
    res.json(phim);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deletePhim = async (req, res) => {
  try {
    const phim = await Phim.findOneAndDelete({ phim_id: req.params.id });
    if (!phim) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted', phim });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
