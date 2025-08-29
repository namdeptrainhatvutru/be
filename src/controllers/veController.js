const { Ve, getNextVeId } = require('../models/Ve');

exports.createVe = async (req, res) => {
  try {
    const nextId = await getNextVeId();
    const data = { ...req.body, ve_id: nextId };
    const ve = new Ve(data);
    await ve.save();
    res.status(201).json(ve);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllVe = async (req, res) => {
  try {
    const query = Object.keys(req.query).length ? { ...req.query } : {};
    const ves = await Ve.find(query);
    res.json(ves);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getVeById = async (req, res) => {
  try {
    const ve = await Ve.findOne({ ve_id: req.params.id });
    if (!ve) return res.status(404).json({ error: 'Not found' });
    res.json(ve);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateVe = async (req, res) => {
  try {
    const ve = await Ve.findOneAndUpdate(
      { ve_id: req.params.id },
      req.body,
      { new: true }
    );
    if (!ve) return res.status(404).json({ error: 'Not found' });
    res.json(ve);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteVe = async (req, res) => {
  try {
    const ve = await Ve.findOneAndDelete({ ve_id: req.params.id });
    if (!ve) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted', ve });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
