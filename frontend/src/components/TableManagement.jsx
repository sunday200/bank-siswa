import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'

// GET
// DELETE

import { useDeleteManagementMutation } from '../slices/managementsApiSlice'

const TableManagement = ({ data, onRefresh }) => {
  const [isModalOptionOpen, setIsModalOptionOpen] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState(null)
  const optionClickHadler = (e) => {
    setSelectedEntry(null)
    setIsModalOptionOpen((state) => !state)
    setSelectedEntry(e)
  }

  const [deleteManagement] = useDeleteManagementMutation()

  const onDeleteHandler = async (e) => {
    try {
      await deleteManagement(e._id).unwrap()
      toast.success('Berhasil Menghapus Kelas')
      setIsModalOptionOpen(false)
      onRefresh()
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }

  return (
    <div className=''>
      <table className='w-full divide-y divide-gray-200 '>
        <thead className='bg-gray-50'>
          <tr>
            <th
              scope='col'
              className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
            >
              No
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
            >
              Nama Siswa
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
            >
              Email
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
            >
              Kelas
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
            >
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {data?.management?.map((entry, index) =>
            entry.kelas.status ? (
              <tr key={index}>
                <td className='px-6 py-4 whitespace-nowrap'>{index + 1}</td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  {entry.siswa.nama}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  {entry.siswa.email}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  {entry.kelas.kelas}
                </td>

                <td className='px-6 py-4 whitespace-nowrap'>
                  <button onClick={() => optionClickHadler(entry)}>***</button>
                  {isModalOptionOpen && entry._id === selectedEntry._id ? (
                    <div className='absolute bg-white rounded-lg'>
                      <div className='flex flex-col items-start px-5 py-2'>
                        <button
                          onClick={() => onDeleteHandler(entry)}
                          className=''
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
            ) : null
          )}
        </tbody>
      </table>
    </div>
  )
}

export default TableManagement
