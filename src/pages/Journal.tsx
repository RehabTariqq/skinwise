import { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { concerns } from '../data/concerns';
import { fmtDate, today, uid } from '../lib/util';
import { useStore } from '../lib/store';
import { Empty, Page } from '../components/ui';
const blank = () => ({ id: '', date: today(), concernId: '', notes: '' });
export default function Journal() {
  const { journal, saveEntry, deleteEntry } = useStore();
  const [f, setF] = useState(blank); const [err, setErr] = useState<Record<string, string>>({});
  const submit = (e: React.FormEvent) => {
    e.preventDefault(); const er: Record<string, string> = {};
    if (!f.date) er.date = 'Choose a date.'; else if (f.date > today()) er.date = 'Date cannot be in the future.';
    if (!f.concernId) er.concernId = 'Select a concern.';
    if (!f.notes.trim()) er.notes = 'Add a short note about your skin.'; else if (f.notes.length > 500) er.notes = 'Keep notes under 500 characters.';
    setErr(er); if (Object.keys(er).length) return;
    saveEntry({ ...f, notes: f.notes.trim(), id: f.id || uid(), createdAt: Date.now() }); setF(blank());
  };
  const sorted = [...journal].sort((a, b) => b.date.localeCompare(a.date) || b.createdAt - a.createdAt);
  return (
    <Page title="Skin journal" lead="Note how your skin looks and feels. Patterns over time can be useful to share with a professional.">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <form onSubmit={submit} className="card space-y-4 self-start" noValidate>
          <h2 className="h2">{f.id ? 'Edit entry' : 'New entry'}</h2>
          <label className="block text-sm font-medium">Date<input type="date" max={today()} className="input mt-1" value={f.date} onChange={e => setF({ ...f, date: e.target.value })} />{err.date && <p className="err">{err.date}</p>}</label>
          <label className="block text-sm font-medium">Current concern<select className="input mt-1" value={f.concernId} onChange={e => setF({ ...f, concernId: e.target.value })}><option value="">Select</option>{concerns.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select>{err.concernId && <p className="err">{err.concernId}</p>}</label>
          <label className="block text-sm font-medium">Notes<textarea rows={4} className="input mt-1" value={f.notes} placeholder="Products used, weather, sleep, how skin felt…" onChange={e => setF({ ...f, notes: e.target.value })} />
            <span className="text-xs font-normal text-ink/50">{f.notes.length}/500</span>{err.notes && <p className="err">{err.notes}</p>}</label>
          <div className="flex gap-2"><button className="btn" type="submit">{f.id ? 'Save changes' : 'Add entry'}</button>{f.id && <button type="button" className="btn-ghost" onClick={() => { setF(blank()); setErr({}); }}>Cancel</button>}</div>
        </form>
        <div className="space-y-3">
          {sorted.length ? sorted.map(e => (
            <article key={e.id} className="card"><div className="flex items-start justify-between gap-3"><div><p className="text-sm text-ink/60">{fmtDate(e.date)}</p><p className="font-serif text-lg">{concerns.find(c => c.id === e.concernId)?.name ?? 'Concern'}</p></div>
              <div className="flex"><button aria-label="Edit entry" className="cursor-pointer rounded-full p-2 hover:bg-beige" onClick={() => { setF(e); window.scrollTo(0, 0); }}><Pencil size={16} /></button>
                <button aria-label="Delete entry" className="cursor-pointer rounded-full p-2 text-rose hover:bg-rose-soft" onClick={() => { if (confirm('Delete this entry?')) { deleteEntry(e.id); if (f.id === e.id) setF(blank()); } }}><Trash2 size={16} /></button></div></div>
              <p className="mt-2 whitespace-pre-wrap text-sm">{e.notes}</p></article>))
            : <Empty>No entries yet. Add your first observation to start tracking.</Empty>}
        </div>
      </div>
    </Page>);
}
