import { Route, Routes } from 'react-router-dom';
// import './App.css';
import Home from './pages/Home';
// import '../App.css'
// import Animation from './pages/Animation';
import About from './pages/About';
import Contact from './pages/Contact';
import ScrollAnimation from './pages/ScrollAnimation';
import SingleVideo from './pages/SingleVideo';

function App() {
  return (
    <div className="App">
       <div className="App">
       <Routes>
         <Route path='/' element={<Home/>} />
         <Route path='/about' element={<About/>} />
         <Route path='/contact' element={<Contact/>} />
         {/* <Route path='/animation' element={<Animation/>} /> */}
         <Route path='/custom' element={<ScrollAnimation/>}/>
         <Route path='/single' element={<SingleVideo/>}/>
       </Routes>
     </div>
    </div>
  );
}

export default App;
