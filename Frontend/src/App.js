import logo from './logo.svg';
import './App.css';
import Home from './Home';
import {BrowserRouter, Route, Routes,Navigate} from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<Navigate to="/home"/>} path="/" />
          <Route element={<Home/>} path="home" />
        </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;
