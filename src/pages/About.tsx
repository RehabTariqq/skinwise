import { articles } from '../data/content';
import { ArrowLeft } from 'lucide-react';
import { Disclaimer, FavBtn, Page } from '../components/ui';
export function About() {
  return (
    <Page title="About SkinWise" lead="A calm place to learn about your skin.">
      <div className="max-w-2xl space-y-5">
        <p>SkinWise explains common skin concerns, what may contribute to them, and how skincare ingredients are generally used. Everything runs in your browser. Your journal and favorites are stored on this device and never sent anywhere.</p>
        <p>The questionnaire uses simple, predefined rules to match your answers to educational information. It does not use AI and cannot diagnose anything.</p>
        <Disclaimer />
        <p>Avoid starting several new actives at once, patch test new products, and see a dermatologist for severe, persistent or worsening concerns. Seek urgent care for swelling of the face, trouble breathing, fever or rapidly spreading skin changes.</p>
        <h2 className="h2 pt-4">Guides</h2>
        <ul className="space-y-1">{articles.map(a => <li key={a.id}><a className="text-sage underline" href={`#/article/${a.id}`}>{a.title}</a></li>)}</ul>
      </div>
    </Page>);
}
export function Article({ id }: { id: string }) {
  const a = articles.find(x => x.id === id);
  if (!a) return <Page title="Guide not found"><a href="#/" className="btn">Back home</a></Page>;
  return (
    <div className="mx-auto max-w-2xl px-5 py-10"><a href="#/about" className="inline-flex items-center gap-1 text-sm text-sage"><ArrowLeft size={14} />All guides</a>
      <div className="mt-4 flex items-start justify-between gap-3"><h1 className="h1">{a.title}</h1><FavBtn type="article" id={a.id} /></div>
      <div className="mt-6 space-y-4 text-lg leading-relaxed">{a.body.map(p => <p key={p}>{p}</p>)}</div><div className="mt-8"><Disclaimer /></div></div>);
}
