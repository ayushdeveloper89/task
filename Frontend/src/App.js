import './App.css';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Form from './Pages/Form/Form';
import ViewItems from './Pages/ViewItems/ViewItems';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={< Form />}></Route>
        <Route exact path='/viewItemList' element={< ViewItems />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
