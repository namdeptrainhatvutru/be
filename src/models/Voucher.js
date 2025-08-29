const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema({
  khach_hang_id: String,
  ma_voucher: String,
  thoi_gian_het_han: String,
  giam_gia: Number,
  voucher_id: { type: Number, unique: true }
});

const Voucher = mongoose.model('Voucher', voucherSchema);

async function getNextVoucherId() {
  const last = await Voucher.findOne().sort({ voucher_id: -1 });
  return last ? last.voucher_id + 1 : 1;
}

module.exports = { Voucher, getNextVoucherId };
