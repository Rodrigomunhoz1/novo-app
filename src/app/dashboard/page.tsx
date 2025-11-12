"use client"

import { Play, Info, ChevronLeft, ChevronRight, Search, Bell, User, LogOut, Settings, Heart, Clock, TrendingUp, Star, Film, Tv } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

function DashboardHeader({ userName }: { userName: string }) {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  return (
    <header className="fixed top-0 w-full z-50 bg-gradient-to-b from-black/90 to-transparent backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 md:px-16 py-4">
        {/* Logo */}
        <div className="flex items-center space-x-8">
          <h1 className="text-[#E50914] text-2xl md:text-3xl font-bold cursor-pointer" onClick={() => router.push("/dashboard")}>
            CineStream
          </h1>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-white hover:text-gray-300 transition-colors font-medium">Início</a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors flex items-center gap-1">
              <Tv className="w-4 h-4" />
              Séries
            </a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors flex items-center gap-1">
              <Film className="w-4 h-4" />
              Filmes
            </a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              Em Alta
            </a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors flex items-center gap-1">
              <Heart className="w-4 h-4" />
              Minha Lista
            </a>
          </nav>
        </div>
        
        {/* Right side */}
        <div className="flex items-center space-x-4">
          <Search className="w-6 h-6 text-white hover:text-gray-300 cursor-pointer transition-colors" />
          <div className="relative">
            <Bell className="w-6 h-6 text-white hover:text-gray-300 cursor-pointer transition-colors" />
            <span className="absolute -top-1 -right-1 bg-[#E50914] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
          </div>
          
          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-[#E50914] to-[#b20710] rounded flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <span className="hidden md:block text-white font-medium">{userName}</span>
            </button>
            
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-black/95 backdrop-blur-sm rounded-lg shadow-2xl border border-gray-800 overflow-hidden">
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-white hover:bg-gray-800 transition-colors">
                  <User className="w-4 h-4" />
                  Perfil
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-white hover:bg-gray-800 transition-colors">
                  <Settings className="w-4 h-4" />
                  Configurações
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-white hover:bg-gray-800 transition-colors">
                  <Clock className="w-4 h-4" />
                  Histórico
                </a>
                <hr className="border-gray-800" />
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 text-white hover:bg-gray-800 transition-colors w-full text-left"
                >
                  <LogOut className="w-4 h-4" />
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

function HeroSection({ featured }: { featured: any }) {
  return (
    <section className="relative h-screen flex items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${featured.image_url})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 px-4 md:px-16 max-w-2xl">
        {/* Badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-[#E50914] text-white text-xs font-bold px-3 py-1 rounded">TOP 10</span>
          <div className="flex items-center gap-1 text-yellow-400">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-white font-semibold">{featured.rating}</span>
          </div>
          <span className="text-gray-400 text-sm">{featured.year}</span>
          <span className="text-gray-400 text-sm">{featured.duration}</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          {featured.title}
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
          {featured.description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="flex items-center justify-center gap-2 bg-white text-black px-8 py-3 rounded-md font-semibold hover:bg-gray-200 transition-all hover:scale-105">
            <Play className="w-5 h-5 fill-current" />
            Assistir Agora
          </button>
          <button className="flex items-center justify-center gap-2 bg-gray-600/70 backdrop-blur-sm text-white px-8 py-3 rounded-md font-semibold hover:bg-gray-600/90 transition-all hover:scale-105">
            <Info className="w-5 h-5" />
            Mais informações
          </button>
          <button className="flex items-center justify-center gap-2 bg-transparent border-2 border-white/50 text-white px-6 py-3 rounded-md font-semibold hover:bg-white/10 transition-all hover:scale-105">
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}

function ContentCard({ item, userProgress }: { item: any; userProgress?: number }) {
  return (
    <div className="group relative min-w-[200px] md:min-w-[250px] cursor-pointer transition-all duration-300 hover:scale-105 hover:z-10">
      <div className="relative">
        <img
          src={item.image_url}
          alt={item.title}
          className="w-full h-[120px] md:h-[140px] object-cover rounded-md"
        />
        {userProgress && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700 rounded-b-md">
            <div 
              className="h-full bg-[#E50914] rounded-b-md transition-all duration-300"
              style={{ width: `${userProgress}%` }}
            />
          </div>
        )}
        {item.rating && (
          <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="text-white text-xs font-semibold">{item.rating}</span>
          </div>
        )}
        {item.type && (
          <div className="absolute top-2 left-2 bg-[#E50914]/90 backdrop-blur-sm px-2 py-1 rounded">
            {item.type === 'series' ? (
              <Tv className="w-3 h-3 text-white" />
            ) : (
              <Film className="w-3 h-3 text-white" />
            )}
          </div>
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md flex items-end p-3">
        <div className="w-full">
          <h3 className="text-white text-sm font-semibold mb-2">{item.title}</h3>
          <div className="flex gap-2">
            <button className="bg-white text-black rounded-full p-1.5 hover:bg-gray-200 transition-colors">
              <Play className="w-3 h-3 fill-current" />
            </button>
            <button className="bg-gray-800/80 text-white rounded-full p-1.5 hover:bg-gray-700 transition-colors">
              <Heart className="w-3 h-3" />
            </button>
            <button className="bg-gray-800/80 text-white rounded-full p-1.5 hover:bg-gray-700 transition-colors">
              <Info className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function ContentRow({ title, items, userProgress }: { title: string; items: any[]; userProgress?: any[] }) {
  const [scrollPosition, setScrollPosition] = useState(0)
  
  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById(`row-${title}`)
    if (container) {
      const scrollAmount = 400
      const newPosition = direction === 'left' 
        ? Math.max(0, scrollPosition - scrollAmount)
        : scrollPosition + scrollAmount
      
      container.scrollTo({ left: newPosition, behavior: 'smooth' })
      setScrollPosition(newPosition)
    }
  }
  
  return (
    <div className="relative group mb-10">
      <h2 className="text-white text-xl md:text-2xl font-semibold mb-4 px-4 md:px-16">
        {title}
      </h2>
      
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        {/* Content Container */}
        <div
          id={`row-${title}`}
          className="flex gap-3 overflow-x-auto scrollbar-hide px-4 md:px-16 pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((item) => {
            const progress = userProgress?.find(p => p.content_id === item.id)?.progress
            return <ContentCard key={item.id} item={item} userProgress={progress} />
          })}
        </div>
        
        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const [userName, setUserName] = useState("Usuário")
  const [content, setContent] = useState<any[]>([])
  const [featured, setFeatured] = useState<any>(null)
  const [userProgress, setUserProgress] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
    loadContent()
  }, [])

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      router.push("/login")
      return
    }

    // Buscar dados do usuário
    const { data: userData } = await supabase
      .from('users')
      .select('name')
      .eq('id', user.id)
      .single()

    if (userData) {
      setUserName(userData.name || user.email?.split("@")[0] || "Usuário")
    }

    // Buscar progresso do usuário
    const { data: progressData } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', user.id)

    if (progressData) {
      setUserProgress(progressData)
    }
  }

  const loadContent = async () => {
    try {
      // Buscar conteúdo em destaque
      const { data: featuredData } = await supabase
        .from('content')
        .select('*')
        .eq('featured', true)
        .limit(1)
        .single()

      if (featuredData) {
        setFeatured(featuredData)
      }

      // Buscar todo o conteúdo
      const { data: contentData } = await supabase
        .from('content')
        .select('*')
        .order('rating', { ascending: false })

      if (contentData) {
        setContent(contentData)
      }
    } catch (error) {
      console.error("Erro ao carregar conteúdo:", error)
    } finally {
      setLoading(false)
    }
  }

  // Organizar conteúdo por categoria
  const contentByCategory = content.reduce((acc: any, item: any) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {})

  // Conteúdo que o usuário está assistindo
  const continueWatching = content.filter(item => 
    userProgress.some(p => p.content_id === item.id && p.progress > 0 && p.progress < 100)
  )

  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    )
  }

  return (
    <div className="bg-black min-h-screen">
      <DashboardHeader userName={userName} />
      {featured && <HeroSection featured={featured} />}
      
      {/* Content Rows */}
      <div className="relative z-10 -mt-32 pb-16">
        {continueWatching.length > 0 && (
          <ContentRow 
            title="Continuar Assistindo" 
            items={continueWatching} 
            userProgress={userProgress}
          />
        )}
        
        {Object.entries(contentByCategory).map(([category, items]: [string, any]) => (
          <ContentRow 
            key={category} 
            title={category} 
            items={items}
            userProgress={userProgress}
          />
        ))}
      </div>
      
      {/* Footer */}
      <footer className="bg-black text-gray-400 px-4 md:px-16 py-16 border-t border-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4 text-white">Idioma e legendas</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:underline hover:text-white transition-colors">Áudio e legendas</a></li>
                <li><a href="#" className="hover:underline hover:text-white transition-colors">Audiodescrição</a></li>
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
              <h3 className="font-semibold mb-4 text-white">CineStream</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:underline hover:text-white transition-colors">Cartão pré-pago</a></li>
                <li><a href="#" className="hover:underline hover:text-white transition-colors">Imprensa</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Conta</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:underline hover:text-white transition-colors">Minha conta</a></li>
                <li><a href="#" className="hover:underline hover:text-white transition-colors">Planos</a></li>
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
