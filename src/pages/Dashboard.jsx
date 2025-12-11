import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiMapPin, FiHome, FiNavigation, FiMap, FiLogOut, FiCreditCard, FiCheckCircle } from 'react-icons/fi';
import bg from '../assets/bg.jfif';
import Toast from '../components/Toast';
import { useToast } from '../hooks/useToast';

const Dashboard = () => {
    const navigate = useNavigate();
    const { toast, showToast, hideToast } = useToast();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            try {
                setUser(JSON.parse(userData));
            } catch (error) {
                console.error('Erro ao carregar usuário:', error);
                showToast('Erro ao carregar dados do usuário', 'error');
                navigate('/login');
            }
        } else {
            showToast('Você precisa fazer login primeiro', 'warning');
            navigate('/login');
        }
        setLoading(false);
    }, [navigate, showToast]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('rememberMe');
        showToast('Logout realizado com sucesso!', 'success');
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };

    if (loading) {
        return (
            <main
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7)), url(${bg})`
                }}
                className="w-full h-screen bg-cover bg-center bg-no-repeat flex justify-center items-center"
            >
                <div className="animate-spin-slow">
                    <svg className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
            </main>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <main
            style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7)), url(${bg})`
            }}
            className="w-full min-h-screen bg-cover bg-center bg-no-repeat py-8 px-4"
        >
            {toast && <Toast {...toast} onClose={hideToast} />}

            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-gray-900/85 backdrop-blur-md p-6 rounded-2xl shadow-2xl text-white mb-6 animate-fade-in">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                Bem-vindo, {user.name}!
                            </h1>
                            <p className="text-white/70">Gerencie suas informações pessoais</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-6 py-3 bg-red-600/80 hover:bg-red-600 rounded-lg transition-all duration-300 hover:scale-105 font-semibold"
                        >
                            <FiLogOut size={20} />
                            Sair
                        </button>
                    </div>
                </div>

                {/* Cards de Informações */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Card de Informações Pessoais */}
                    <div className="bg-gray-900/85 backdrop-blur-md p-6 rounded-2xl shadow-2xl text-white animate-fade-in">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-blue-500/20 rounded-lg">
                                <FiUser className="text-blue-400" size={24} />
                            </div>
                            <h2 className="text-2xl font-bold">Informações Pessoais</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                                <FiUser className="text-white/60 mt-1" size={18} />
                                <div className="flex-1">
                                    <p className="text-xs text-white/50 mb-1">Nome Completo</p>
                                    <p className="text-white font-medium">{user.name}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                                <FiCreditCard className="text-white/60 mt-1" size={18} />
                                <div className="flex-1">
                                    <p className="text-xs text-white/50 mb-1">CPF</p>
                                    <p className="text-white font-medium">{user.cpf}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                                <FiMail className="text-white/60 mt-1" size={18} />
                                <div className="flex-1">
                                    <p className="text-xs text-white/50 mb-1">E-mail</p>
                                    <p className="text-white font-medium">{user.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card de Endereço */}
                    <div className="bg-gray-900/85 backdrop-blur-md p-6 rounded-2xl shadow-2xl text-white animate-fade-in">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-green-500/20 rounded-lg">
                                <FiMapPin className="text-green-400" size={24} />
                            </div>
                            <h2 className="text-2xl font-bold">Endereço</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                                <FiMapPin className="text-white/60 mt-1" size={18} />
                                <div className="flex-1">
                                    <p className="text-xs text-white/50 mb-1">CEP</p>
                                    <p className="text-white font-medium">{user.cep || 'Não informado'}</p>
                                </div>
                            </div>
                            {user.street && (
                                <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                                    <FiHome className="text-white/60 mt-1" size={18} />
                                    <div className="flex-1">
                                        <p className="text-xs text-white/50 mb-1">Logradouro</p>
                                        <p className="text-white font-medium">{user.street}</p>
                                    </div>
                                </div>
                            )}
                            <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                                <FiNavigation className="text-white/60 mt-1" size={18} />
                                <div className="flex-1">
                                    <p className="text-xs text-white/50 mb-1">Bairro</p>
                                    <p className="text-white font-medium">{user.neighborhood || 'Não informado'}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                                <FiMap className="text-white/60 mt-1" size={18} />
                                <div className="flex-1">
                                    <p className="text-xs text-white/50 mb-1">Cidade / Estado</p>
                                    <p className="text-white font-medium">
                                        {user.city || 'Não informado'} {user.state ? `- ${user.state}` : ''}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card de Status */}
                <div className="mt-6 bg-gradient-to-r from-green-900/50 to-blue-900/50 backdrop-blur-md p-6 rounded-2xl shadow-2xl text-white animate-fade-in border border-green-500/30">
                    <div className="flex items-center gap-3">
                        <FiCheckCircle className="text-green-400" size={28} />
                        <div>
                            <h3 className="text-xl font-bold mb-1">Conta Ativa</h3>
                            <p className="text-white/70">Sua conta está verificada e ativa no sistema</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Dashboard;

