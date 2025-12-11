import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bg from '../assets/bg.jfif';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        cpf: '',
        email: '',
        password: '',
        cep: '',
        street: '',
        neighborhood: '',
        city: '',
        state: ''
    });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        // Formatação automática do CEP
        if (name === 'cep') {
            const cepFormatted = value.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2');
            setFormData(prev => ({
                ...prev,
                [name]: cepFormatted
            }));
            return;
        }
        
        // Formatação automática do CPF
        if (name === 'cpf') {
            const cpfFormatted = value.replace(/\D/g, '').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            setFormData(prev => ({
                ...prev,
                [name]: cpfFormatted
            }));
            return;
        }
        
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCepBlur = async (e) => {
        const cep = e.target.value.replace(/\D/g, '');
        
        if (cep.length === 8) {
            setLoading(true);
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await response.json();
                
                if (!data.erro) {
                    setFormData(prev => ({
                        ...prev,
                        cep: data.cep,
                        street: data.logradouro || '',
                        neighborhood: data.bairro || '',
                        city: data.localidade || '',
                        state: data.uf || ''
                    }));
                } else {
                    alert('CEP não encontrado. Por favor, verifique o CEP digitado.');
                }
            } catch (error) {
                console.error('Erro ao buscar CEP:', error);
                alert('Erro ao buscar CEP. Tente novamente.');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('http://localhost:3001/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Cadastro realizado com sucesso!');
                navigate('/login');
            } else {
                alert('Erro ao realizar cadastro. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao cadastrar:', error);
            alert('Erro ao realizar cadastro. Verifique se o servidor está rodando.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main
            style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7)), url(${bg})`
            }}
            className="w-full min-h-screen bg-cover bg-center bg-no-repeat flex justify-center items-center py-8 px-4"
        >
            <div className="bg-gray-900/85 backdrop-blur-md p-8 md:p-10 rounded-2xl w-11/12 max-w-2xl shadow-2xl text-white">
                <h1 className='text-4xl text-white font-bold mb-8 text-center'>Cadastro</h1>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    {/* GRUPO 1: Nome e CPF (2 colunas) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center rounded-lg h-14 overflow-hidden bg-white/20">
                            <input
                                className='bg-transparent border-none outline-none text-white text-lg md:text-xl grow px-4 placeholder:text-white/70'
                                type="text"
                                placeholder="Nome*"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="flex items-center rounded-lg h-14 overflow-hidden bg-white/20">
                            <input
                                className='bg-transparent border-none outline-none text-white text-lg md:text-xl grow px-4 placeholder:text-white/70'
                                type="text"
                                placeholder="CPF*"
                                name="cpf"
                                value={formData.cpf}
                                onChange={handleInputChange}
                                maxLength={14}
                                required
                            />
                        </div>
                    </div>

                    {/* GRUPO 2: Email e Senha (2 colunas) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center rounded-lg h-14 overflow-hidden bg-white/20">
                            <input
                                className='bg-transparent border-none outline-none text-white text-lg md:text-xl grow px-4 placeholder:text-white/70'
                                type="email"
                                placeholder="Email*"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="flex items-center rounded-lg h-14 overflow-hidden bg-white/20">
                            <input
                                className='bg-transparent border-none outline-none text-white text-lg md:text-xl grow px-4 placeholder:text-white/70'
                                type="password"
                                placeholder="Senha*"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    {/* GRUPO 3: CEP e Logradouro */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center rounded-lg h-14 overflow-hidden bg-white/20">
                            <input
                                className='bg-transparent border-none outline-none text-white text-lg md:text-xl grow px-4 placeholder:text-white/70'
                                type="text"
                                placeholder="CEP*"
                                name="cep"
                                value={formData.cep}
                                onChange={handleInputChange}
                                onBlur={handleCepBlur}
                                maxLength={9}
                                pattern="[0-9]{5}-[0-9]{3}"
                                required
                            />
                        </div>
                        <div className="flex items-center rounded-lg h-14 overflow-hidden bg-white/20 md:col-span-2">
                            <input
                                className='bg-transparent border-none outline-none text-white text-lg md:text-xl grow px-4 placeholder:text-white/70'
                                type="text"
                                placeholder="Logradouro"
                                name="street"
                                value={formData.street}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    {/* GRUPO 4: Bairro, Cidade e Estado (3 colunas) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center rounded-lg h-14 overflow-hidden bg-white/20">
                            <input
                                className='bg-transparent border-none outline-none text-white text-lg md:text-xl grow px-4 placeholder:text-white/70'
                                type="text"
                                placeholder="Bairro*"
                                name="neighborhood"
                                value={formData.neighborhood}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="flex items-center rounded-lg h-14 overflow-hidden bg-white/20">
                            <input
                                className='bg-transparent border-none outline-none text-white text-lg md:text-xl grow px-4 placeholder:text-white/70'
                                type="text"
                                placeholder="Cidade*"
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="flex items-center rounded-lg h-14 overflow-hidden bg-white/20">
                            <input
                                className='bg-transparent border-none outline-none text-white text-lg md:text-xl grow px-4 placeholder:text-white/70'
                                type="text"
                                placeholder="Estado*"
                                name="state"
                                value={formData.state}
                                onChange={handleInputChange}
                                maxLength={2}
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-black text-white w-full py-4 border-none rounded-xl text-xl md:text-2xl font-semibold cursor-pointer hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                    >
                        {loading ? 'Cadastrando...' : 'Cadastra-se'}
                    </button>
                </form>

                <div className="mt-5 text-sm text-white/70 text-center">
                    <p>Já tem conta?
                        <a 
                            className='text-white decoration-none font-semibold ml-1 hover:underline cursor-pointer' 
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </a>
                    </p>
                </div>
            </div>
        </main>
    );
}

export default Register;