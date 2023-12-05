import asyncHandler from 'express-async-handler'
import Kelas from '../model/kelasModel.js'

// @desc Get all class
// @route GET /api/kelas
// @access all
const getClasses = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.amountData) || 5
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? { kelas: { $regex: req.query.keyword, $options: 'i' } }
    : {}

  const classes = await Kelas.find({ ...keyword })
    .sort({ kelas: 1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  const classesLength = await Kelas.find({ ...keyword }).sort({ kelas: 1 })

  const count = classesLength.length

  if (!classes) {
    res.status(404)
    throw new Error('Classes not found')
  }

  res.status(200).json({
    classes,
    count,
    pageSize,
    page,
    pages: Math.ceil(count / pageSize),
  })
})

// @desc add class
// @route POST /api/kelas
// @access all
const createClass = asyncHandler(async (req, res) => {
  const { kelas, status } = req.body

  const alreadyClass = await Kelas.findOne({ kelas })

  if (alreadyClass) {
    res.status(400)
    throw new Error('class already used')
  }

  const classes = await Kelas.create({
    kelas,
    status,
  })

  res.status(201).json(classes)
})

// @desc update class
// @route PUT /api/class/:id
// @access all
const updateClass = asyncHandler(async (req, res) => {
  const classes = await Kelas.findById(req.params.id)

  if (classes) {
    classes.status = !classes.status
  } else {
    res.status(404)
    throw new Error('Class not found')
  }

  const updatedClass = await classes.save()
  res.status(200).json(updatedClass)
})

// @desc Delete class
// @route DELETE /api/class/:id
// @access all
const deleteClass = asyncHandler(async (req, res) => {
  const classes = await Kelas.findById(req.params.id)

  if (!classes) {
    res.status(404)
    throw new Error('Class not found')
  }

  await classes.deleteOne()

  res.status(200).json({ success: true })
})

export { getClasses, createClass, updateClass, deleteClass }
