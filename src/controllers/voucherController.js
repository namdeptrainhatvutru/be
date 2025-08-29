const { Voucher, getNextVoucherId } = require('../models/Voucher');

exports.createVoucher = async (req, res) => {
  try {
    const nextId = await getNextVoucherId();
    const data = { ...req.body, voucher_id: nextId };
    const voucher = new Voucher(data);
    await voucher.save();
    res.status(201).json(voucher);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllVoucher = async (req, res) => {
  try {
    const query = Object.keys(req.query).length ? { ...req.query } : {};
    const vouchers = await Voucher.find(query);
    res.json(vouchers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getVoucherById = async (req, res) => {
  try {
    const voucher = await Voucher.findOne({ voucher_id: req.params.id });
    if (!voucher) return res.status(404).json({ error: 'Not found' });
    res.json(voucher);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateVoucher = async (req, res) => {
  try {
    const voucher = await Voucher.findOneAndUpdate(
      { voucher_id: req.params.id },
      req.body,
      { new: true }
    );
    if (!voucher) return res.status(404).json({ error: 'Not found' });
    res.json(voucher);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteVoucher = async (req, res) => {
  try {
    const voucher = await Voucher.findOneAndDelete({ voucher_id: req.params.id });
    if (!voucher) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted', voucher });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
