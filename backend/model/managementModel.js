import mongoose from 'mongoose'

const managementShema = new mongoose.Schema(
  {
    siswa: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Siswa',
    },

    kelas: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Kelas',
    },
  },
  { timestamps: true }
)

const Management = mongoose.model('Management', managementShema)

export default Management
