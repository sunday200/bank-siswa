import React from 'react'
import { useState } from 'react'
import TableManagement from '../components/TableManagement'
import Search from '../components/Search'
import { toast } from 'react-toastify'
import { useParams, useNavigate } from 'react-router-dom'
import PaginateManagement from '../components/PaginateManagement'

// Kelas
import { useGetClassesQuery } from '../slices/classesApiSlice'

// Siswa
import { useGetStudentsQuery } from '../slices/studentsApiSlice'

// Management
import {
  useGetManagementQuery,
  useCreateManagementMutation,
} from '../slices/managementsApiSlice'

const SettingSiswaScreen = () => {
  const { amountData, pageNumber, keyword, keywordClass } = useParams()
  const navigate = useNavigate()

  // Kelas
  const { data } = useGetClassesQuery({
    amountData: 1000,
  })

  // SIswa
  const { data: dataSiswa } = useGetStudentsQuery({
    amountData: 1000,
  })

  // Management
  const {
    data: getManagement,
    isLoading: isLoadingManagement,
    refetch,
  } = useGetManagementQuery({ amountData, pageNumber, keyword, keywordClass })

  const {
    data: getManagements,
    isLoading: tunggu,
    refetch: refetch2,
  } = useGetManagementQuery({
    amountData: 100,
    pageNumber,
    keyword,
  })

  // console.log(getManagements.management)

  // if (!tunggu && getManagements?.management?.length !== 0) {
  //   ;[...new Set(getManagements.management.map((x) => x.kelas.kelas))].map(
  //     (x) => console.log(x)
  //   )
  // }

  const [postManagement] = useCreateManagementMutation()

  let idSiswaAdded = []

  getManagements?.management?.map((x) => idSiswaAdded.push(x.siswa._id))

  // if (!isLoadingSiswa) {
  //   console.log(dataSiswa?.students)
  // }

  const [dataForm, setDataForm] = useState({
    siswa: '',
    kelas: '',
  })

  const siswa = dataForm.siswa
  const kelas = dataForm.kelas

  // console.log(dataForm)
  const onChange = (e) => {
    setDataForm((state) => ({
      ...state,
      [e.target.id]: e.target.value,
    }))
  }

  const onRefresh = () => {
    refetch()
    refetch2()
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    console.log(dataForm)
    try {
      await postManagement(dataForm).unwrap()
      toast.success('Berhasil Menambahkan')
      refetch()
      refetch2()
      setDataForm({
        siswa: '',
        kelas: '',
      })
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }

  const onChangeClass = (e) => {
    navigate(`/setting-siswa/${e.target.value}`)
  }

  return (
    <div>
      {' '}
      <div>
        <div className='flex justify-center'>
          <Search value={'management'} />
        </div>
        <div className='flex mx-16'>
          <div className='w-2/3'>
            <div className='flex justify-between pb-2'>
              <h1 className='text-xl font-medium'>Manajemen Siswa</h1>
              <div className='flex flex-col'>
                {!tunggu && (
                  <select
                    name='kelas'
                    id='kelas'
                    className='w-full px-2 py-2 border rounded-lg'
                    required
                    onChange={onChangeClass}
                  >
                    <option className=' text-gray-100' value={''}>
                      Pilih kelas
                    </option>
                    {[
                      ...new Set(
                        getManagements.management.map((x) =>
                          x.kelas.status ? x.kelas.kelas : ''
                        )
                      ),
                    ].map((x, index) => (
                      <option key={index} value={x}>
                        {x}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
            {!isLoadingManagement && (
              <TableManagement data={getManagement} onRefresh={onRefresh} />
            )}
            <div className='my-2 flex justify-between'>
              <form className='flex justify-between'>
                <label htmlFor='lang'>Show</label>
                <select
                  name='jumlah'
                  id=''
                  onChange={(e) => {
                    keyword
                      ? navigate(
                          `/setting-siswa/search/${keyword}/amountData/${e.target.value}`
                        )
                      : navigate(`/setting-siswa/amountData/${e.target.value}`)
                  }}
                  className='text-sm border-2 rounded outline-none mx-2'
                  value={getManagement?.management?.length}
                >
                  {[...Array(getManagement?.count).keys()].map((x) => (
                    <option key={x} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
                <span>enteries</span>
              </form>

              <PaginateManagement
                pages={getManagement?.pages}
                page={getManagement?.page}
                keyword={keyword}
                amountData={amountData}
              />
            </div>
          </div>
          <div className='w-1/3 ml-20'>
            <div>
              <h1 className='text-2xl my-3 mx-3 font-medium'>Tambah Siswa</h1>
              <div className=' bg-white border-1  rounded-lg'>
                <form
                  onSubmit={onSubmitHandler}
                  className='flex flex-col p-3 pt-4'
                >
                  <div className='space-y-3'>
                    <div className='flex flex-col'>
                      <label htmlFor='status' className='block font-medium'>
                        Siswa
                      </label>
                      <select
                        name='siswa'
                        id='siswa'
                        className='w-full px-2 py-2 border rounded-lg'
                        required
                        onChange={onChange}
                        value={siswa}
                      >
                        <option className='hidden'>Masukan Siswa</option>
                        {dataSiswa?.students?.map((x) =>
                          !idSiswaAdded.includes(x._id) ? (
                            <option key={x._id} value={x._id}>
                              {x.nama}
                            </option>
                          ) : (
                            ''
                          )
                        )}
                      </select>
                    </div>
                    <div className='flex flex-col'>
                      <label htmlFor='status' className='block font-medium'>
                        Kelas
                      </label>
                      <select
                        name='kelas'
                        id='kelas'
                        className='w-full px-2 py-2 border rounded-lg'
                        required
                        onChange={onChange}
                        value={kelas}
                      >
                        <option className='hidden text-gray-100'>
                          Masukan Kelas
                        </option>
                        {data?.classes.map((x) =>
                          x.status === true ? (
                            <option key={x._id} value={x._id}>
                              {x.kelas}
                            </option>
                          ) : (
                            ''
                          )
                        )}
                      </select>
                    </div>
                  </div>
                  <button
                    type='submit'
                    className='relative mt-28 bottom-0 p-2 border rounded-lg bg-[#4C7DE7] text-white w-full'
                  >
                    Simpan
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingSiswaScreen
