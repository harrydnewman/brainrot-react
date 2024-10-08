import { Route, Routes } from 'react-router-dom';
// import './App.css';
import Home from './pages/Home';
// import '../App.css'
// import Animation from './pages/Animation';
import About from './pages/About';
import Contact from './pages/Contact';
import SingleVideo from './pages/SingleVideo';
import Scroll from './pages/Scroll';
import ScrollTest from './pages/ScrollTest';

function App() {
  return (
    <div className="App">
       <div className="App">
       <Routes>
         <Route path='/' element={<Home/>} />
         <Route path='/about' element={<About/>} />
         <Route path='/contact' element={<Contact/>} />
         
         <Route path='/single' element={<SingleVideo/>}/>
         <Route path='/scroll' element={<Scroll/>}/>
         <Route path='/scrolltest' element={<ScrollTest/>}/>
       </Routes>
     </div>
    </div>
  );
}

export default App;
