import { useState } from 'react';
import { Search, Sparkles, ClipboardList } from 'lucide-react';
import { concerns } from '../data/concerns';
import { ingredients } from '../data/ingredients';
import { articles, tips } from '../data/content';
import { has } from '../lib/util';
import { useStore } from '../lib/store';
import { ConcernCard } from '../components/ui';
const POPULAR = ['pimples', 'blackheads', 'dry-flaky-skin', 'dark-spots', 'redness', 'excess-oiliness'];
export default function Home() {
  const { recentC } = useStore(); const [q, setQ] = useState('');
  const res = q.trim() ? [
    ...concerns.filter(c => has(c.name + ' ' + c.description, q)).map(c => ({ href: `#/concerns/${c.id}`, label: c.name, sub: c.category })),
    ...ingredients.filter(i => has(i.name, q)).map(i => ({ href: `#/ingredients/${i.id}`, label: i.name, sub: 'Ingredient' }))] : [];
  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <section className="grid gap-8 rounded-3xl bg-beige px-6 py-12 md:px-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h1 className="h1">Understand your skin before you treat it.</h1>
          <p className="mt-4 max-w-xl text-lg text-ink/70">Plain-language guides to common skin concerns, what may contribute to them, and the ingredients people commonly use.</p>
          <div className="relative mt-6 max-w-lg"><Search className="absolute left-4 top-3 text-ink/40" size={18} />
            <input className="input pl-11" placeholder="Search a concern or ingredient" aria-label="Search" value={q} onChange={e => setQ(e.target.value)} />
            {q.trim() && <ul className="absolute z-10 mt-2 max-h-64 w-full overflow-auto rounded-xl border border-line bg-white shadow-sm">
              {res.length ? res.map(r => <li key={r.href}><a href={r.href} className="flex justify-between px-4 py-2.5 text-sm hover:bg-sage-soft"><span>{r.label}</span><span className="text-ink/50">{r.sub}</span></a></li>)
                : <li className="px-4 py-3 text-sm text-ink/60">No matches. Try “pimples” or “niacinamide”.</li>}</ul>}</div>
        </div>
        <div className="self-end rounded-2xl bg-ivory p-5"><p className="flex items-center gap-2 font-serif text-lg"><Sparkles size={18} className="text-rose" />Today’s tip</p>
          <p className="mt-2 text-sm text-ink/80">{tips[new Date().getDate() % tips.length]}</p>
          <a href="#/quiz" className="btn mt-4"><ClipboardList size={16} />Take the questionnaire</a></div>
      </section>
      <h2 className="h2 mt-12 mb-4">Popular concerns</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{POPULAR.map(id => <ConcernCard key={id} c={concerns.find(c => c.id === id)!} />)}</div>
      <h2 className="h2 mt-12 mb-4">Recently explored</h2>
      {recentC.length ? <div className="flex flex-wrap gap-2">{recentC.slice(0, 6).map(id => <a key={id} href={`#/concerns/${id}`} className="btn-ghost">{concerns.find(c => c.id === id)?.name}</a>)}</div>
        : <p className="text-sm text-ink/60">Concerns you open will appear here.</p>}
      <h2 className="h2 mt-12 mb-4">Quick guides</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{articles.map(a => <a key={a.id} href={`#/article/${a.id}`} className="card hover:border-sage"><p className="font-serif text-lg">{a.title}</p><p className="mt-1 text-sm text-ink/70">{a.summary}</p></a>)}</div>
    </div>);
}
