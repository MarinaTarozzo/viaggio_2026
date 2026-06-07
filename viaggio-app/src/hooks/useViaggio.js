import { useState, useEffect, useCallback } from 'react'
import { supabase, hasSupabase } from '../lib/supabase'
import { sugestoesIniciais } from '../data/data'

export function useViaggio(userName) {
  const [sugg, setSugg] = useState([])
  const [ratings, setRatings] = useState({})
  const [loading, setLoading] = useState(hasSupabase)

  /* ---------- load from supabase ---------- */
  const loadAll = useCallback(async () => {
    if (!hasSupabase || !userName) return
    const [suggsRes, votesRes, ratingsRes] = await Promise.all([
      supabase.from('suggestions').select('*').order('created_at'),
      supabase.from('votes').select('suggestion_id, user_name'),
      supabase.from('ratings').select('item_key, value'),
    ])

    const voteCounts = {}
    const myVotes = new Set()
    votesRes.data?.forEach(v => {
      voteCounts[v.suggestion_id] = (voteCounts[v.suggestion_id] || 0) + 1
      if (v.user_name === userName) myVotes.add(v.suggestion_id)
    })

    setSugg((suggsRes.data || []).map(s => ({
      ...s,
      cidadeId: s.cidade_id,
      votos: voteCounts[s.id] || 0,
      voted: myVotes.has(s.id),
    })))

    const groups = {}
    ratingsRes.data?.forEach(r => {
      if (!groups[r.item_key]) groups[r.item_key] = []
      groups[r.item_key].push(r.value)
    })
    setRatings(Object.fromEntries(
      Object.entries(groups).map(([k, vals]) => [
        k, Math.round(vals.reduce((a, b) => a + b, 0) / vals.length * 10) / 10,
      ])
    ))
    setLoading(false)
  }, [userName])

  /* ---------- init ---------- */
  useEffect(() => {
    if (!hasSupabase) {
      setSugg(sugestoesIniciais.map(s => ({ ...s, voted: false })))
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!hasSupabase || !userName) return
    loadAll()
    // Auto-refresh every 30s so family members see each other's updates
    const timer = setInterval(loadAll, 30000)
    return () => clearInterval(timer)
  }, [loadAll, userName])

  /* ---------- vote ---------- */
  const onVote = async (id) => {
    const s = sugg.find(x => x.id === id)
    if (!s) return
    const nowVoted = !s.voted
    setSugg(list => list.map(x => x.id === id
      ? { ...x, voted: nowVoted, votos: x.votos + (nowVoted ? 1 : -1) }
      : x
    ))
    if (!hasSupabase) return
    if (nowVoted) {
      await supabase.from('votes').insert({ suggestion_id: id, user_name: userName })
    } else {
      await supabase.from('votes').delete().eq('suggestion_id', id).eq('user_name', userName)
    }
  }

  /* ---------- rate ---------- */
  const rate = async (key, value) => {
    setRatings(r => ({ ...r, [key]: value }))
    if (!hasSupabase) return
    await supabase.from('ratings').upsert({
      item_key: key, user_name: userName, value,
      updated_at: new Date().toISOString(),
    })
  }

  /* ---------- save (create or edit) suggestion ---------- */
  const saveSug = async (f, id) => {
    if (!hasSupabase) {
      if (id) {
        setSugg(list => list.map(s => s.id === id ? { ...s, ...f, cidadeId: f.cidadeId } : s))
      } else {
        setSugg(list => [{
          id: 'u' + Date.now(), ...f, cidadeId: f.cidadeId,
          votos: 1, voted: true, visitado: false,
        }, ...list])
      }
      return
    }
    if (id) {
      await supabase.from('suggestions').update({
        nome: f.nome, categoria: f.categoria, cidade_id: f.cidadeId,
        quem: f.quem, motivo: f.motivo || '', link: f.link || '',
      }).eq('id', id)
    } else {
      const newId = 'u' + Date.now()
      await supabase.from('suggestions').insert({
        id: newId, nome: f.nome, categoria: f.categoria, cidade_id: f.cidadeId,
        quem: f.quem, motivo: f.motivo || '', link: f.link || '', visitado: false,
      })
      await supabase.from('votes').insert({ suggestion_id: newId, user_name: userName })
    }
    await loadAll()
  }

  /* ---------- delete suggestion ---------- */
  const deleteSug = async (id) => {
    setSugg(list => list.filter(x => x.id !== id))
    if (!hasSupabase) return
    await supabase.from('suggestions').delete().eq('id', id)
  }

  /* ---------- toggle visited ---------- */
  const toggleVisited = async (id) => {
    const s = sugg.find(x => x.id === id)
    if (!s) return
    const next = !s.visitado
    setSugg(list => list.map(x => x.id === id ? { ...x, visitado: next } : x))
    if (!hasSupabase) return
    await supabase.from('suggestions').update({ visitado: next }).eq('id', id)
  }

  return { sugg, ratings, loading, onVote, rate, saveSug, deleteSug, toggleVisited }
}
