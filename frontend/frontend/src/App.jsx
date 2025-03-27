import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import User from './components/User'
import Createuser from './components/Createuser'
import Updateuser from './components/Updateuser'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<User/>} />
      <Route path="/create" element={<Createuser/>} />
      <Route path="/update/:id" element={<Updateuser/>} />
    </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
