import { useState } from 'react'
import {
  useGetStudentsQuery,
  useDeleteStudentMutation,
} from '../slices/studentsApiSlice'
import Modal from './Modal'
import { toast } from 'react-toastify'

const TableSiswa = ({ amountData, pageNumber, keyword }) => {
  const {
    data: students,
    isLoading,
    refetch,
  } = useGetStudentsQuery({ amountData, pageNumber, keyword })
  const [deletedSiswa] = useDeleteStudentMutation()

  const [modalOpen, setModalOpen] = useState(false)
  const [isModalOptionOpen, setIsModalOptionOpen] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState(null)
  const optionClickHadler = (e) => {
    setSelectedEntry(null)
    setIsModalOptionOpen((state) => !state)
    setSelectedEntry(e)
  }

  const clickCloseModal = () => {
    setModalOpen(false)
    refetch()
  }

  const onDeleteHandler = async (e) => {
    try {
      deletedSiswa(e._id)
      toast.success('Berhasil Menghapus Siswa')
      refetch()
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }

  // Edit siswa
  const onEditHandler = async (e) => {
    setModalOpen(true)
    setIsModalOptionOpen(false)
  }

  return (
    <>
      {modalOpen && (
        <Modal clickCloseModal={clickCloseModal} value={selectedEntry} />
      )}

      <div className='flex justify-center w-full overflow-x-auto'>
        <table className='w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50 '>
            <tr>
              <th
                scope='col'
                className='px-2 py-3 w-14  text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
              >
                No
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
              >
                Nama
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
              >
                NISN
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
              >
                E-Mail
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
              >
                Telepon
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
              ></th>
            </tr>
          </thead>
          {
            <tbody className='bg-white divide-y divide-gray-200'>
              {isLoading ? (
                <tr>
                  <td>loading</td>
                </tr>
              ) : (
                students.students.map((entry, index) => (
                  <tr key={index}>
                    <td className='px-2 py-3 '>{index + 1}</td>
                    <td className='px-6 py-3 max-w-[200px] truncate'>
                      {entry.nama}
                    </td>
                    <td className='px-6 py-3  '>{entry.nisn}</td>
                    <td className='px-6 py-3  truncate'>{entry.email}</td>
                    <td className='px-6 py-3  '>{entry.telepon}</td>
                    <td className='px-6 py-3  w-1/12'>
                      <button onClick={() => optionClickHadler(entry)}>
                        ***
                      </button>
                      {isModalOptionOpen && entry._id === selectedEntry._id ? (
                        <div className='absolute bg-white rounded-lg'>
                          <div className='flex flex-col items-start px-5 py-2'>
                            <button
                              onClick={() => onEditHandler(entry)}
                              className=''
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => onDeleteHandler(entry)}
                              className=' mt-4'
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ) : (
                        ''
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          }
        </table>
      </div>
    </>
  )
}

export default TableSiswa
