import {Link} from 'react-router-dom'
import {BsArrowLeft} from 'react-icons/bs';

// eslint-disable-next-line react/prop-types
export default function BackButton ({destination = '/'}) {
  return (
    <div className='flex'>
        <Link
            to={destination}
            className='bg-sky-800 text-white px-4 py-1 rounded-lg flex justify-center  w-1/6 lg:w-52'
        >
            <BsArrowLeft className='text-22x1' />
        </Link>
    </div>
  )
}