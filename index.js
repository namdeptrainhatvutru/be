const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// KhachHang Schema
const khachHangSchema = new mongoose.Schema({
  ho_ten: String,
  email: String,
  mat_khau: String,
  vai_tro: Number,
  diem: Number,
  so_dien_thoai: String,
  ngay_sinh: String,
  gioi_tinh: String,
  khach_hang_id: { type: Number, unique: true }
});

const KhachHang = mongoose.model('KhachHang', khachHangSchema);

// Tự động tăng khach_hang_id
async function getNextKhachHangId() {
  const last = await KhachHang.findOne().sort({ khach_hang_id: -1 });
  return last ? last.khach_hang_id + 1 : 1;
}

// Phim Schema
const phimSchema = new mongoose.Schema({
  ten_phim: String,
  dao_dien: String,
  ngon_ngu: String,
  do_tuoi: Number,
  mo_ta: String,
  thoi_luong: Number,
  poster_url: String,
  trailer_url: String,
  the_loai: String,
  phim_id: { type: Number, unique: true }
});

const Phim = mongoose.model('Phim', phimSchema);

// Tự động tăng phim_id
async function getNextPhimId() {
  const last = await Phim.findOne().sort({ phim_id: -1 });
  return last ? last.phim_id + 1 : 1;
}

// RapChieu Schema
const rapChieuSchema = new mongoose.Schema({
  ten_rap: String,
  dia_chi: String,
  cinema_id: { type: Number, unique: true }
});

const RapChieu = mongoose.model('RapChieu', rapChieuSchema);

// Tự động tăng cinema_id
async function getNextCinemaId() {
  const last = await RapChieu.findOne().sort({ cinema_id: -1 });
  return last ? last.cinema_id + 1 : 1;
}

// PhongChieu Schema
const phongChieuSchema = new mongoose.Schema({
  cinema_id: Number,
  ten_phong: String,
  room_id: { type: Number, unique: true }
});

const PhongChieu = mongoose.model('PhongChieu', phongChieuSchema);

// Tự động tăng room_id
async function getNextRoomId() {
  const last = await PhongChieu.findOne().sort({ room_id: -1 });
  return last ? last.room_id + 1 : 1;
}

// SuatChieu Schema
const suatChieuSchema = new mongoose.Schema({
  room_id: Number,
  phim_id: Number,
  thoi_gian_bat_dau: String,
  thoi_gian_ket_thuc: String,
  ngay_chieu: String,
  suat_chieu_id: { type: Number, unique: true }
});

const SuatChieu = mongoose.model('SuatChieu', suatChieuSchema);

// Tự động tăng suat_chieu_id
async function getNextSuatChieuId() {
  const last = await SuatChieu.findOne().sort({ suat_chieu_id: -1 });
  return last ? last.suat_chieu_id + 1 : 1;
}

// ThanhToan Schema
const thanhToanSchema = new mongoose.Schema({
  khach_hang_id: Number,
  phuong_thuc: String,
  so_tien: Number,
  ngay_mua: String,
  ve_id: Number,
  thanh_toan_id: { type: Number, unique: true }
});

const ThanhToan = mongoose.model('ThanhToan', thanhToanSchema);

// Tự động tăng thanh_toan_id
async function getNextThanhToanId() {
  const last = await ThanhToan.findOne().sort({ thanh_toan_id: -1 });
  return last ? last.thanh_toan_id + 1 : 1;
}

// Ve Schema
const veSchema = new mongoose.Schema({
  ten_phong: String,
  ngay_chieu: String,
  gio_chieu: String,
  trang_thai: String,
  dia_chi_rap: String,
  khach_hang_id: Number,
  ma_qr: String,
  ve_id: { type: Number, unique: true },
  ten_phim: String,
  vi_tri_ghe: String
});

const Ve = mongoose.model('Ve', veSchema);

// Tự động tăng ve_id
async function getNextVeId() {
  const last = await Ve.findOne().sort({ ve_id: -1 });
  return last ? last.ve_id + 1 : 1;
}

// Voucher Schema
const voucherSchema = new mongoose.Schema({
  khach_hang_id: String,
  ma_voucher: String,
  thoi_gian_het_han: String,
  giam_gia: Number,
  voucher_id: { type: Number, unique: true }
});

const Voucher = mongoose.model('Voucher', voucherSchema);

// Tự động tăng voucher_id
async function getNextVoucherId() {
  const last = await Voucher.findOne().sort({ voucher_id: -1 });
  return last ? last.voucher_id + 1 : 1;
}

// Ghe Schema
const gheSchema = new mongoose.Schema({
  vi_tri: String,
  suat_chieu_id: Number,
  trang_thai: String,
  id: { type: Number, unique: true }
});

const Ghe = mongoose.model('Ghe', gheSchema);

// Tự động tăng id
async function getNextGheId() {
  const last = await Ghe.findOne().sort({ id: -1 });
  return last ? last.id + 1 : 1;
}

// Tạo khách hàng mới
app.post('/khachhang', async (req, res) => {
  try {
    const nextId = await getNextKhachHangId();
    const data = { ...req.body, khach_hang_id: nextId };
    const kh = new KhachHang(data);
    await kh.save();
    res.status(201).json(kh);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Lấy tất cả khách hàng
app.get('/khachhang', async (req, res) => {
  try {
    // Nếu có query thì tìm theo params, nếu không thì lấy tất cả
    const query = Object.keys(req.query).length ? { ...req.query } : {};
    const khs = await KhachHang.find(query);
    res.json(khs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Lấy khách hàng theo khach_hang_id
app.get('/khachhang/:id', async (req, res) => {
  try {
    const kh = await KhachHang.findOne({ khach_hang_id: req.params.id });
    if (!kh) return res.status(404).json({ error: 'Not found' });
    res.json(kh);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Tìm kiếm khách hàng bằng params (ví dụ: email, ho_ten)
app.get('/khachhang', async (req, res) => {
  try {
    // Tìm theo bất kỳ trường nào truyền vào query
    const query = { ...req.query };
    const khs = await KhachHang.find(query);
    res.json(khs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Cập nhật khách hàng
app.put('/khachhang/:id', async (req, res) => {
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
});

// Xóa khách hàng
app.delete('/khachhang/:id', async (req, res) => {
  try {
    const kh = await KhachHang.findOneAndDelete({ khach_hang_id: req.params.id });
    if (!kh) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted', kh });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Tạo phim mới
app.post('/phim', async (req, res) => {
  try {
    const nextId = await getNextPhimId();
    const data = { ...req.body, phim_id: nextId };
    const phim = new Phim(data);
    await phim.save();
    res.status(201).json(phim);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Lấy tất cả phim
// Lấy tất cả phim & tìm kiếm theo params
app.get('/phim', async (req, res) => {
  try {
    const query = Object.keys(req.query).length ? { ...req.query } : {};
    const phims = await Phim.find(query);
    res.json(phims);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Lấy phim theo phim_id
app.get('/phim/:id', async (req, res) => {
  try {
    const phim = await Phim.findOne({ phim_id: req.params.id });
    if (!phim) return res.status(404).json({ error: 'Not found' });
    res.json(phim);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Tìm kiếm phim bằng params (bất kỳ trường nào)
app.get('/phim', async (req, res) => {
  try {
    const query = { ...req.query };
    const phims = await Phim.find(query);
    res.json(phims);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Cập nhật phim
app.put('/phim/:id', async (req, res) => {
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
});

// Xóa phim
app.delete('/phim/:id', async (req, res) => {
  try {
    const phim = await Phim.findOneAndDelete({ phim_id: req.params.id });
    if (!phim) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted', phim });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Tạo rạp chiếu mới
app.post('/rapchieu', async (req, res) => {
  try {
    const nextId = await getNextCinemaId();
    const data = { ...req.body, cinema_id: nextId };
    const rap = new RapChieu(data);
    await rap.save();
    res.status(201).json(rap);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Lấy tất cả rạp chiếu
// Lấy tất cả rạp chiếu & tìm kiếm theo params
app.get('/rapchieu', async (req, res) => {
  try {
    const query = Object.keys(req.query).length ? { ...req.query } : {};
    const raps = await RapChieu.find(query);
    res.json(raps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Lấy rạp chiếu theo cinema_id
app.get('/rapchieu/:id', async (req, res) => {
  try {
    const rap = await RapChieu.findOne({ cinema_id: req.params.id });
    if (!rap) return res.status(404).json({ error: 'Not found' });
    res.json(rap);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Tìm kiếm rạp chiếu bằng params (bất kỳ trường nào)
app.get('/rapchieu', async (req, res) => {
  try {
    const query = { ...req.query };
    const raps = await RapChieu.find(query);
    res.json(raps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Cập nhật rạp chiếu
app.put('/rapchieu/:id', async (req, res) => {
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
});

// Xóa rạp chiếu
app.delete('/rapchieu/:id', async (req, res) => {
  try {
    const rap = await RapChieu.findOneAndDelete({ cinema_id: req.params.id });
    if (!rap) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted', rap });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Tạo phòng chiếu mới
app.post('/phongchieu', async (req, res) => {
  try {
    const nextId = await getNextRoomId();
    const data = { ...req.body, room_id: nextId };
    const phong = new PhongChieu(data);
    await phong.save();
    res.status(201).json(phong);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Lấy tất cả phòng chiếu
// Lấy tất cả phòng chiếu & tìm kiếm theo params
app.get('/phongchieu', async (req, res) => {
  try {
    const query = Object.keys(req.query).length ? { ...req.query } : {};
    const phongs = await PhongChieu.find(query);
    res.json(phongs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Lấy phòng chiếu theo room_id
app.get('/phongchieu/:id', async (req, res) => {
  try {
    const phong = await PhongChieu.findOne({ room_id: req.params.id });
    if (!phong) return res.status(404).json({ error: 'Not found' });
    res.json(phong);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Tìm kiếm phòng chiếu bằng params (bất kỳ trường nào)
app.get('/phongchieu', async (req, res) => {
  try {
    const query = { ...req.query };
    const phongs = await PhongChieu.find(query);
    res.json(phongs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Cập nhật phòng chiếu
app.put('/phongchieu/:id', async (req, res) => {
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
});

// Xóa phòng chiếu
app.delete('/phongchieu/:id', async (req, res) => {
  try {
    const phong = await PhongChieu.findOneAndDelete({ room_id: req.params.id });
    if (!phong) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted', phong });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Tạo suất chiếu mới
app.post('/suatchieu', async (req, res) => {
  try {
    const nextId = await getNextSuatChieuId();
    const data = { ...req.body, suat_chieu_id: nextId };
    const suat = new SuatChieu(data);
    await suat.save();
    res.status(201).json(suat);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Lấy tất cả suất chiếu
// Lấy tất cả suất chiếu & tìm kiếm theo params
app.get('/suatchieu', async (req, res) => {
  try {
    const query = Object.keys(req.query).length ? { ...req.query } : {};
    const suats = await SuatChieu.find(query);
    res.json(suats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Lấy suất chiếu theo suat_chieu_id
app.get('/suatchieu/:id', async (req, res) => {
  try {
    const suat = await SuatChieu.findOne({ suat_chieu_id: req.params.id });
    if (!suat) return res.status(404).json({ error: 'Not found' });
    res.json(suat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Cập nhật suất chiếu
app.put('/suatchieu/:id', async (req, res) => {
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
});

// Xóa suất chiếu
app.delete('/suatchieu/:id', async (req, res) => {
  try {
    const suat = await SuatChieu.findOneAndDelete({ suat_chieu_id: req.params.id });
    if (!suat) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted', suat });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Tạo thanh toán mới
app.post('/thanhtoan', async (req, res) => {
  try {
    const nextId = await getNextThanhToanId();
    const data = { ...req.body, thanh_toan_id: nextId };
    const tt = new ThanhToan(data);
    await tt.save();
    res.status(201).json(tt);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Lấy tất cả thanh toán & tìm kiếm theo params
// Lấy tất cả thanh toán & tìm kiếm theo params
app.get('/thanhtoan', async (req, res) => {
  try {
    const query = Object.keys(req.query).length ? { ...req.query } : {};
    const tts = await ThanhToan.find(query);
    res.json(tts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Lấy thanh toán theo thanh_toan_id
app.get('/thanhtoan/:id', async (req, res) => {
  try {
    const tt = await ThanhToan.findOne({ thanh_toan_id: req.params.id });
    if (!tt) return res.status(404).json({ error: 'Not found' });
    res.json(tt);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Cập nhật thanh toán
app.put('/thanhtoan/:id', async (req, res) => {
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
});

// Xóa thanh toán
app.delete('/thanhtoan/:id', async (req, res) => {
  try {
    const tt = await ThanhToan.findOneAndDelete({ thanh_toan_id: req.params.id });
    if (!tt) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted', tt });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Tạo vé mới
app.post('/ve', async (req, res) => {
  try {
    const nextId = await getNextVeId();
    const data = { ...req.body, ve_id: nextId };
    const ve = new Ve(data);
    await ve.save();
    res.status(201).json(ve);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Lấy tất cả vé & tìm kiếm theo params
// Lấy tất cả vé & tìm kiếm theo params
app.get('/ve', async (req, res) => {
  try {
    const query = Object.keys(req.query).length ? { ...req.query } : {};
    const ves = await Ve.find(query);
    res.json(ves);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Lấy vé theo ve_id
app.get('/ve/:id', async (req, res) => {
  try {
    const ve = await Ve.findOne({ ve_id: req.params.id });
    if (!ve) return res.status(404).json({ error: 'Not found' });
    res.json(ve);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Cập nhật vé
app.put('/ve/:id', async (req, res) => {
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
});

// Xóa vé
app.delete('/ve/:id', async (req, res) => {
  try {
    const ve = await Ve.findOneAndDelete({ ve_id: req.params.id });
    if (!ve) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted', ve });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Tạo voucher mới
app.post('/voucher', async (req, res) => {
  try {
    const nextId = await getNextVoucherId();
    const data = { ...req.body, voucher_id: nextId };
    const voucher = new Voucher(data);
    await voucher.save();
    res.status(201).json(voucher);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Lấy tất cả voucher & tìm kiếm theo params
// Lấy tất cả voucher & tìm kiếm theo params
app.get('/voucher', async (req, res) => {
  try {
    const query = Object.keys(req.query).length ? { ...req.query } : {};
    const vouchers = await Voucher.find(query);
    res.json(vouchers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Lấy voucher theo voucher_id
app.get('/voucher/:id', async (req, res) => {
  try {
    const voucher = await Voucher.findOne({ voucher_id: req.params.id });
    if (!voucher) return res.status(404).json({ error: 'Not found' });
    res.json(voucher);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Cập nhật voucher
app.put('/voucher/:id', async (req, res) => {
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
});

// Xóa voucher
app.delete('/voucher/:id', async (req, res) => {
  try {
    const voucher = await Voucher.findOneAndDelete({ voucher_id: req.params.id });
    if (!voucher) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted', voucher });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Tạo ghế mới
app.post('/ghe', async (req, res) => {
  try {
    const nextId = await getNextGheId();
    const data = { ...req.body, id: nextId };
    const ghe = new Ghe(data);
    await ghe.save();
    res.status(201).json(ghe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Lấy tất cả ghế & tìm kiếm theo params
// Lấy tất cả ghế & tìm kiếm theo params
app.get('/ghe', async (req, res) => {
  try {
    const query = Object.keys(req.query).length ? { ...req.query } : {};
    const ghes = await Ghe.find(query);
    res.json(ghes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Lấy ghế theo id
app.get('/ghe/:id', async (req, res) => {
  try {
    const ghe = await Ghe.findOne({ id: req.params.id });
    if (!ghe) return res.status(404).json({ error: 'Not found' });
    res.json(ghe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Cập nhật ghế
app.put('/ghe/:id', async (req, res) => {
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
});

// Xóa ghế
app.delete('/ghe/:id', async (req, res) => {
  try {
    const ghe = await Ghe.findOneAndDelete({ id: req.params.id });
    if (!ghe) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted', ghe });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
