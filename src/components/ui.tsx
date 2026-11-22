import { useState, type ReactNode } from 'react';
import { Heart, Menu, X, Info, ChevronRight } from 'lucide-react';
import type { FavType, Ingredient, SkinConcern } from '../types';
import { useStore } from '../lib/store';
const NAV: [string, string][] = [['', 'Home'], ['concerns', 'Explore Concerns'], ['ingredients', 'Ingredient Library'], ['journal', 'Skin Journal'], ['favorites', 'Favorites'], ['about', 'About']];
export function Header({ route }: { route: string }) {
  const [open, setOpen] = useState(false);
  const link = (p: string, l: string, cls: string) => (
    <a key={p} href={`#/${p}`} onClick={() => setOpen(false)} aria-current={route === p ? 'page' : undefined}
      className={`${cls} ${route === p ? 'bg-sage-soft text-sage' : 'hover:bg-beige'}`}>{l}</a>);
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-ivory/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#/" className="font-serif text-2xl">Skin<span className="text-rose">Wise</span></a>
        <nav className="hidden gap-1 lg:flex">{NAV.map(([p, l]) => link(p, l, 'rounded-full px-4 py-2 text-sm'))}</nav>
        <button className="cursor-pointer lg:hidden" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && <nav className="grid gap-1 border-t border-line px-5 py-3 lg:hidden">{NAV.map(([p, l]) => link(p, l, 'rounded-lg px-3 py-2'))}</nav>}
    </header>);
}
export function FavBtn({ type, id }: { type: FavType; id: string }) {
  const { isFav, toggleFav } = useStore(); const on = isFav(type, id);
  return <button onClick={() => toggleFav(type, id)} aria-pressed={on} aria-label={on ? 'Remove from favorites' : 'Add to favorites'}
    className="cursor-pointer rounded-full p-2 text-rose hover:bg-rose-soft"><Heart size={18} fill={on ? 'currentColor' : 'none'} /></button>;
}
export const Disclaimer = () => (
  <p className="flex gap-3 rounded-2xl bg-rose-soft p-4 text-sm"><Info className="mt-0.5 shrink-0 text-rose" size={18} />
    <span>SkinWise offers general education only. It cannot diagnose conditions or identify the cause of your skin concern, and skin concerns often have several causes. Patch test new products, and see a dermatologist for severe, persistent or worsening concerns.</span></p>);
export const Empty = ({ children }: { children: ReactNode }) => <p className="rounded-2xl border border-dashed border-line p-6 text-center text-sm text-ink/60">{children}</p>;
export const Page = ({ title, lead, children }: { title: string; lead?: string; children: ReactNode }) => (
  <div className="mx-auto max-w-6xl px-5 py-10"><h1 className="h1">{title}</h1>{lead && <p className="mt-3 max-w-2xl text-lg text-ink/70">{lead}</p>}<div className="mt-8">{children}</div></div>);
export const ConcernCard = ({ c }: { c: SkinConcern }) => (
  <div className="card flex flex-col gap-2"><div className="flex items-start justify-between"><span className="chip">{c.category}</span><FavBtn type="concern" id={c.id} /></div>
    <a href={`#/concerns/${c.id}`} className="h2 hover:text-sage">{c.name}</a><p className="line-clamp-3 text-sm text-ink/70">{c.description}</p>
    <a href={`#/concerns/${c.id}`} className="mt-auto inline-flex items-center gap-1 pt-2 text-sm text-sage">Read guide <ChevronRight size={14} /></a></div>);
export const IngredientCard = ({ i }: { i: Ingredient }) => (
  <div className="card flex flex-col gap-2"><div className="flex items-start justify-between"><a href={`#/ingredients/${i.id}`} className="h2 hover:text-sage">{i.name}</a><FavBtn type="ingredient" id={i.id} /></div>
    <p className="text-sm text-ink/70">{i.what}</p><a href={`#/ingredients/${i.id}`} className="mt-auto inline-flex items-center gap-1 pt-2 text-sm text-sage">Read guide <ChevronRight size={14} /></a></div>);
export const List = ({ items }: { items: string[] }) => <ul className="list-disc space-y-1.5 pl-5 marker:text-sage">{items.map(x => <li key={x}>{x}</li>)}</ul>;
export const Sec = ({ title, children }: { title: string; children: ReactNode }) => <section className="border-t border-line py-6"><h2 className="h2 mb-3">{title}</h2>{children}</section>;
