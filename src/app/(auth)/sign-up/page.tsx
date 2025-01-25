'use client'

import React, { useState } from 'react';

interface LoginData {
  email: string;
  password: string;
}

interface FormErrors {
  loginEmail?: string;
  loginPassword?: string;
  registerEmail?: string;
  submit?: string;
  registerSubmit?: string;
}

const LoginComponent: React.FC = () => {
  const [loginData, setLoginData] = useState<LoginData>({ email: '', password: '' });
  const [registerEmail, setRegisterEmail] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const validateEmail = (email: string): boolean => {
    return Boolean(email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/));
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const newErrors: FormErrors = {};

    if (!validateEmail(loginData.email)) {
      newErrors.loginEmail = 'Email inválido';
    }
    if (!validatePassword(loginData.password)) {
      newErrors.loginPassword = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Login successful', loginData);
      } catch (error) {
        setErrors({ submit: `Error al iniciar sesión: ${error.message}` });
      }
    }
    setIsSubmitting(false);
  };

  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const newErrors: FormErrors = {};

    if (!validateEmail(registerEmail)) {
      newErrors.registerEmail = 'Email inválido';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Registration successful', registerEmail);
      } catch (error) {
        setErrors({ registerSubmit: 'Error al crear la cuenta' });
      }
    }
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-2xl mb-8">Iniciar sesión</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Login Form */}
        <div className="border rounded-lg p-6">
          <h2 className="text-lg mb-4">¿Ya estás registrado?</h2>
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Correo electrónico</label>
              <input 
                type="email" 
                className={`w-full border rounded-md p-2 ${errors.loginEmail ? 'border-red-500' : ''}`}
                value={loginData.email}
                onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                disabled={isSubmitting}
              />
              {errors.loginEmail && (
                <p className="text-red-500 text-sm mt-1">{errors.loginEmail}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Contraseña</label>
              <input 
                type="password" 
                className={`w-full border rounded-md p-2 ${errors.loginPassword ? 'border-red-500' : ''}`}
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                disabled={isSubmitting}
              />
              {errors.loginPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.loginPassword}</p>
              )}
            </div>
            <div>
              <a href="#" className="text-red-600 hover:underline text-sm">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            {errors.submit && (
              <p className="text-red-500 text-sm">{errors.submit}</p>
            )}
            <button 
              type="submit" 
              className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Procesando...' : 'Iniciar sesión'}
            </button>
          </form>
        </div>

        {/* Registration Form */}
        <div className="border rounded-lg p-6">
          <h2 className="text-lg mb-4">Crear una cuenta</h2>
          <p className="mb-4 text-gray-600">
            Escribe tu correo electrónico para crear tu cuenta
          </p>
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Correo electrónico</label>
              <input 
                type="email" 
                className={`w-full border rounded-md p-2 ${errors.registerEmail ? 'border-red-500' : ''}`}
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                disabled={isSubmitting}
              />
              {errors.registerEmail && (
                <p className="text-red-500 text-sm mt-1">{errors.registerEmail}</p>
              )}
            </div>
            {errors.registerSubmit && (
              <p className="text-red-500 text-sm">{errors.registerSubmit}</p>
            )}
            <button 
              type="submit" 
              className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Procesando...' : 'Crear una cuenta'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;