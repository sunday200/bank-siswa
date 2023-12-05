import mongoose from 'mongoose'

const kelasSchema = new mongoose.Schema(
  {
    kelas: {
      type: String,
      required: true,
    },

    status: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
)

const Kelas = mongoose.model('Kelas', kelasSchema)

export default Kelas
