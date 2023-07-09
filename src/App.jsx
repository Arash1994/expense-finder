import './App.css'
import Cities from './screens/Cities'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import CityDetails from './screens/CityDetails';
import ResponsiveAppBar from './components/ResponsiveAppBar'



function App() {

  return (

    <Router>
       <ResponsiveAppBar/>
      <Routes>
        <Route exact path='/' element={< Cities />}></Route>
        <Route exact path='/cities/:city/:country' element={< CityDetails />}></Route>
    </Routes> 
  </Router>
    
  )
}

export default App
