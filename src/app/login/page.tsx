"use client"

import { useState } from "react"
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (isLogin) {
        // Login
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) throw error

        if (data.user) {
          router.push("/dashboard")
        }
      } else {
        // Cadastro
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: name || email.split("@")[0],
            },
          },
        })

        if (error) throw error

        if (data.user) {
          // Inserir usuário na tabela users
          const { error: insertError } = await supabase
            .from('users')
            .insert([
              {
                id: data.user.id,
                email: data.user.email,
                name: name || email.split("@")[0],
              },
            ])

          if (insertError) {
            console.error("Erro ao criar perfil:", insertError)
          }

          router.push("/dashboard")
        }
      }
    } catch (err: any) {
      setError(err.message || "Erro ao processar sua solicitação")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black relative flex items-center justify-center">
      {/* Background com overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
        style={{ backgroundImage: "url(https://images.unsplash.com/photo-1489599162163-3fb2c8b5c8c0?w=1920&h=1080&fit=crop)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />

      {/* Logo */}
      <div className="absolute top-8 left-8">
        <h1 className="text-[#E50914] text-3xl md:text-4xl font-bold">CineStream</h1>
      </div>

      {/* Form Container */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-black/75 backdrop-blur-sm rounded-lg p-8 md:p-12">
          <h2 className="text-white text-3xl font-bold mb-8">
            {isLogin ? "Entrar" : "Criar Conta"}
          </h2>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-md mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nome (apenas no cadastro) */}
            {!isLogin && (
              <div className="relative">
                <input
                  type="text"
                  placeholder="Nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-800 text-white rounded-md px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#E50914] transition-all"
                />
              </div>
            )}

            {/* Email Input */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-800 text-white rounded-md pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#E50914] transition-all"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-800 text-white rounded-md pl-12 pr-12 py-4 focus:outline-none focus:ring-2 focus:ring-[#E50914] transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#E50914] text-white font-semibold py-4 rounded-md hover:bg-[#f40612] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processando...
                </>
              ) : (
                isLogin ? "Entrar" : "Criar Conta"
              )}
            </button>

            {/* Remember Me & Help */}
            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-gray-400 cursor-pointer">
                  <input type="checkbox" className="mr-2" />
                  Lembre-se de mim
                </label>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Precisa de ajuda?
                </a>
              </div>
            )}
          </form>

          {/* Toggle Login/Signup */}
          <div className="mt-8 text-gray-400">
            {isLogin ? (
              <p>
                Novo no CineStream?{" "}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-white hover:underline font-semibold"
                >
                  Cadastre-se agora
                </button>
              </p>
            ) : (
              <p>
                Já tem uma conta?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-white hover:underline font-semibold"
                >
                  Entrar
                </button>
              </p>
            )}
          </div>

          {/* Terms */}
          <p className="mt-6 text-xs text-gray-500">
            Esta página é protegida pelo Google reCAPTCHA para garantir que você não é um robô.{" "}
            <a href="#" className="text-blue-500 hover:underline">Saiba mais</a>.
          </p>
        </div>
      </div>
    </div>
  )
}
