'use client'

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface FormInputs {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  confirmPassword: string;
  newsletter: boolean;
  isla: string;
}

const SignUpForm: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams?.get('email') || '';

  const { 
    register, 
    handleSubmit, 
    watch,
    formState: { errors },
    trigger
  } = useForm<FormInputs>({
    defaultValues: {
      email,
      isla: 'Tenerife',
      newsletter: false
    }
  });

  const password = watch('password');

  const validatePassword = (value: string) => {
    const requirements = {
      length: value.length >= 8,
      uppercase: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
      number: /\d/.test(value),
      symbol: /[!@#$%^&*(),.?":{}|<>]/.test(value),
    };

    const score = Object.values(requirements).filter(Boolean).length;
    if (score < 5) return false;

    return true;
  };

  const onSubmit = (data: FormInputs) => {
    console.log(data);
  };

  const getPasswordStrength = (value: string = '') => {
    if (!value) return 0;
    const requirements = [
      value.length >= 8,
      /[A-Z]/.test(value),
      /[a-z]/.test(value),
      /\d/.test(value),
      /[!@#$%^&*(),.?":{}|<>]/.test(value),
    ];
    return requirements.filter(Boolean).length;
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl mb-6">Crear una cuenta</h1>
      
      <div className="border rounded-lg p-6">
        <h2 className="text-lg mb-4">Datos personales</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className='flex gap-4 items-center'>
            <label className="block text-gray-700">Tratamiento</label>
            <span className='text-gray-700 text-xs'>(* Campo requerido)</span>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Nombre *</label>
            <input
              {...register('nombre', { required: 'Este campo es requerido' })}
              className={`w-full border rounded-md p-2 ${errors.nombre ? 'border-red-500' : ''}`}
            />
            {errors.nombre && (
              <p className="text-red-500 text-sm mt-1">{errors.nombre.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Apellido *</label>
            <input
              {...register('apellido', { required: 'Este campo es requerido' })}
              className={`w-full border rounded-md p-2 ${errors.apellido ? 'border-red-500' : ''}`}
            />
            {errors.apellido && (
              <p className="text-red-500 text-sm mt-1">{errors.apellido.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Correo electrónico *</label>
            <input
              {...register('email')}
              readOnly
              className="w-full border rounded-md p-2 bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Contraseña *</label>
            <div className="relative">
              <input
                {...register('password', {
                  required: 'Este campo es requerido',
                  validate: {
                    strength: (value) => 
                      validatePassword(value) || 'La contraseña no cumple con los requisitos mínimos'
                  }
                })}
                type="password"
                className={`w-full border rounded-md p-2 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                onChange={(e) => {
                  register('password').onChange(e);
                  trigger('confirmPassword');
                }}
              />
              <Eye className="absolute right-2 top-2.5 text-gray-500" size={20} />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
            <div className="mt-2 space-y-2">
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={`h-2 w-full rounded ${
                      level <= getPasswordStrength(password) 
                        ? ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'][level - 1]
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              <ul className="text-xs text-gray-600 space-y-1">
                {[
                  { test: (v: string) => v.length >= 8, text: 'Mínimo 8 caracteres' },
                  { test: (v: string) => /[A-Z]/.test(v), text: 'Al menos una mayúscula' },
                  { test: (v: string) => /[a-z]/.test(v), text: 'Al menos una minúscula' },
                  { test: (v: string) => /\d/.test(v), text: 'Al menos un número' },
                  { test: (v: string) => /[!@#$%^&*(),.?":{}|<>]/.test(v), text: 'Al menos un símbolo especial' }
                ].map((req, i) => (
                  <li key={i} className={req.test(password || '') ? 'text-green-600' : ''}>
                    ✓ {req.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Confirmar Contraseña *</label>
            <div className="relative">
              <input
                {...register('confirmPassword', {
                  required: 'Este campo es requerido',
                  validate: (value) => value === password || 'Las contraseñas no coinciden'
                })}
                type="password"
                className={`w-full border rounded-md p-2 pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
              />
              <Eye className="absolute right-2 top-2.5 text-gray-500" size={20} />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('newsletter')}
                className="rounded"
              />
              <span>Suscribirme a la newsletter</span>
            </label>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Selecciona isla:</label>
            <select
              {...register('isla')}
              className="w-full border rounded-md p-2"
            >
              <option value="Tenerife">Tenerife</option>
              <option value="Gran Canaria">Gran Canaria</option>
              <option value="La Palma">La Palma</option>
              <option value="Lanzarote">Lanzarote</option>
            </select>
            <span className="text-sm text-gray-500">
              Solo se aplica si marcas la casilla de suscripción a la newsletter
            </span>
          </div>

          <button 
            type="submit"
            className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 w-full"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;