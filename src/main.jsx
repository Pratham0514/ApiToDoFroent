import { createRoot } from 'react-dom/client';
import './index.css';
import Home from './views/Home/Home.jsx';
import NewTodo from './views/NewTodo/NewTodo.jsx';
import Edittodo from './views/NewTodo/Edittodo.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/new" element={<NewTodo/>} />
      <Route path="/edit/:id" element={<Edittodo/>} />
    </Routes>
  </BrowserRouter>
);