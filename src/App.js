import { Route, Routes } from 'react-router-dom';
// import './App.css';
import Home from './pages/Home';
// import '../App.css'
// import Animation from './pages/Animation';
import About from './pages/About';
import Contact from './pages/Contact';
import SingleVideo from './pages/SingleVideo';
import ScrollHolder from './pages/ScrollHolder';
import NavbarTesting from './pages/NavbarTesting';
import Controller from './pages/Controller';

function App() {
  return (
    <div className="App">
       <div className="App">
       <Routes>
         <Route path='/' element={<Home/>} />
         <Route path='/about' element={<About/>} />
         <Route path='/contact' element={<Contact/>} />
         
         <Route path='/single' element={<SingleVideo/>}/>
         {/* <Route path='/scroll' element={<Scroll/>}/> */}
         <Route path='/scroll' element={<ScrollHolder/>}/>
         <Route path='/navbarTesting' element={<NavbarTesting/>}/>
         <Route path='/controller' element={<Controller/>}/>
       </Routes>
     </div>
    </div>
  );
}

export default App;
