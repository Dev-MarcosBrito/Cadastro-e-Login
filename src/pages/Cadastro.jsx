import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiCreditCard, FiMail, FiLock, FiMapPin, FiHome, FiNavigation, FiMap } from 'react-icons/fi';
import bg from '../assets/bg.jfif';
import Toast from '../components/Toast';
import { useToast } from '../hooks/useToast';
import InputField from '../components/InputField';

const Register = () => {
    const navigate = useNavigate();
    const { toast, showToast, hideToast } = useToast();
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
    const [loadingCep, setLoadingCep] = useState(false);
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        // Formatação automática do CEP
        if (name === 'cep') {
            const cepFormatted = value.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2');
            setFormData(prev => ({
                ...prev,
                [name]: cepFormatted
            }));
            validateField(name, cepFormatted);
            return;
        }
        
        // Formatação automática do CPF
        if (name === 'cpf') {
            const cpfFormatted = value.replace(/\D/g, '').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            setFormData(prev => ({
                ...prev,
                [name]: cpfFormatted
            }));
            validateField(name, cpfFormatted);
            return;
        }
        
        // Formatação do Estado (maiúsculas)
        if (name === 'state') {
            setFormData(prev => ({
                ...prev,
                [name]: value.toUpperCase()
            }));
            validateField(name, value.toUpperCase());
            return;
        }
        
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        validateField(name, value);
    };

    const validateField = (name, value) => {
        const newErrors = { ...errors };
        
        switch (name) {
            case 'email': {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (value && !emailRegex.test(value)) {
                    newErrors.email = 'Email inválido';
                } else {
                    delete newErrors.email;
                }
                break;
            }
            case 'cpf': {
                const cpfDigits = value.replace(/\D/g, '');
                if (value && cpfDigits.length !== 11) {
                    newErrors.cpf = 'CPF deve ter 11 dígitos';
                } else {
                    delete newErrors.cpf;
                }
                break;
            }
            case 'cep': {
                const cepDigits = value.replace(/\D/g, '');
                if (value && cepDigits.length !== 8) {
                    newErrors.cep = 'CEP deve ter 8 dígitos';
                } else {
                    delete newErrors.cep;
                }
                break;
            }
            case 'state': {
                if (value && value.length !== 2) {
                    newErrors.state = 'Estado deve ter 2 letras';
                } else {
                    delete newErrors.state;
                }
                break;
            }
            default:
                if (value) {
                    delete newErrors[name];
                }
        }
        
        setErrors(newErrors);
    };

    const handleCepBlur = async (e) => {
        const cep = e.target.value.replace(/\D/g, '');
        
        if (cep.length === 8) {
            setLoadingCep(true);
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
                    showToast('Endereço preenchido automaticamente!', 'success', 2000);
                    setErrors(prev => {
                        const newErrors = { ...prev };
                        delete newErrors.cep;
                        return newErrors;
                    });
                } else {
                    showToast('CEP não encontrado. Por favor, verifique o CEP digitado.', 'error');
                    setErrors(prev => ({ ...prev, cep: 'CEP não encontrado' }));
                }
            } catch (error) {
                console.error('Erro ao buscar CEP:', error);
                showToast('Erro ao buscar CEP. Tente novamente.', 'error');
            } finally {
                setLoadingCep(false);
            }
        } else if (cep.length > 0) {
            setErrors(prev => ({ ...prev, cep: 'CEP deve ter 8 dígitos' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validação final
        const hasErrors = Object.keys(errors).length > 0;
        if (hasErrors) {
            showToast('Por favor, corrija os erros no formulário.', 'warning');
            return;
        }
        
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
                showToast('Cadastro realizado com sucesso!', 'success');
                setTimeout(() => {
                    navigate('/login');
                }, 1500);
            } else {
                showToast('Erro ao realizar cadastro. Tente novamente.', 'error');
            }
        } catch (error) {
            console.error('Erro ao cadastrar:', error);
            showToast('Erro ao realizar cadastro. Verifique se o servidor está rodando.', 'error');
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
            {toast && <Toast {...toast} onClose={hideToast} />}
            
            <div className="bg-gray-900/85 backdrop-blur-md p-6 md:p-10 rounded-2xl w-11/12 max-w-2xl shadow-2xl text-white animate-fade-in">
                <h1 className='text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'>
                    Cadastro
                </h1>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    {/* Separador visual */}
                    <div className="border-t border-white/10 my-2"></div>
                    
                    {/* GRUPO 1: Nome e CPF (2 colunas) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField
                            icon={FiUser}
                            name="name"
                            placeholder="Nome*"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            error={errors.name}
                        />
                        <InputField
                            icon={FiCreditCard}
                            name="cpf"
                            placeholder="CPF*"
                            value={formData.cpf}
                            onChange={handleInputChange}
                            maxLength={14}
                            required
                            error={errors.cpf}
                        />
                    </div>

                    {/* GRUPO 2: Email e Senha (2 colunas) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField
                            icon={FiMail}
                            name="email"
                            placeholder="Email*"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            error={errors.email}
                        />
                        <InputField
                            icon={FiLock}
                            name="password"
                            placeholder="Senha*"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            showPasswordToggle={true}
                            error={errors.password}
                        />
                    </div>

                    {/* Separador visual */}
                    <div className="border-t border-white/10 my-2">
                        <p className="text-xs text-white/50 mt-2 flex items-center gap-2">
                            <FiMapPin size={12} />
                            Endereço
                        </p>
                    </div>

                    {/* GRUPO 3: CEP e Logradouro */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <InputField
                            icon={FiMapPin}
                            name="cep"
                            placeholder="CEP*"
                            value={formData.cep}
                            onChange={handleInputChange}
                            onBlur={handleCepBlur}
                            maxLength={9}
                            required
                            error={errors.cep}
                            loading={loadingCep}
                        />
                        <InputField
                            icon={FiHome}
                            name="street"
                            placeholder="Logradouro"
                            value={formData.street}
                            onChange={handleInputChange}
                            className="md:col-span-2"
                            error={errors.street}
                        />
                    </div>

                    {/* GRUPO 4: Bairro, Cidade e Estado (3 colunas) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <InputField
                            icon={FiNavigation}
                            name="neighborhood"
                            placeholder="Bairro*"
                            value={formData.neighborhood}
                            onChange={handleInputChange}
                            required
                            error={errors.neighborhood}
                        />
                        <InputField
                            icon={FiMap}
                            name="city"
                            placeholder="Cidade*"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                            error={errors.city}
                        />
                        <InputField
                            icon={FiMapPin}
                            name="state"
                            placeholder="Estado* (ex: SP)"
                            value={formData.state}
                            onChange={handleInputChange}
                            maxLength={2}
                            required
                            error={errors.state}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="relative bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white w-full py-4 border-none rounded-xl text-lg md:text-xl font-semibold cursor-pointer hover:shadow-2xl hover:shadow-black/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden group mt-4"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            {loading && (
                                <svg className="animate-spin-slow h-5 w-5" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            )}
                            {loading ? 'Cadastrando...' : 'Cadastra-se'}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    </button>
                </form>

                <div className="mt-6 text-sm text-white/70 text-center">
                    <p>Já tem conta?
                        <a 
                            className='text-white decoration-none font-semibold ml-1 hover:underline cursor-pointer transition-all hover:text-white' 
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