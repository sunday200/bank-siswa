import asyncHandler from 'express-async-handler'
import Siswa from '../model/siswaModel.js'

// @desc Get siswa
// @route GET /api/siswa
// @access all
const getStudents = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.amountData) || 5
  const page = Number(req.query.pageNumber) || 1

  // For search
  const keyword = req.query.keyword
    ? { nama: { $regex: req.query.keyword, $options: 'i' } }
    : {}

  const students = await Siswa.find({ ...keyword })
    .sort({ nama: 1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  const studentsLength = await Siswa.find({ ...keyword }).sort({ nama: 1 })

  const count = studentsLength.length
  if (!students) {
    res.status(404)
    throw new Error('students not found')
  }

  res.status(200).json({
    students,
    count,
    pageSize,
    page,
    pages: Math.ceil(count / pageSize),
  })
})

// @desc add siswa
// @route POST /api/siswa
// @access all
const createStudent = asyncHandler(async (req, res) => {
  const {
    nama,
    email,
    tempat_lahir,
    kelamin_jenis,
    alamat,
    nisn,
    telepon,
    tanggal_lahir,
    agama,
  } = req.body

  if (!nama || !email || !email) {
    res.status(400)
    throw new Error('Please complete field')
  }

  const alreadyEmailUser = await Siswa.findOne({ email })
  const alreadyNISNUser = await Siswa.findOne({ nisn })

  if (alreadyEmailUser) {
    res.status(400)
    throw new Error('email already used')
  }

  if (alreadyNISNUser) {
    res.status(400)
    throw new Error('NISN already used')
  }

  const student = await Siswa.create({
    nama,
    email,
    tempat_lahir,
    kelamin_jenis,
    alamat,
    nisn,
    telepon,
    tanggal_lahir,
    agama,
  })

  console.log(student)

  res.status(200).json(student)
})

// @desc edit siswa
// @route PUT /api/siswa/:id
// @access all
const updateStudent = asyncHandler(async (req, res) => {
  const {
    nama,
    email,
    tempat_lahir,
    kelamin_jenis,
    alamat,
    nisn,
    telepon,
    tanggal_lahir,
    agama,
  } = req.body

  const student = await Siswa.findById(req.params.id)

  if (student) {
    student.nama = nama
    student.email = email
    student.tempat_lahir = tempat_lahir
    student.kelamin_jenis = kelamin_jenis
    student.alamat = alamat
    student.nisn = nisn
    student.telepon = telepon
    student.tanggal_lahir = tanggal_lahir
    student.agama = agama
  } else {
    res.status(404)
    throw new Error('Student not found')
  }

  const updateStudent = await student.save()
  res.status(200).json(updateStudent)
})

// @desc Delete siswa
// @route DELETE /api/siswa/:id
// @access all
const deleteStudent = asyncHandler(async (req, res) => {
  const student = await Siswa.findById(req.params.id)

  if (!student) {
    res.status(404)
    throw new Error('Student not found')
  }

  await student.deleteOne()

  res.status(200).json({ success: true })
})

export { getStudents, createStudent, updateStudent, deleteStudent }
