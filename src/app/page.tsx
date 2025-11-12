"use client"

import { Play, Info, ChevronRight, Film, Tv, TrendingUp, Star } from "lucide-react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()

  const features = [
    {
      icon: Film,
      title: "Filmes Ilimitados",
      description: "Assista milhares de filmes em alta qualidade quando quiser"
    },
    {
      icon: Tv,
      title: "Séries Exclusivas",
      description: "Maratone suas séries favoritas sem interrupções"
    },
    {
      icon: TrendingUp,
      title: "Sempre Atualizado",
      description: "Novos conteúdos adicionados toda semana"
    },
    {
      icon: Star,
      title: "Qualidade Premium",
      description: "Streaming em 4K com áudio surround"
    }
  ]

  const plans = [
    {
      name: "Básico",
      price: "R$ 19,90",
      features: ["HD disponível", "1 tela simultânea", "Sem anúncios"]
    },
    {
      name: "Padrão",
      price: "R$ 29,90",
      features: ["Full HD disponível", "2 telas simultâneas", "Downloads ilimitados"],
      popular: true
    },
    {
      name: "Premium",
      price: "R$ 39,90",
      features: ["4K + HDR", "4 telas simultâneas", "Áudio espacial"]
    }
  ]

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        {/* Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1489599162163-3fb2c8b5c8c0?w=1920&h=1080&fit=crop)" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
        </div>

        {/* Header */}
        <header className="absolute top-0 w-full z-50 px-4 md:px-16 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-[#E50914] text-3xl md:text-4xl font-bold">CineStream</h1>
            <button
              onClick={() => router.push("/login")}
              className="bg-[#E50914] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#f40612] transition-colors"
            >
              Entrar
            </button>
          </div>
        </header>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Filmes, séries e muito mais.<br />Sem limites.
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 mb-8">
            Assista onde quiser. Cancele quando quiser.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/login")}
              className="flex items-center justify-center gap-2 bg-[#E50914] text-white px-8 py-4 rounded-md text-lg font-semibold hover:bg-[#f40612] transition-all hover:scale-105"
            >
              <Play className="w-6 h-6 fill-current" />
              Começar Agora
            </button>
            <button
              onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-md text-lg font-semibold hover:bg-white/20 transition-all hover:scale-105 border border-white/30"
            >
              <Info className="w-6 h-6" />
              Ver Planos
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronRight className="w-8 h-8 text-white rotate-90" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-16 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
            Por que escolher o CineStream?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg hover:bg-gray-800/70 transition-all hover:scale-105 border border-gray-700"
              >
                <feature.icon className="w-12 h-12 text-[#E50914] mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="plans" className="py-20 px-4 md:px-16 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
            Escolha seu plano
          </h2>
          <p className="text-xl text-gray-400 text-center mb-16">
            Todos os planos incluem 30 dias grátis
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-gray-800/50 backdrop-blur-sm p-8 rounded-lg border-2 transition-all hover:scale-105 ${
                  plan.popular
                    ? "border-[#E50914] shadow-2xl shadow-[#E50914]/20"
                    : "border-gray-700 hover:border-gray-600"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#E50914] text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Mais Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400">/mês</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-300">
                      <div className="w-5 h-5 rounded-full bg-[#E50914]/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#E50914]" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => router.push("/login")}
                  className={`w-full py-3 rounded-md font-semibold transition-all ${
                    plan.popular
                      ? "bg-[#E50914] text-white hover:bg-[#f40612]"
                      : "bg-white/10 text-white hover:bg-white/20 border border-white/30"
                  }`}
                >
                  Começar Agora
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-16 bg-gradient-to-t from-black to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Pronto para começar?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Crie sua conta e comece a assistir em segundos
          </p>
          <button
            onClick={() => router.push("/login")}
            className="bg-[#E50914] text-white px-12 py-4 rounded-md text-lg font-semibold hover:bg-[#f40612] transition-all hover:scale-105 inline-flex items-center gap-2"
          >
            <Play className="w-6 h-6 fill-current" />
            Começar Gratuitamente
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-gray-400 px-4 md:px-16 py-16 border-t border-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4 text-white">Empresa</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:underline hover:text-white transition-colors">Sobre nós</a></li>
                <li><a href="#" className="hover:underline hover:text-white transition-colors">Carreiras</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Ajuda</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:underline hover:text-white transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:underline hover:text-white transition-colors">Fale conosco</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:underline hover:text-white transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:underline hover:text-white transition-colors">Termos de uso</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Social</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:underline hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:underline hover:text-white transition-colors">Twitter</a></li>
              </ul>
            </div>
          </div>
          <div className="text-sm text-gray-500 flex items-center justify-between">
            <span>© 2024 CineStream. Todos os direitos reservados.</span>
            <span className="text-[#E50914]">Criado com Lasy AI</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
