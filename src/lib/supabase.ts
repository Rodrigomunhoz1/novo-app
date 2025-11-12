import { createClient } from '@supabase/supabase-js'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

// Configuração do cliente Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://lvjwcruikwsbymbkvvnl.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Validação de configuração
if (!supabaseAnonKey) {
  console.warn('⚠️ SUPABASE_ANON_KEY não configurada. Configure nas variáveis de ambiente.')
}

// Cliente padrão para uso geral
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  },
  global: {
    headers: {
      'x-application-name': 'cinestream',
    },
  },
})

// Cliente para componentes (com melhor suporte a SSR)
export const createSupabaseClient = () => {
  if (typeof window !== 'undefined') {
    return createClientComponentClient()
  }
  return supabase
}

// Types para o banco de dados
export type User = {
  id: string
  email: string
  name: string
  created_at: string
}

export type Content = {
  id: number
  title: string
  description: string
  image_url: string
  type: 'movie' | 'series'
  rating: number
  year: number
  duration: string
  category: string
  featured: boolean
  created_at: string
}

export type UserProgress = {
  id: number
  user_id: string
  content_id: number
  progress: number
  last_watched: string
}

export type UserFavorite = {
  id: number
  user_id: string
  content_id: number
  created_at: string
}

// Helper functions para autenticação com tratamento de erros robusto
export const signUp = async (email: string, password: string, name: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
        emailRedirectTo: `${window.location.origin}/dashboard`,
      }
    })
    
    if (error) throw error
    
    // Criar registro na tabela users
    if (data.user) {
      const { error: userError } = await supabase
        .from('users')
        .insert([
          { id: data.user.id, email, name }
        ])
      
      if (userError && userError.code !== '23505') { // Ignora erro de duplicação
        console.error('Erro ao criar usuário:', userError)
      }
    }
    
    return data
  } catch (error: any) {
    console.error('Erro no signUp:', error)
    throw new Error(error.message || 'Erro ao criar conta')
  }
}

export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) throw error
    return data
  } catch (error: any) {
    console.error('Erro no signIn:', error)
    throw new Error(error.message || 'Erro ao fazer login')
  }
}

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  } catch (error: any) {
    console.error('Erro no signOut:', error)
    throw new Error(error.message || 'Erro ao fazer logout')
  }
}

export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  } catch (error: any) {
    console.error('Erro ao buscar usuário:', error)
    return null
  }
}

export const getSession = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) throw error
    return session
  } catch (error: any) {
    console.error('Erro ao buscar sessão:', error)
    return null
  }
}

// Helper functions para conteúdo com tratamento de erros
export const getContent = async (type?: 'movie' | 'series') => {
  try {
    let query = supabase
      .from('content')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (type) {
      query = query.eq('type', type)
    }
    
    const { data, error } = await query
    
    if (error) throw error
    return data as Content[]
  } catch (error: any) {
    console.error('Erro ao buscar conteúdo:', error)
    return []
  }
}

export const getFeaturedContent = async () => {
  try {
    const { data, error } = await supabase
      .from('content')
      .select('*')
      .eq('featured', true)
      .order('rating', { ascending: false })
      .limit(5)
    
    if (error) throw error
    return data as Content[]
  } catch (error: any) {
    console.error('Erro ao buscar conteúdo em destaque:', error)
    return []
  }
}

export const getContentById = async (id: number) => {
  try {
    const { data, error } = await supabase
      .from('content')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data as Content
  } catch (error: any) {
    console.error('Erro ao buscar conteúdo por ID:', error)
    return null
  }
}

// Helper functions para progresso com tratamento de erros
export const getUserProgress = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('user_progress')
      .select(`
        *,
        content (*)
      `)
      .eq('user_id', userId)
      .order('last_watched', { ascending: false })
    
    if (error) throw error
    return data
  } catch (error: any) {
    console.error('Erro ao buscar progresso:', error)
    return []
  }
}

export const updateProgress = async (userId: string, contentId: number, progress: number) => {
  try {
    const { data, error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: userId,
        content_id: contentId,
        progress,
        last_watched: new Date().toISOString()
      }, {
        onConflict: 'user_id,content_id'
      })
    
    if (error) throw error
    return data
  } catch (error: any) {
    console.error('Erro ao atualizar progresso:', error)
    throw new Error(error.message || 'Erro ao atualizar progresso')
  }
}

// Helper functions para favoritos com tratamento de erros
export const getUserFavorites = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('user_favorites')
      .select(`
        *,
        content (*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  } catch (error: any) {
    console.error('Erro ao buscar favoritos:', error)
    return []
  }
}

export const addFavorite = async (userId: string, contentId: number) => {
  try {
    const { data, error } = await supabase
      .from('user_favorites')
      .insert([
        { user_id: userId, content_id: contentId }
      ])
    
    if (error) throw error
    return data
  } catch (error: any) {
    console.error('Erro ao adicionar favorito:', error)
    throw new Error(error.message || 'Erro ao adicionar favorito')
  }
}

export const removeFavorite = async (userId: string, contentId: number) => {
  try {
    const { error } = await supabase
      .from('user_favorites')
      .delete()
      .eq('user_id', userId)
      .eq('content_id', contentId)
    
    if (error) throw error
  } catch (error: any) {
    console.error('Erro ao remover favorito:', error)
    throw new Error(error.message || 'Erro ao remover favorito')
  }
}

export const isFavorite = async (userId: string, contentId: number) => {
  try {
    const { data, error } = await supabase
      .from('user_favorites')
      .select('id')
      .eq('user_id', userId)
      .eq('content_id', contentId)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return !!data
  } catch (error: any) {
    console.error('Erro ao verificar favorito:', error)
    return false
  }
}

// Listener para mudanças de autenticação
export const onAuthStateChange = (callback: (event: string, session: any) => void) => {
  return supabase.auth.onAuthStateChange(callback)
}
