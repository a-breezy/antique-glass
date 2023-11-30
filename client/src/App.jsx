import React from 'react';
import {Routes, Route} from 'react-router-dom';

import CreateGlass from './pages/CreateGlass'
import DeleteGlass from './pages/DeleteGlass'
import EditGlass from './pages/EditGlass'
import ShowGlass from './pages/ShowGlass'
import Home from './pages/Home'

export const App = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/glass/create' element={<CreateGlass />} />
        <Route path='/glass/details/:id' element={<ShowGlass />} />
        <Route path='/glass/edit/:id' element={<EditGlass />} />
        <Route path='/glass/delete/:id' element={<DeleteGlass />} />
    </Routes>
    // <div className='bg-red-400 text-white'>App</div>
  )
}

export default App;