import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { concerns } from '../data/concerns';
import { ingredients } from '../data/ingredients';
import { articles } from '../data/content';
import { fmtDate } from '../lib/util';
import { useStore } from '../lib/store';
import { Empty, Page } from '../components/ui';
const Row = ({ href, label, onRemove }: { href: string; label: string; onRemove: () => void }) => (
  <div className="card flex items-center justify-between py-3"><a href={href} className="hover:text-sage">{label}</a>
    <button aria-label={`Remove ${label}`} onClick={onRemove} className="cursor-pointer rounded-full p-2 text-rose hover:bg-rose-soft"><Trash2 size={16} /></button></div>);
export default function Favorites() {
  const [tab, setTab] = useState<'fav' | 'hist'>('fav');
  const s = useStore();
  const tabBtn = (t: 'fav' | 'hist', l: string) => <button onClick={() => setTab(t)} aria-pressed={tab === t} className={`btn-ghost ${tab === t ? 'bg-sun! border-sun!' : ''}`}>{l}</button>;
  const fav = (type: 'concern' | 'ingredient' | 'article') => s.favorites.filter(f => f.type === type);
  const group = (title: string, children: React.ReactNode, n: number) => <section className="mb-8"><h2 className="h2 mb-3">{title}</h2>{n ? <div className="grid gap-3 sm:grid-cols-2">{children}</div> : <Empty>Nothing saved here yet.</Empty>}</section>;
  return (
    <Page title="Favorites & history" lead="Everything you saved and explored. It stays on this device only.">
      <div className="mb-6 flex gap-2">{tabBtn('fav', 'Favorites')}{tabBtn('hist', 'History')}</div>
      {tab === 'fav' ? <>
        {group('Concerns', fav('concern').map(f => { const c = concerns.find(x => x.id === f.id)!; return <Row key={f.id} href={`#/concerns/${c.id}`} label={c.name} onRemove={() => s.toggleFav('concern', c.id)} />; }), fav('concern').length)}
        {group('Ingredients', fav('ingredient').map(f => { const i = ingredients.find(x => x.id === f.id)!; return <Row key={f.id} href={`#/ingredients/${i.id}`} label={i.name} onRemove={() => s.toggleFav('ingredient', i.id)} />; }), fav('ingredient').length)}
        {group('Articles', fav('article').map(f => { const a = articles.find(x => x.id === f.id)!; return <Row key={f.id} href={`#/article/${a.id}`} label={a.title} onRemove={() => s.toggleFav('article', a.id)} />; }), fav('article').length)}
      </> : <>
        {group('Explored concerns', s.recentC.map(id => <Row key={id} href={`#/concerns/${id}`} label={concerns.find(c => c.id === id)!.name} onRemove={() => s.removeRecent('c', id)} />), s.recentC.length)}
        {group('Recently viewed ingredients', s.recentI.map(id => <Row key={id} href={`#/ingredients/${id}`} label={ingredients.find(i => i.id === id)!.name} onRemove={() => s.removeRecent('i', id)} />), s.recentI.length)}
        {group('Saved concerns', fav('concern').map(f => <Row key={f.id} href={`#/concerns/${f.id}`} label={concerns.find(c => c.id === f.id)!.name} onRemove={() => s.toggleFav('concern', f.id)} />), fav('concern').length)}
        {group('Journal entries', s.journal.map(e => <Row key={e.id} href="#/journal" label={`${fmtDate(e.date)} · ${concerns.find(c => c.id === e.concernId)?.name}`} onRemove={() => confirm('Delete this journal entry?') && s.deleteEntry(e.id)} />), s.journal.length)}
        {(s.recentC.length > 0 || s.recentI.length > 0) && <button className="btn-ghost" onClick={() => confirm('Clear explored concerns and viewed ingredients?') && s.clearHistory()}>Clear browsing history</button>}
      </>}
    </Page>);
}
