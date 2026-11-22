import { useEffect, useState } from 'react';
import { Search, ArrowLeft } from 'lucide-react';
import { ingredients } from '../data/ingredients';
import { concerns } from '../data/concerns';
import { has } from '../lib/util';
import { useStore } from '../lib/store';
import { Disclaimer, Empty, FavBtn, IngredientCard, List, Page, Sec } from '../components/ui';
export default function Ingredients({ id }: { id?: string }) {
  const [q, setQ] = useState('');
  if (id) return <Detail id={id} />;
  const list = ingredients.filter(i => has(i.name + ' ' + i.uses.join(' '), q));
  return (
    <Page title="Ingredient library" lead="What common skincare ingredients are, what they are used for, and what to watch for.">
      <div className="relative mb-6 md:w-80"><Search className="absolute left-4 top-3 text-ink/40" size={18} /><input className="input pl-11" placeholder="Search ingredients" aria-label="Search ingredients" value={q} onChange={e => setQ(e.target.value)} /></div>
      {list.length ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{list.map(i => <IngredientCard key={i.id} i={i} />)}</div> : <Empty>No ingredients match “{q}”.</Empty>}
    </Page>);
}
function Detail({ id }: { id: string }) {
  const { track } = useStore(); const i = ingredients.find(x => x.id === id);
  useEffect(() => { if (i) track('i', i.id); }, [i, track]);
  if (!i) return <Page title="Ingredient not found"><a href="#/ingredients" className="btn">Back to library</a></Page>;
  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <a href="#/ingredients" className="inline-flex items-center gap-1 text-sm text-sage"><ArrowLeft size={14} />All ingredients</a>
      <div className="mt-4 flex items-start justify-between"><h1 className="h1">{i.name}</h1><FavBtn type="ingredient" id={i.id} /></div>
      <div className="mt-6"><Disclaimer /></div>
      <Sec title="What it is"><p>{i.what}</p></Sec>
      <Sec title="Common skincare uses"><List items={i.uses} /></Sec>
      <Sec title="Concerns it is commonly used for"><div className="flex flex-wrap gap-2">{i.concerns.map(c => <a key={c} href={`#/concerns/${c}`} className="btn-ghost">{concerns.find(x => x.id === c)?.name}</a>)}</div></Sec>
      <Sec title="Possible irritation and precautions"><List items={i.precautions} /></Sec>
      <Sec title="General usage information"><p>{i.usage}</p><p className="mt-2 text-sm text-ink/60">This is general information, not a treatment plan. Follow product directions and ask a professional about strengths and combinations.</p></Sec>
    </div>);
}
