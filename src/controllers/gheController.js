const { Ghe, getNextGheId } = require('../models/Ghe');

exports.createGhe = async (req, res) => {
  try {
    const nextId = await getNextGheId();
    const data = { ...req.body, id: nextId };
    const ghe = new Ghe(data);
    await ghe.save();
    res.status(201).json(ghe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllGhe = async (req, res) => {
  try {
    const query = Object.keys(req.query).length ? { ...req.query } : {};
    const ghes = await Ghe.find(query);
    res.json(ghes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getGheById = async (req, res) => {
  try {
    const ghe = await Ghe.findOne({ id: req.params.id });
    if (!ghe) return res.status(404).json({ error: 'Not found' });
    res.json(ghe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateGhe = async (req, res) => {
  try {
    const ghe = await Ghe.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!ghe) return res.status(404).json({ error: 'Not found' });
    res.json(ghe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteGhe = async (req, res) => {
  try {
    const ghe = await Ghe.findOneAndDelete({ id: req.params.id });
    if (!ghe) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted', ghe });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
