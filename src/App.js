import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NovaEntrada from './routes/Entrada.jsx'
import Home from './routes/Home.jsx'
import Login from './routes/Login.jsx'
import NovaSaida from './routes/Saida.jsx'
import SignUp from './routes/SignUp.jsx'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/cadastro' element={<SignUp />} />
                <Route path='/home' element={<Home />} />
                <Route path='/nova-entrada' element={<NovaEntrada />} />
                <Route path='/nova-saida' element={<NovaSaida />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App