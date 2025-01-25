"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { ToastProvider, ToastViewport } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
}

const AuthForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: {
      errors: loginErrors,
      isSubmitting: isLoginSubmitting,
      isValid: isLoginValid,
    },
  } = useForm<LoginData>({ mode: "onChange" });

  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    formState: {
      errors: registerErrors,
      isSubmitting: isRegisterSubmitting,
      isValid: isRegisterValid,
    },
  } = useForm<RegisterData>({ mode: "onChange" });

  const onLogin = async (data: LoginData) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const userData = await response.json();

      if (!response.ok) {
        toast({
          variant: "destructive",
          title: "Error de Autenticación",
          description: userData.message || "Credenciales inválidas",
        });
        return;
      }

      localStorage.setItem(
        "bonos-vip",
        JSON.stringify({ user: userData.user })
      );

      toast({
        title: "Inicio de Sesión Exitoso",
        description: "Redirigiendo...",
      });

      setTimeout(() => {
        router.push(userData.user.role === "admin" ? "/admin" : "/");
      }, 1500);
    } catch (error) {
      console.log("Error:", error);
      toast({
        variant: "destructive",
        title: "Error de Conexión",
        description: "No se pudo conectar con el servidor",
      });
    }
  };

  const onRegister = async (data: RegisterData) => {
    router.push(`/sign-up?email=${encodeURIComponent(data.email)}`);
  };

  return (
    <ToastProvider>
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-2xl mb-8">Iniciar sesión</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border rounded-lg p-6">
            <h2 className="text-lg mb-4 font-medium">¿Ya estás registrado?</h2>
            <form onSubmit={handleLoginSubmit(onLogin)} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">
                  Correo electrónico
                </label>
                <input
                  {...loginRegister("email", {
                    required: "Email es requerido",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Email inválido",
                    },
                  })}
                  type="email"
                  className={`w-full border rounded-md p-2 ${
                    loginErrors.email ? "border-red-500" : ""
                  }`}
                />
                {loginErrors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {loginErrors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Contraseña</label>
                <div className="relative">
                  <input
                    {...loginRegister("password", {
                      required: "Contraseña es requerida",
                      minLength: {
                        value: 6,
                        message:
                          "La contraseña debe tener al menos 6 caracteres",
                      },
                    })}
                    type={showPassword ? "text" : "password"}
                    className={`w-full border rounded-md p-2 pr-10 ${
                      loginErrors.password ? "border-red-500" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-2.5 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {loginErrors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {loginErrors.password.message}
                  </p>
                )}
              </div>

              <div>
                <a href="#" className="text-red-600 hover:underline text-sm">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <button
                type="submit"
                className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 disabled:opacity-50"
                disabled={!isLoginValid || isLoginSubmitting}
              >
                {isLoginSubmitting ? "Procesando..." : "Iniciar sesión"}
              </button>
            </form>
          </div>

          <div className="border rounded-lg p-6">
            <h2 className="text-lg mb-4 font-medium">Crear una cuenta</h2>
            <form
              onSubmit={handleRegisterSubmit(onRegister)}
              className="space-y-4"
            >
              <div>
                <label className="block text-gray-700 mb-2">
                  Correo electrónico
                </label>
                <input
                  {...registerRegister("email", {
                    required: "Email es requerido",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Email inválido",
                    },
                  })}
                  type="email"
                  className={`w-full border rounded-md p-2 ${
                    registerErrors.email ? "border-red-500" : ""
                  }`}
                />
                {registerErrors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {registerErrors.email.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 disabled:opacity-50"
                disabled={!isRegisterValid || isRegisterSubmitting}
              >
                {isRegisterSubmitting ? "Procesando..." : "Crear una cuenta"}
              </button>
            </form>
          </div>
        </div>
        <ToastViewport />
      </div>
    </ToastProvider>
  );
};

export default AuthForm;
