import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'
import bg from '../assets/bg.jfif'
import Toast from '../components/Toast'
import { useToast } from '../hooks/useToast'

const Login = () => {
    const navigate = useNavigate()
    const { toast, showToast, hideToast } = useToast()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)

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
                showToast('Login realizado com sucesso!', 'success')
                localStorage.setItem('user', JSON.stringify(user))
                if (rememberMe) {
                    localStorage.setItem('rememberMe', 'true')
                }
                setTimeout(() => {
                    navigate('/dashboard')
                }, 1500)
            } else {
                showToast('Email ou senha incorretos.', 'error')
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error)
            showToast('Erro ao fazer login. Verifique se o servidor está rodando.', 'error')
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
            {toast && <Toast {...toast} onClose={hideToast} />}
            
            <div className="bg-gray-900/85 backdrop-blur-md p-10 rounded-2xl w-11/12 max-w-sm shadow-2xl text-white text-center animate-fade-in">
                <h1 className='text-4xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'>
                    Login
                </h1>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="relative flex items-center rounded-lg h-14 overflow-hidden bg-white/10 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 focus-within:bg-white/15 focus-within:border-white/40 focus-within:ring-2 focus-within:ring-white/20">
                        <div className="absolute left-4 text-white/60">
                            <FiMail size={20} />
                        </div>
                        <input
                            className='bg-transparent border-none outline-none text-white text-lg grow px-4 pl-12 placeholder:text-white/50 focus:placeholder:text-white/70 transition-colors'
                            type="email"
                            placeholder="E-mail"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="relative flex items-center rounded-lg h-14 overflow-hidden bg-white/10 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 focus-within:bg-white/15 focus-within:border-white/40 focus-within:ring-2 focus-within:ring-white/20">
                        <div className="absolute left-4 text-white/60">
                            <FiLock size={20} />
                        </div>
                        <input
                            className='bg-transparent border-none outline-none text-white text-lg grow px-4 pl-12 pr-12 placeholder:text-white/50 focus:placeholder:text-white/70 transition-colors'
                            type={showPassword ? "text" : "password"}
                            placeholder="Senha"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 text-white/60 hover:text-white transition-colors p-1"
                        >
                            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                        </button>
                    </div>

                    <div className="flex items-center justify-start my-2 text-sm">
                        <label className="flex items-center cursor-pointer group">
                            <input
                                type="checkbox"
                                id="lembrar"
                                name="lembrar"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="sr-only"
                            />
                            <div className={`relative w-5 h-5 rounded border-2 transition-all duration-200 ${
                                rememberMe 
                                    ? 'bg-gradient-to-br from-blue-500 to-purple-600 border-transparent' 
                                    : 'bg-transparent border-white/30 group-hover:border-white/50'
                            }`}>
                                {rememberMe && (
                                    <svg className="absolute inset-0.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </div>
                            <span className="ml-2 text-white/80 group-hover:text-white transition-colors">Lembrar dispositivo</span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="relative bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white w-full py-4 border-none rounded-xl text-xl font-semibold cursor-pointer hover:shadow-2xl hover:shadow-black/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden group"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            {loading && (
                                <svg className="animate-spin-slow h-5 w-5" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            )}
                            {loading ? 'Entrando...' : 'Login'}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    </button>
                </form>

                <div className="mt-6 text-sm text-white/70">
                    <p>Não tem conta?
                        <a 
                            className='text-white decoration-none font-semibold ml-1 hover:underline cursor-pointer transition-all hover:text-white' 
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