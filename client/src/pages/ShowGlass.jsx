// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

export default function ShowGlass() {
  const [glass, setGlass] = useState({});
  const [loading, setLoading] = useState(false);
  const {id} = useParams();

  useEffect(()=> {
    setLoading(true);
    axios
      .get(`http://localhost:5555/glass/${id}`)
      .then((res) => {
        setGlass(res.data);
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false);
      })
  }, []);

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3x1 my-4'>
        ShowGlass
      </h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-x11 w-fit p-4'>
          <div className='my-4'>
            <span className='text-x1 mr-4 text-gray-500'>ID</span>
            <span>{glass._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-x1 mr-4 text-gray-500'>Title</span>
            <span>{glass.title}</span>
          </div>
          <div className='my-4'>
            <span className='text-x1 mr-4 text-gray-500'>Quantity</span>
            <span>{glass.quantity}</span>
          </div>
          <div className='my-4'>
            <span className='text-x1 mr-4 text-gray-500'>Price</span>
            <span>{glass.price}</span>
          </div>
          <div className='my-4'>
            <span className='text-x1 mr-4 text-gray-500'>Availability</span>
            {/* {console.log(typeof glass.availability.toString())} */}
            <span>
              {glass.availability ? (
                'true'
              ) : (
                'false'
              )}
            </span>
          </div>
          <div className='my-4'>
            <span className='text-x1 mr-4 text-gray-500'>Created At</span>
            <span>{new Date(glass.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-x1 mr-4 text-gray-500'>Last Update</span>
            <span>{new Date(glass.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  )
}
