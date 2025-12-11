import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const InputField = ({ 
    icon: Icon, 
    name, 
    placeholder, 
    type = "text", 
    maxLength, 
    required = false, 
    showPasswordToggle = false, 
    value, 
    onChange, 
    onBlur, 
    error,
    loading = false
}) => {
    const [showPass, setShowPass] = useState(false);
    const inputType = showPasswordToggle ? (showPass ? "text" : "password") : type;
    
    return (
        <div className="relative">
            <div className={`relative flex items-center rounded-lg h-14 overflow-hidden bg-white/10 border transition-all duration-300 ${
                error 
                    ? 'border-red-400/50 bg-red-900/10 focus-within:border-red-400 focus-within:ring-2 focus-within:ring-red-400/20' 
                    : 'border-white/20 hover:bg-white/15 hover:border-white/30 focus-within:bg-white/15 focus-within:border-white/40 focus-within:ring-2 focus-within:ring-white/20'
            }`}>
                {Icon && (
                    <div className={`absolute left-4 transition-colors ${error ? 'text-red-400' : 'text-white/60'}`}>
                        <Icon size={20} />
                    </div>
                )}
                <input
                    className={`bg-transparent border-none outline-none text-white text-base md:text-lg grow px-4 ${Icon ? 'pl-12' : 'pl-4'} ${showPasswordToggle || loading ? 'pr-12' : 'pr-4'} placeholder:text-white/50 focus:placeholder:text-white/70 transition-colors`}
                    type={inputType}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    maxLength={maxLength}
                    required={required}
                />
                {showPasswordToggle && (
                    <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-4 text-white/60 hover:text-white transition-colors p-1"
                    >
                        {showPass ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                    </button>
                )}
                {loading && (
                    <div className="absolute right-4">
                        <svg className="animate-spin-slow h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                )}
            </div>
            {error && (
                <p className="mt-1 text-xs text-red-400 animate-fade-in">{error}</p>
            )}
        </div>
    );
};

export default InputField;

