import { createRoot } from 'react-dom/client';
import './index.css';
import Home from './views/Home/Home.jsx';
import NewTodo from './views/NewTodo/NewTodo.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/new" element={<NewTodo/>} />
    </Routes>
  </BrowserRouter>
);