import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import bg from '../assets/bg.jfif'

const Login = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await fetch('http://localhost:3001/users')
            const users = await response.json()
            
            const user = users.find(u => u.email === formData.email && u.password === formData.password)
            
            if (user) {
                alert('Login realizado com sucesso!')
                // Aqui você pode salvar o usuário no localStorage ou context
                localStorage.setItem('user', JSON.stringify(user))
                // Redirecionar para uma página de dashboard ou home
            } else {
                alert('Email ou senha incorretos.')
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error)
            alert('Erro ao fazer login. Verifique se o servidor está rodando.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <main
            style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7)), url(${bg})`
            }}
            className="w-full h-screen bg-cover bg-center bg-no-repeat flex justify-center items-center"
        >
            <div className="bg-gray-900/85 backdrop-blur-md p-10 rounded-2xl w-11/12 max-w-sm shadow-2xl text-white text-center">
                <h1 className='text-4xl text-white font-bold mb-8'>Login</h1>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex items-center rounded-lg h-14 overflow-hidden bg-white/20">
                        <input
                            className='bg-transparent border-none outline-none text-white text-xl grow px-4 placeholder:text-white/70'
                            type="email"
                            placeholder="E-mail"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="flex items-center rounded-lg h-14 overflow-hidden bg-white/20">
                        <input
                            className='bg-transparent border-none outline-none text-white text-xl grow px-4 placeholder:text-white/70'
                            type="password"
                            placeholder="Senha"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="flex items-center justify-start my-2.5 text-sm">
                        <input
                            type="checkbox"
                            id="lembrar"
                            name="lembrar"
                        />
                        <label htmlFor="lembrar" className="cursor-pointer">Lembrar dispositivo</label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-black text-white w-full py-4 border-none rounded-xl text-2xl font-semibold cursor-pointer hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Entrando...' : 'Login'}
                    </button>
                </form>

                <div className="mt-5 text-sm text-white/70">
                    <p>Não tem conta?
                        <a 
                            className='text-white decoration-none font-semibold ml-1 hover:underline cursor-pointer' 
                            onClick={() => navigate('/cadastro')}
                        >
                            Registre-se
                        </a>
                    </p>
                </div>
            </div>
        </main>
    )
}

export default Login