import Management from '../model/managementModel.js'
import asyncHandler from 'express-async-handler'

// @desc Get all class
// @route GET /api/kelas
// @access all
const getManagementStudents = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.amountData) || 5
  const page = Number(req.query.pageNumber) || 1

  // For search
  const keyword = req.query.keyword
    ? { nama: { $regex: req.query.keyword, $options: 'i' } }
    : {}

  // For search
  const keywordClass = req.query.keywordClass
    ? { kelas: req.query.keywordClass }
    : {}

  const management = await Management.find()
    .sort({ nama: 1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .populate({ path: 'siswa', select: 'nama email', match: keyword })
    .populate({ path: 'kelas', select: 'kelas status', match: keywordClass })
    .then((xs) => xs.filter((x) => x.siswa !== null))
    .then((xs) => xs.filter((x) => x.kelas !== null))

  const managementLength = await Management.find()
    .sort({ nama: 1 })
    .populate({ path: 'siswa', select: 'nama email', match: keyword })
    .populate({ path: 'kelas', select: 'kelas status', match: keywordClass })
    .then((xs) => xs.filter((x) => x.siswa !== null))
    .then((xs) => xs.filter((x) => x.kelas !== null))

  const count = managementLength.length
  res.status(200).json({
    management,
    count,
    pageSize,
    page,
    pages: Math.ceil(count / pageSize),
  })
})

// @desc add management
// @route POST /api/management
// @access all
const createManagementStudents = asyncHandler(async (req, res) => {
  const { siswa, kelas } = req.body

  const management = await Management.create({
    siswa,
    kelas,
  })

  res.status(201).json(management)
})

// @desc delete management
// @route POST /api/management
// @access all
const deleteManagement = asyncHandler(async (req, res) => {
  const management = await Management.findById(req.params.id)

  if (!management) {
    res.status(404)
    throw new Eror('Management not found')
  }

  await management.deleteOne()

  res.status(200).json({ success: true })
})

export { createManagementStudents, getManagementStudents, deleteManagement }
