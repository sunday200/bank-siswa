import { useState } from 'react'
import {} from 'react-icons/fa'
import Modal from '../components/Modal'
import TableSiswa from '../components/TableSiswa'
import Paginate from '../components/Paginate'
import { useParams, useNavigate } from 'react-router-dom'
import Search from '../components/Search'

import { useGetStudentsQuery } from '../slices/studentsApiSlice'

const SiswaScreen = () => {
  const { amountData, pageNumber, keyword } = useParams()
  const { data } = useGetStudentsQuery({
    amountData,
    pageNumber,
    keyword,
  })

  const [isOpen, setIsOpen] = useState(false)

  const navigate = useNavigate()

  // Open Modal | Tambah SIswa
  const clickAddHandler = async () => {
    setIsOpen(true)
  }

  // Close Modal
  const clickCloseModal = () => {
    setIsOpen(false)
  }

  return (
    <div className=''>
      {/* Modal */}
      {isOpen && <Modal clickCloseModal={clickCloseModal} />}
      <div className='container mx-auto '>
        {/* Search */}
        <div className='flex lg:mx-24 justify-end'>
          <Search />
        </div>

        {/* Kotak intinya */}
        <div>
          <div className='px-4 lg:mx-14 bg-white rounded-lg'>
            {/* Kepala Kotak */}
            <div className='flex justify-between py-2'>
              <h1 className='text-xl font-medium'>Daftar Siswa</h1>
              <button
                onClick={clickAddHandler}
                className='px-2 py-1 text-white bg-blue-400 border rounded-lg hover:bg-blue-500'
              >
                <span>+ Tambah Siswa</span>
              </button>
            </div>
            {/* Kotak inti */}
            <div className='container mx-auto'>
              <TableSiswa
                amountData={amountData}
                pageNumber={pageNumber}
                keyword={keyword}
              />
              <div className='flex justify-between my-2 items-center'>
                <form className='flex justify-between'>
                  <label htmlFor='lang'>Show</label>
                  <select
                    name='jumlah'
                    id=''
                    onChange={(e) => {
                      keyword
                        ? navigate(
                            `/search/${keyword}/amountData/${e.target.value}`
                          )
                        : navigate(`/amountData/${e.target.value}`)
                    }}
                    className='text-sm border-2 rounded outline-none mx-2'
                    value={data?.students?.length}
                  >
                    {[...Array(data?.count).keys()].map((x) => (
                      <option key={x} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                  <span>enteries</span>
                </form>

                <Paginate
                  pages={data?.pages}
                  page={data?.page}
                  keyword={keyword}
                  amountData={amountData}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SiswaScreen
