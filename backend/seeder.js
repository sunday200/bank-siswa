import mongoose from 'mongoose'

import kelas from './data/kelas.js'
import siswa from './data/siswa.js'

import Siswa from './model/siswaModel.js'
import Kelas from './model/kelasModel.js'
import Management from './model/managementModel.js'

import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/db.js'

connectDB() // Connect to MongoDB

const importData = async () => {
  try {
    await Siswa.deleteMany()
    await Kelas.deleteMany()
    await Management.deleteMany()

    await Siswa.insertMany(siswa)
    await Kelas.insertMany(kelas)

    console.log('Data imported')
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Siswa.deleteMany()
    await Kelas.deleteMany()
    await Management.deleteMany()

    console.log('Data destroyted')
  } catch (error) {}
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
