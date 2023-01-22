import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './routes/Home.jsx'
import Login from './routes/Login.jsx'
import SignUp from './routes/SignUp.jsx'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/cadastro' element={<SignUp />} />
                <Route path='/home' element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App