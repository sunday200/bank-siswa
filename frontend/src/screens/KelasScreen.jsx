import { useState } from 'react'
import TableKelas from '../components/TableKelas'
import Search from '../components/Search'
import { toast } from 'react-toastify'
import { useParams, useNavigate } from 'react-router-dom'
import PaginateKelas from '../components/PaginateKelas'

import {
  useGetClassesQuery,
  useCreateClassMutation,
} from '../slices/classesApiSlice'

const KelasScreen = () => {
  const { amountData, pageNumber, keyword } = useParams()
  const navigate = useNavigate()

  const { data } = useGetClassesQuery({
    amountData,
    pageNumber,
    keyword,
  })
  const [postClass] = useCreateClassMutation()

  const [dataForm, setDataForm] = useState({
    kelas: '',
    status: false,
  })

  const onChange = (e) => {
    setDataForm((state) => ({
      ...state,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    const a = await postClass(dataForm)
    if (a.error) {
      toast.error(a.error?.data?.message || a.error.error)
    } else {
      toast.success('berhasil')
      setDataForm({
        kelas: '',
        status: false,
      })
    }
  }

  return (
    <div>
      <div className='flex justify-center'>
        <Search value={'kelas'} />
      </div>
      <div className='flex mx-16'>
        <div className='w-2/3'>
          <TableKelas data={data} />
          <div className='my-2 flex justify-between'>
            <form className='flex justify-between'>
              <label htmlFor='lang'>Show</label>
              <select
                name='jumlah'
                id=''
                onChange={(e) => {
                  keyword
                    ? navigate(
                        `/kelas/search/${keyword}/amountData/${e.target.value}`
                      )
                    : navigate(`/kelas/amountData/${e.target.value}`)
                }}
                className='text-sm border-2 rounded outline-none mx-2'
                value={data?.classes?.length}
              >
                {[...Array(data?.count).keys()].map((x) => (
                  <option key={x} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
              <span>enteries</span>
            </form>
            <PaginateKelas
              pages={data?.pages}
              page={data?.page}
              keyword={keyword}
              amountData={amountData}
            />
          </div>
        </div>
        <div className='w-1/3 ml-20'>
          <div>
            <h1 className='text-2xl my-3 mx-3 font-medium'>Tambah Kelas</h1>
            <div className=' bg-white border-1  rounded-lg'>
              <form
                onSubmit={onSubmitHandler}
                className='flex flex-col p-3 pt-4'
              >
                <div className='space-y-3'>
                  <div className='flex flex-col'>
                    <label htmlFor='kelas' className='font-medium'>
                      Nama Kelas
                    </label>
                    <input
                      id='kelas'
                      type='text'
                      className='px-2 py-2 border rounded-[10px] text-base outline-none'
                      placeholder='Masukan Kelas'
                      required
                      onChange={onChange}
                      value={dataForm?.kelas}
                    />
                  </div>
                  <div className='flex flex-col'>
                    <label htmlFor='status' className='block font-medium'>
                      Pilih Status
                    </label>
                    <select
                      name='jumlah'
                      id='status'
                      className='w-full px-2 py-2 border rounded-lg'
                      required
                      onChange={onChange}
                      value={dataForm?.status}
                    >
                      <option
                        value=''
                        disabled
                        className='text-gray-400'
                        hidden
                      >
                        Pilih Status
                      </option>
                      <option value={false}>Tidak Aktif</option>
                      <option value={true}>Aktif</option>
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
  )
}

export default KelasScreen
