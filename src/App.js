import './App.css';
import {Routes,Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import TodoApp from './components/TodoApp';
import Auth from './components/Auth';
import Footer from './components/Footer';
import AuthProvider from './provider/AuthProvider';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/todo' element={<TodoApp/>}/>
          <Route path='/auth' element={<Auth/>}/>
        </Routes>
        <Footer></Footer>
      </AuthProvider>
    </div>
  );
}

export default App;
