import { useState } from 'react'
import {
  useEditStudentMutation,
  useCreateStudentMutation,
} from '../slices/studentsApiSlice'
import { toast } from 'react-toastify'
const Modal = ({ clickCloseModal, value }) => {
  const [dataForm, setDataForm] = useState(
    value || {
      nama: '',
      email: '',
      tempat_lahir: '',
      kelamin_jenis: '',
      alamat: '',
      nisn: '',
      telepon: '',
      tanggal_lahir: '',
      agama: '',
    }
  )

  const [editStudent, { isLoading: isLoadingEdit }] = useEditStudentMutation()
  const [addStudent, { isLoading: isLoadingAdd }] = useCreateStudentMutation()

  const onChange = (e) => {
    setDataForm((state) => ({
      ...state,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (value?._id) {
      try {
        await editStudent(dataForm).unwrap()
        toast.success('Berhasil ubah siswa')
        !isLoadingEdit && clickCloseModal() // di parrent
      } catch (error) {
        toast.error(error?.data?.message || error.error)
      }
    } else {
      try {
        await addStudent(dataForm).unwrap()
        !isLoadingAdd && clickCloseModal() // di parrent
        // clickCloseModal()
        toast.success('Berhasil tambah siswa')
      } catch (error) {
        toast.error(error?.data?.message || error.error)
        console.log(error)
      }
    }
  }

  return (
    <div className='absolute top-0 right-0 flex justify-center w-full h-full bg-gray-200 bg-opacity-70'>
      <div className='absolute flex justify-center w-full h-fit top-8'>
        {/* Modal */}
        <div className='absolute z-10 bg-white border-2 border-red-100 rounded-lg pb-44 w-fit'>
          {/* Button Close */}
          <button onClick={clickCloseModal} className='absolute top-0 right-2'>
            x
          </button>
          {/* Form */}
          <form
            onSubmit={onSubmitHandler}
            className='flex items-start p-3 pt-4'
          >
            <div className='mr-8 space-y-3'>
              <div className='flex flex-col'>
                <label htmlFor='name'>Nama</label>
                <input
                  id='nama'
                  type='text'
                  className='px-2 py-2 border rounded-[10px] w-[522px] text-base outline-none'
                  placeholder='Masukan Nama'
                  required
                  onChange={onChange}
                  value={dataForm?.nama}
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor='email '>E-Mail</label>
                <input
                  id='email'
                  type='email'
                  className='px-2 py-2 border rounded-lg'
                  placeholder='Masukan Alamat Email'
                  required
                  onChange={onChange}
                  value={dataForm?.email}
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor='tempat_lahir'>Tempat Lahir</label>
                <input
                  id='tempat_lahir'
                  type='text'
                  className='px-2 py-2 border rounded-lg'
                  placeholder='Masukan tempat lahir'
                  required
                  onChange={onChange}
                  value={dataForm?.tempat_lahir}
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor='jenis_kelamin' className='block'>
                  Jenis Kelamin
                </label>
                <select
                  name='jumlah'
                  id='kelamin_jenis'
                  className='w-full px-2 py-2 border rounded-lg'
                  required
                  onChange={onChange}
                  value={dataForm?.kelamin_jenis}
                >
                  <option value='' disabled className='text-gray-400' hidden>
                    Pilih Jenis Kelamin
                  </option>
                  <option value='laki-laki'>Laki-Laki</option>
                  <option value='wanita'>Wanita</option>
                </select>
              </div>

              <div className='relative flex flex-col'>
                <label htmlFor='alamat' className=''>
                  Alamat
                </label>
                <textarea
                  id='alamat'
                  type='text'
                  className='absolute px-2 py-2  top-6 border rounded-lg w-[1076px] h-[115px]'
                  placeholder='Masukan Alamat'
                  required
                  onChange={onChange}
                  value={dataForm?.alamat}
                />
              </div>
            </div>

            <div className='space-y-3'>
              <div className='flex flex-col'>
                <label htmlFor='nisn'>NISN</label>
                <input
                  id='nisn'
                  type='number'
                  className='px-2 py-2 border rounded-lg w-[522px] outline-none'
                  placeholder='Masukan NISN'
                  required
                  onChange={onChange}
                  value={dataForm?.nisn}
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor='telepon'>Telepon</label>
                <input
                  id='telepon'
                  type='number'
                  className='px-2 py-2 border rounded-lg'
                  placeholder='Masukan Nomer Telepon'
                  required
                  onChange={onChange}
                  value={dataForm?.telepon}
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor='tanngal_lahir'>Tanggal Lahir</label>
                <input
                  id='tanggal_lahir'
                  type='date'
                  className='px-2 py-2 border rounded-lg'
                  placeholder='dd/mm/yy'
                  required
                  onChange={onChange}
                  value={dataForm?.tanggal_lahir?.slice(0, 10)}
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor='agama'>Agama</label>
                <select
                  id='agama'
                  className='w-full px-2 py-2 border rounded-lg'
                  required
                  onChange={onChange}
                  value={dataForm?.agama}
                >
                  <option value='' disabled className='text-gray-400' hidden>
                    Pilih Agama
                  </option>
                  <option value='islam'>Islam</option>
                  <option value='kristen'>Kristen</option>
                  <option value='hindu'>Hindu</option>
                  <option value='budha'>Budha</option>
                  <option value='lainnya'>Lainnya</option>
                </select>
              </div>
            </div>

            <button
              type='submit'
              disabled={isLoadingEdit && true}
              className='absolute bottom-4 right-3 p-2 border rounded-lg bg-[#4C7DE7] text-white'
            >
              {value === 'tambahSiswa' ? 'Tambah Siswa' : 'Simpan Perubahan'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Modal
