import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { AREAS, concerns } from '../data/concerns';
import { ingredients } from '../data/ingredients';
import { DURATIONS, OBS, SKIN_TYPES, recommend } from '../lib/recommend';
import { useStore } from '../lib/store';
import type { QuizAnswers } from '../types';
import { Disclaimer, List, Page } from '../components/ui';
const blank: QuizAnswers = { skinType: '', concernId: '', area: '', duration: '', observations: [] };
export default function Quiz() {
  const { track } = useStore(); const [a, setA] = useState(blank); const [err, setErr] = useState(''); const [done, setDone] = useState(false);
  const set = (k: keyof QuizAnswers, v: string) => setA(p => ({ ...p, [k]: v }));
  const submit = (e: React.FormEvent) => { e.preventDefault(); if (!a.concernId) return setErr('Choose your main concern to continue.'); setErr(''); track('c', a.concernId); setDone(true); window.scrollTo(0, 0); };
  if (done) {
    const r = recommend(a);
    return (
      <Page title={r.concern.name} lead="Educational suggestions based on your answers. These are possibilities, not a diagnosis.">
        <div className="space-y-6 md:max-w-3xl">
          <Disclaimer />
          {r.seekHelp && <p className="flex gap-3 rounded-2xl bg-sage-soft p-4"><AlertTriangle className="shrink-0 text-sage" size={18} /><span>{r.concern.professionalAdvice}</span></p>}
          <div className="card"><p>{r.concern.description}</p></div>
          {r.notes.length > 0 && <div className="card"><h2 className="h2 mb-3">Based on your answers</h2><List items={r.notes} /></div>}
          <div className="card"><h2 className="h2 mb-3">Factors that may contribute</h2><List items={r.concern.possibleFactors} /></div>
          <div className="card"><h2 className="h2 mb-3">General approaches</h2><List items={r.concern.generalCare} /></div>
          <div className="card"><h2 className="h2 mb-3">Ingredients commonly used</h2><div className="flex flex-wrap gap-2">{r.concern.relatedIngredients.map(i => <a key={i} href={`#/ingredients/${i}`} className="btn-ghost">{ingredients.find(x => x.id === i)?.name}</a>)}</div></div>
          {r.related.length > 0 && <div className="card"><h2 className="h2 mb-3">Other concerns in this area</h2><div className="flex flex-wrap gap-2">{r.related.map(c => <a key={c.id} href={`#/concerns/${c.id}`} className="btn-ghost">{c.name}</a>)}</div></div>}
          <div className="flex gap-3"><a href={`#/concerns/${r.concern.id}`} className="btn">Read the full guide</a><button className="btn-ghost" onClick={() => { setA(blank); setDone(false); }}>Start over</button></div>
        </div>
      </Page>);
  }
  const sel = (label: string, k: keyof QuizAnswers, opts: string[]) => (
    <label className="block"><span className="mb-1 block text-sm font-medium">{label}</span>
      <select className="input" value={a[k] as string} onChange={e => set(k, e.target.value)}><option value="">Select</option>{opts.map(o => <option key={o}>{o}</option>)}</select></label>);
  return (
    <Page title="Concern questionnaire" lead="Answer a few questions and see educational information matched from our local knowledge base.">
      <form onSubmit={submit} className="space-y-5 md:max-w-xl" noValidate>
        <Disclaimer />
        {sel('Skin type (optional)', 'skinType', SKIN_TYPES)}
        <label className="block"><span className="mb-1 block text-sm font-medium">Main concern</span>
          <select className="input" value={a.concernId} onChange={e => set('concernId', e.target.value)} aria-invalid={!!err}><option value="">Select</option>{concerns.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
          {err && <p className="err">{err}</p>}</label>
        {sel('Affected area (optional)', 'area', AREAS)}
        {sel('How long have you noticed it? (optional)', 'duration', DURATIONS)}
        <fieldset><legend className="mb-2 text-sm font-medium">Observations (optional)</legend>
          {OBS.map(o => <label key={o.id} className="flex items-center gap-3 py-1 text-sm"><input type="checkbox" className="accent-sage" checked={a.observations.includes(o.id)}
            onChange={e => setA(p => ({ ...p, observations: e.target.checked ? [...p.observations, o.id] : p.observations.filter(x => x !== o.id) }))} />{o.label}</label>)}</fieldset>
        <button className="btn" type="submit">Show educational information</button>
      </form>
    </Page>);
}
