import React, { useEffect } from 'react';
import { FiCheckCircle, FiXCircle, FiInfo, FiAlertCircle } from 'react-icons/fi';

const Toast = ({ message, type = 'info', onClose, duration = 3000 }) => {
    useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [duration, onClose]);

    const icons = {
        success: <FiCheckCircle className="text-green-400" size={20} />,
        error: <FiXCircle className="text-red-400" size={20} />,
        info: <FiInfo className="text-blue-400" size={20} />,
        warning: <FiAlertCircle className="text-yellow-400" size={20} />
    };

    const bgColors = {
        success: 'bg-green-900/90 border-green-500',
        error: 'bg-red-900/90 border-red-500',
        info: 'bg-blue-900/90 border-blue-500',
        warning: 'bg-yellow-900/90 border-yellow-500'
    };

    return (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border backdrop-blur-md shadow-2xl text-white min-w-[300px] max-w-md animate-slide-in ${bgColors[type]}`}>
            {icons[type]}
            <p className="flex-1 text-sm font-medium">{message}</p>
            <button
                onClick={onClose}
                className="text-white/70 hover:text-white transition-colors"
            >
                <FiXCircle size={18} />
            </button>
        </div>
    );
};

export default Toast;

