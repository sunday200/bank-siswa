import { Link } from 'react-router-dom'

const PaginateKelas = ({ pages, page, keyword = '', amountData }) => {
  return (
    pages > 1 && (
      <nav className='flex justify-start'>
        <ul className='flex justify-center mx-0 mt-1'>
          {[...Array(pages).keys()].map((x) => (
            <li key={x + 1} className=''>
              <Link
                to={
                  // keyword
                  //   ? `/search/${keyword}/page/${x + 1}`
                  //   : amountData
                  //   ? `/amountData/${amountData}/page/${x + 1}`
                  //   : `/page/${x + 1}`

                  keyword && amountData
                    ? `/kelas/search/${keyword}/amountData/${amountData}/page/${
                        x + 1
                      }`
                    : keyword
                    ? `/kelas/search/${keyword}/page/${x + 1}`
                    : amountData
                    ? `/kelas/amountData/${amountData}/page/${x + 1}`
                    : `/kelas/page/${x + 1}`
                }
                className={` ${
                  x + 1 === page
                    ? 'px-2 py-1 rounded bg-gray-400 text-slate-900'
                    : 'px-2 py-1 rounded bg-gray-100 text-slate-900'
                }`}
              >
                {x + 1}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    )
  )
}

export default PaginateKelas
