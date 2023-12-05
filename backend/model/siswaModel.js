import mongoose from 'mongoose'

const siswaSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    tempat_lahir: {
      type: String,
      required: false,
    },
    kelamin_jenis: {
      type: String,
      required: false,
    },
    alamat: {
      type: String,
      required: false,
    },
    nisn: {
      type: String,
      required: false,
      unique: true,
    },
    telepon: {
      type: String,
      required: false,
    },
    tanggal_lahir: {
      type: Date,
      required: false,
    },
    agama: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
)

const Siswa = mongoose.model('Siswa', siswaSchema)

export default Siswa
