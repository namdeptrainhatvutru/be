const { RapChieu, getNextCinemaId } = require('../models/RapChieu');

exports.createRapChieu = async (req, res) => {
  try {
    const nextId = await getNextCinemaId();
    const data = { ...req.body, cinema_id: nextId };
    const rap = new RapChieu(data);
    await rap.save();
    res.status(201).json(rap);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllRapChieu = async (req, res) => {
  try {
    const query = Object.keys(req.query).length ? { ...req.query } : {};
    const raps = await RapChieu.find(query);
    res.json(raps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRapChieuById = async (req, res) => {
  try {
    const rap = await RapChieu.findOne({ cinema_id: req.params.id });
    if (!rap) return res.status(404).json({ error: 'Not found' });
    res.json(rap);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateRapChieu = async (req, res) => {
  try {
    const rap = await RapChieu.findOneAndUpdate(
      { cinema_id: req.params.id },
      req.body,
      { new: true }
    );
    if (!rap) return res.status(404).json({ error: 'Not found' });
    res.json(rap);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteRapChieu = async (req, res) => {
  try {
    const rap = await RapChieu.findOneAndDelete({ cinema_id: req.params.id });
    if (!rap) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted', rap });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
