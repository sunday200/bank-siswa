// src/components/Table.js
import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'

// GET
// DELETE
import {
  useEditClassesMutation,
  useDeleteClassesMutation,
} from '../slices/classesApiSlice'

const TableKelas = ({ data }) => {
  const [isModalOptionOpen, setIsModalOptionOpen] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState(null)
  const optionClickHadler = (e) => {
    setSelectedEntry(null)
    setIsModalOptionOpen((state) => !state)
    setSelectedEntry(e)
  }

  const [deleteKelas] = useDeleteClassesMutation()
  const [updateKelas] = useEditClassesMutation()

  const onDeleteHandler = async (e) => {
    console.log(e)
    try {
      await deleteKelas(e._id)
      toast.success('Berhasil Menghapus Kelas')
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }

  // Edit siswa
  const onEditHandler = async (e) => {
    try {
      await updateKelas(e._id)
      toast.success('Berhasil Mengubah Status Kelas')
      setIsModalOptionOpen(false)
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }

  return (
    <div>
      <div className='pb-2'>
        <h1 className='text-xl font-medium'>Manajemen Siswa</h1>
      </div>
      <table className='w-full divide-y divide-gray-200'>
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
              Nama Kelas
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
            >
              Status
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
          {data?.classes.map((entry, index) => (
            <tr key={index}>
              <td className='px-6 py-4 whitespace-nowrap'>{index + 1}</td>
              <td className='px-6 py-4 whitespace-nowrap'>{entry.kelas}</td>
              <td
                className={`px-6 py-4 whitespace-nowrap ${
                  entry.status === true ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {entry.status === true ? 'Aktif' : 'Tidak Aktif'}
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                <button onClick={() => optionClickHadler(entry)}>***</button>
                {isModalOptionOpen && entry._id === selectedEntry._id ? (
                  <div className='absolute border bg-white rounded-lg'>
                    <div className='flex flex-col items-start px-5 py-2'>
                      <button onClick={() => onEditHandler(entry)} className=''>
                        Ubah Status
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
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableKelas
