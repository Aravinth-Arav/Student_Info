import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Form } from './components/form';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserData from './components/details';

function App() {
  return (
   <>
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Form/>}/>
    <Route path='/details' element={<UserData/>}/>
   </Routes>
   </BrowserRouter>
   </>
  );
}

export default App;
