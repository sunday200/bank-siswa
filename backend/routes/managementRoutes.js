import express from 'express'
const router = express.Router()

import {
  createManagementStudents,
  getManagementStudents,
  deleteManagement,
} from '../controllers/managementModel.js'

router.route('/').get(getManagementStudents).post(createManagementStudents)
router.route('/:id').delete(deleteManagement)

export default router
