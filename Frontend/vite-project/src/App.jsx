import {Route, Routes} from 'react-router';

import HomePage from './paginas/HomePage';
import CrearNota from './paginas/CrearNota';
import DetallesNota from './paginas/DetallesNota';


function App() {
  

  return (
   <div data-theme="halloween" className='min-h-screen flex flex-col'>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/crear' element={<CrearNota />}/>
        <Route path='/:id' element={<DetallesNota />}/>
      </Routes>
   </div>
  )
}

export default App
