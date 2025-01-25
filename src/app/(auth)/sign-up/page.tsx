'use client'

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordStrength {
  score: number;
  requirements: {
    length: boolean;
    uppercase: boolean;
    lowercase: boolean;
    number: boolean;
    symbol: boolean;
  };
}

const SignUpForm: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    score: 0,
    requirements: {
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      symbol: false,
    }
  });
  const [passwordError, setPasswordError] = useState('');

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: searchParams?.get('email') || '',
    password: '',
    confirmPassword: '',
    newsletter: false,
    isla: 'Tenerife'
  });

  const checkPasswordStrength = (password: string) => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    const score = Object.values(requirements).filter(Boolean).length;

    setPasswordStrength({
      score,
      requirements
    });
  };

  const validatePasswords = () => {
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Las contraseñas no coinciden');
      return false;
    }
    if (passwordStrength.score < 5) {
      setPasswordError('La contraseña no cumple con los requisitos mínimos');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePasswords()) return;
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));

    if (name === 'password') {
      checkPasswordStrength(value);
    }
    if (name === 'password' || name === 'confirmPassword') {
      setPasswordError('');
    }
  };

  const getStrengthColor = () => {
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
    return colors[passwordStrength.score - 1] || 'bg-gray-200';
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl mb-6">Crear una cuenta</h1>
      
      <div className="border rounded-lg p-6">
        <h2 className="text-lg mb-4">Datos personales</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className='flex gap-4 items-center'>
            <label className="block text-gray-700">Tratamiento</label>
            <span className='text-gray-700 text-xs'>(* Campo requerido)</span>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Nombre *</label>
            <input
              name="nombre"
              type="text"
              required
              value={formData.nombre}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Apellido *</label>
            <input
              name="apellido"
              type="text"
              required
              value={formData.apellido}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Correo electrónico *</label>
            <input
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              readOnly
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Contraseña *</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full border rounded-md p-2 pr-10"
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2.5 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="mt-2 space-y-2">
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={`h-2 w-full rounded ${
                      level <= passwordStrength.score ? getStrengthColor() : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              <ul className="text-xs text-gray-600 space-y-1">
                <li className={passwordStrength.requirements.length ? 'text-green-600' : ''}>
                  ✓ Mínimo 8 caracteres
                </li>
                <li className={passwordStrength.requirements.uppercase ? 'text-green-600' : ''}>
                  ✓ Al menos una mayúscula
                </li>
                <li className={passwordStrength.requirements.lowercase ? 'text-green-600' : ''}>
                  ✓ Al menos una minúscula
                </li>
                <li className={passwordStrength.requirements.number ? 'text-green-600' : ''}>
                  ✓ Al menos un número
                </li>
                <li className={passwordStrength.requirements.symbol ? 'text-green-600' : ''}>
                  ✓ Al menos un símbolo especial
                </li>
              </ul>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Confirmar Contraseña *</label>
            <div className="relative">
              <input
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border rounded-md p-2 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-2.5 text-gray-500"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          <div>
            <label className="flex items-center space-x-2">
              <input
                name="newsletter"
                type="checkbox"
                checked={formData.newsletter}
                onChange={handleChange}
                className="rounded"
              />
              <span>Suscribirme a la newsletter</span>
            </label>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Selecciona isla:</label>
            <select
              name="isla"
              value={formData.isla}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            >
              <option value="Tenerife">Tenerife</option>
              <option value="Gran Canaria">Gran Canaria</option>
              <option value="La Palma">La Palma</option>
              <option value="Lanzarote">Lanzarote</option>
            </select>
            <span className="text-sm text-gray-500">Solo se aplica si marcas la casilla de suscripción a la newsletter</span>
          </div>

          <button 
            type="submit"
            className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;