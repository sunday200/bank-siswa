import express from 'express'
const router = express.Router()

import {
  getClasses,
  createClass,
  updateClass,
  deleteClass,
} from '../controllers/kelasController.js'

router.route('/').get(getClasses).post(createClass)
router.route('/:id').put(updateClass).delete(deleteClass)

export default router
