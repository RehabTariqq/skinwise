import { concerns } from '../data/concerns';
import type { QuizAnswers } from '../types';
export const SKIN_TYPES = ['Oily', 'Dry', 'Combination', 'Sensitive', 'Normal', 'Not sure'];
export const DURATIONS = ['Less than 2 weeks', '2–8 weeks', '2–6 months', 'More than 6 months', 'On and off for years'];
export const OBS = [
  { id: 'hormonal', label: 'Changes with my cycle or stress', note: 'Hormonal shifts and stress are sometimes linked with changes in oil and breakouts for some people. Tracking this in your journal may reveal a pattern.' },
  { id: 'products', label: 'Started after a new product', note: 'A recent product may be one possible contributor. Pausing new items and reintroducing them one at a time can help you notice a pattern.' },
  { id: 'burning', label: 'Itching, stinging or burning', note: 'Stinging or burning can suggest irritation or a stressed skin barrier. Simplify your routine and avoid fragrance and strong actives for now.' },
  { id: 'sun', label: 'Worse after sun exposure', note: 'Sun can darken marks and aggravate redness. Daily broad-spectrum sunscreen is a common starting point.' },
  { id: 'weather', label: 'Worse in dry or cold weather', note: 'Weather and low humidity can affect the skin barrier. Gentle cleansing and moisturizing may help.' },
  { id: 'severe', label: 'Painful, deep, bleeding or spreading', note: 'Painful, deep, bleeding or spreading changes deserve professional attention rather than self-care.', flag: true },
] as { id: string; label: string; note: string; flag?: boolean }[];
const TYPE_NOTES: Record<string, string> = {
  Oily: 'With oily skin, lightweight, non-comedogenic textures are often more comfortable.',
  Dry: 'With dry skin, richer moisturizers and gentler cleansers are commonly preferred.',
  Combination: 'Combination skin may need different care in different zones.',
  Sensitive: 'With sensitive skin, introduce products slowly and patch test every time.',
};
export function recommend(a: QuizAnswers) {
  const concern = concerns.find(c => c.id === a.concernId)!;
  const notes: string[] = [];
  if (TYPE_NOTES[a.skinType]) notes.push(TYPE_NOTES[a.skinType]);
  a.observations.forEach(id => { const o = OBS.find(x => x.id === id); if (o) notes.push(o.note); });
  const long = ['More than 6 months', 'On and off for years'].includes(a.duration);
  if (long) notes.push('Concerns lasting many months or recurring over years are worth discussing with a professional.');
  const seekHelp = long || a.observations.some(id => OBS.find(o => o.id === id)?.flag);
  const related = a.area ? concerns.filter(c => c.id !== concern.id && c.areas.includes(a.area)).slice(0, 3) : [];
  return { concern, notes, related, seekHelp };
}
