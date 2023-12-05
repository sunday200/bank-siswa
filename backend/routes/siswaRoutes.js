import express from 'express'
const router = express.Router()

import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from '../controllers/siswaController.js'

router.route('/').get(getStudents).post(createStudent)
router.route('/:id').put(updateStudent).delete(deleteStudent)

export default router
