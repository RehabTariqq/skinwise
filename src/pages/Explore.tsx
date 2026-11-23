import { useEffect, useState } from 'react';
import { Search, ArrowLeft, AlertTriangle } from 'lucide-react';
import { CATEGORIES, concerns } from '../data/concerns';
import { ingredients } from '../data/ingredients';
import { has } from '../lib/util';
import { useStore } from '../lib/store';
import { ConcernCard, Disclaimer, Empty, FavBtn, List, Page, Sec } from '../components/ui';
export default function Explore({ id }: { id?: string }) {
  const [q, setQ] = useState(''); const [cat, setCat] = useState('All');
  const list = concerns.filter(c => (cat === 'All' || c.category === cat) && has(c.name, q));
  if (id) return <Detail id={id} />;
  return (
    <Page title="Explore concerns" lead="Browse common skin concerns and learn what may contribute to them.">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative md:w-80"><Search className="absolute left-4 top-3 text-ink/40" size={18} /><input className="input pl-11" placeholder="Search by name" aria-label="Search concerns" value={q} onChange={e => setQ(e.target.value)} /></div>
        <div className="flex flex-wrap gap-2">{['All', ...CATEGORIES].map(c => <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c} className={`btn-ghost ${cat === c ? 'bg-sun! border-sun!' : ''}`}>{c}</button>)}</div>
      </div>
      {list.length ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{list.map(c => <ConcernCard key={c.id} c={c} />)}</div>
        : <Empty>No concerns match your search. <button className="underline" onClick={() => { setQ(''); setCat('All'); }}>Clear filters</button></Empty>}
    </Page>);
}
function Detail({ id }: { id: string }) {
  const { track } = useStore(); const c = concerns.find(x => x.id === id);
  useEffect(() => { if (c) track('c', c.id); }, [c, track]);
  if (!c) return <Page title="Concern not found"><a href="#/concerns" className="btn">Back to concerns</a></Page>;
  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <a href="#/concerns" className="inline-flex items-center gap-1 text-sm text-sage"><ArrowLeft size={14} />All concerns</a>
      <div className="mt-4 flex items-start justify-between gap-4"><div><span className="chip">{c.category}</span><h1 className="h1 mt-2">{c.name}</h1></div><FavBtn type="concern" id={c.id} /></div>
      <div className="mt-6"><Disclaimer /></div>
      <Sec title="What is this concern?"><p>{c.description}</p></Sec>
      <Sec title="Common characteristics"><List items={c.characteristics} /></Sec>
      <Sec title="Possible contributing factors"><p className="mb-3 text-sm text-ink/60">These are possibilities. Not every factor applies to every person.</p><List items={c.possibleFactors} /></Sec>
      <Sec title="General skincare approaches"><List items={c.generalCare} /></Sec>
      <Sec title="Commonly used ingredients"><div className="flex flex-wrap gap-2">{c.relatedIngredients.map(i => <a key={i} href={`#/ingredients/${i}`} className="btn-ghost">{ingredients.find(x => x.id === i)?.name}</a>)}</div></Sec>
      <Sec title="May irritate some people"><List items={c.irritants} /></Sec>
      <Sec title="When to seek professional advice"><p className="flex gap-3 rounded-2xl bg-sage-soft p-4"><AlertTriangle className="shrink-0 text-sage" size={18} /><span>{c.professionalAdvice}</span></p></Sec>
    </div>);
}
