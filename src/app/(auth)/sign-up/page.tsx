"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { hash } from "bcryptjs";

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
  const email = searchParams?.get("email") || "";
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = useForm<FormInputs>({
    defaultValues: {
      email,
      isla: "Tenerife",
      newsletter: false,
    },
    mode: "onChange",
  });

  const password = watch("password");

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

  const onSubmit = async (data: FormInputs) => {
    try {
      const hashedPassword = await hash(data.password, 10);
      const { ...userData } = data;

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userData.nombre,
          lastName: userData.apellido,
          email: userData.email,
          password: hashedPassword,
          newsletter: userData.newsletter,
          isla: userData.isla,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al registrar usuario");
      }

      router.push("/auth/form");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getPasswordStrength = (value: string = "") => {
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
          <div className="flex gap-4 items-center">
            <label className="block text-gray-700">Tratamiento</label>
            <span className="text-gray-700 text-xs">(* Campo requerido)</span>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Nombre *</label>
            <input
              {...register("nombre", {
                required: "El nombre es requerido",
                minLength: {
                  value: 2,
                  message: "El nombre debe tener al menos 2 caracteres",
                },
              })}
              className={`w-full border rounded-md p-2 ${
                errors.nombre ? "border-red-500" : ""
              }`}
            />
            {errors.nombre && (
              <p className="text-red-500 text-sm mt-1">
                {errors.nombre.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Apellido *</label>
            <input
              {...register("apellido", {
                required: "El apellido es requerido",
                minLength: {
                  value: 2,
                  message: "El apellido debe tener al menos 2 caracteres",
                },
              })}
              className={`w-full border rounded-md p-2 ${
                errors.apellido ? "border-red-500" : ""
              }`}
            />
            {errors.apellido && (
              <p className="text-red-500 text-sm mt-1">
                {errors.apellido.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Correo electrónico *
            </label>
            <input
              {...register("email", {
                required: "El email es requerido",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email inválido",
                },
              })}
              readOnly
              className="w-full border rounded-md p-2 bg-gray-50"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Contraseña *</label>
            <div className="relative">
              <input
                {...register("password", {
                  required: "Este campo es requerido",
                  validate: {
                    strength: (value) =>
                      validatePassword(value) ||
                      "La contraseña no cumple con los requisitos mínimos",
                  },
                })}
                type={showPassword ? "text" : "password"}
                className={`w-full border rounded-md p-2 pr-10 ${
                  errors.password ? "border-red-500" : ""
                }`}
                onChange={(e) => {
                  register("password").onChange(e);
                  trigger("confirmPassword");
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2.5 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
            <div className="mt-2 space-y-2">
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={`h-2 w-full rounded ${
                      level <= getPasswordStrength(password)
                        ? [
                            "bg-red-500",
                            "bg-orange-500",
                            "bg-yellow-500",
                            "bg-blue-500",
                            "bg-green-500",
                          ][level - 1]
                        : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
              <ul className="text-xs text-gray-600 space-y-1">
                {[
                  {
                    test: (v: string) => v.length >= 8,
                    text: "Mínimo 8 caracteres",
                  },
                  {
                    test: (v: string) => /[A-Z]/.test(v),
                    text: "Al menos una mayúscula",
                  },
                  {
                    test: (v: string) => /[a-z]/.test(v),
                    text: "Al menos una minúscula",
                  },
                  {
                    test: (v: string) => /\d/.test(v),
                    text: "Al menos un número",
                  },
                  {
                    test: (v: string) => /[!@#$%^&*(),.?":{}|<>]/.test(v),
                    text: "Al menos un símbolo especial",
                  },
                ].map((req, i) => (
                  <li
                    key={i}
                    className={req.test(password || "") ? "text-green-600" : ""}
                  >
                    ✓ {req.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Confirmar Contraseña *
            </label>
            <div className="relative">
              <input
                {...register("confirmPassword", {
                  required: "Este campo es requerido",
                  validate: (value) =>
                    value === password || "Las contraseñas no coinciden",
                })}
                type={showConfirmPassword ? "text" : "password"}
                className={`w-full border rounded-md p-2 pr-10 ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-2.5 text-gray-500"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register("newsletter")}
                className="rounded"
              />
              <span>Suscribirme a la newsletter</span>
            </label>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Selecciona isla:</label>
            <select
              {...register("isla")}
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
            className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 w-1/4"
          >
            Registrarse
          </button>
          <div className="mt-6">
            <hr className="my-6" />
            <span className="text-xs text-gray-500 block text-justify break-normal leading-tight">
              ** Le informamos que los datos que nos remita a través de este
              formulario y los siguientes quedarán incorporados en los sistemas
              de información de BONOS VIP CANARIAS, S.L.. Dicha comunicación se
              utilizará exclusivamente para atender su petición. De conformidad
              con lo establecido en el artículo 6 LOPD, Ud. nos otorga su
              consentimiento inequívoco para que procedamos, en cumplimiento de
              los fines mencionados en el apartado anterior, al tratamiento de
              los datos facilitados. No obstante, en cualquier momento usted
              podrá ejercitar los derechos de acceso, rectificación, cancelación
              y oposición a través de la dirección: C/ Bethencourt Alfonso,
              25-4., 38002, Santa Cruz de Tenerife, o en el mail:
              info@bonosvip.com junto con copia del DNI o documento análogo en
              derecho
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
