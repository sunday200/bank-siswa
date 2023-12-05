import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams, useLocation } from 'react-router-dom'

const Header = () => {
  const { pathname } = useLocation()

  return (
    <div className='bg-slate-200 shadow-sm'>
      <div className='border container mx-auto'>
        <div className='flex p-3 justify-center space-x-5'>
          <Link to='/' className={pathname === '/' ? `text-blue-700` : ``}>
            Siswa
          </Link>
          <Link
            to='/kelas'
            className={pathname === '/kelas' ? `text-blue-700` : ``}
          >
            Kelas
          </Link>
          <Link
            to='/setting-siswa'
            className={pathname === '/setting-siswa' ? `text-blue-700` : ``}
          >
            Setting siswa
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header
