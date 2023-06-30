import './App.css';
import {Routes,Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import TodoApp from './components/TodoApp';
import Auth from './components/Auth';
import Footer from './components/Footer';
function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/todo' element={<TodoApp/>}/>
        <Route path='/auth' element={<Auth/>}/>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
