import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { memo } from 'react'

const Search = (value) => {
  const navigate = useNavigate()
  const { keyword: urlKeyword } = useParams()
  const [text, setText] = useState(urlKeyword || '')

  const { pathname } = useLocation()

  const onSearchHandler = (e) => {
    e.preventDefault()

    if (text === '') {
      if (pathname.includes('setting')) {
        navigate('/setting-siswa')
      } else if (pathname.includes('kelas')) {
        navigate('/kelas')
      } else {
        navigate('/')
      }
      // !value ? navigate('/') : navigate('/kelas')
    } else {
      if (pathname.includes('setting')) {
        navigate(`/setting-siswa/search/${text.trim()}`)
      } else if (pathname.includes('kelas')) {
        navigate(`/kelas/search/${text.trim()}`)
      } else {
        navigate(`/search/${text.trim()}`)
      }
      // !value
      //   ? navigate(`/search/${text.trim()}`)
      //   : navigate(`/kelas/search/${text.trim()}`)

      setText('')
    }
  }

  return (
    <form
      onSubmit={onSearchHandler}
      className='hidden md:flex w-fit lg:w-[500px] md:w-[500px] my-2'
    >
      <input
        type='text'
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='Pencarian ...'
        className='w-full px-2 rounded-lg shadow outline-none'
      />
      <button type='submit' className='p-2 ml-2 rounded shadow '>
        <div className='px-2 py-1'>
          <FaSearch className='text-xl' />
        </div>
      </button>
    </form>
  )
}

export default memo(Search)
