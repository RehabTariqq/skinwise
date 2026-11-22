import type { Article } from '../types';
export const tips = [
  'Introduce one new product at a time so you can notice how your skin responds.',
  'Skin often benefits from simple, consistent routines more than frequent changes.',
  'Daily sunscreen is a foundation of most skincare approaches.',
  'Picking at blemishes can prolong marks and may lead to scarring.',
  'Patch test new products on a small area before using them on your whole face.',
];
export const articles: Article[] = [
  { id: 'patch-testing', title: 'How to patch test a new product', summary: 'A simple way to check for irritation before committing.',
    body: ['Apply a small amount of the product to a discreet area, such as the inner forearm or behind the ear, once a day for a few days.', 'Watch for redness, itching, burning or swelling. If these appear, wash the area and stop using the product.', 'A patch test lowers the chance of a reaction but cannot rule it out. Stop use and seek help if you have a severe reaction.'] },
  { id: 'gentle-routine', title: 'Building a gentle basic routine', summary: 'Cleanser, moisturizer and sunscreen as a starting point.',
    body: ['Many people begin with a gentle cleanser, a moisturizer suited to their skin, and a daily broad-spectrum sunscreen.', 'Add ingredients one at a time, a couple of weeks apart, so you can tell what suits you.', 'If irritation appears, simplifying the routine is often a sensible first step.'] },
  { id: 'avoid-picking', title: 'Why picking tends to backfire', summary: 'Squeezing can extend healing and leave marks.',
    body: ['Picking can push material deeper, increase inflammation and break the skin surface.', 'This may lengthen healing time and increase the chance of dark marks or scarring.', 'If you feel the urge, a hydrocolloid patch or leaving the area alone is generally gentler.'] },
  { id: 'sunscreen-basics', title: 'Sunscreen: the quiet foundation', summary: 'Why daily protection matters for most concerns.',
    body: ['Sun exposure can deepen dark spots and redness and affect skin texture over time.', 'A broad-spectrum sunscreen applied daily and re-applied as directed is widely recommended.', 'Choose a texture you will actually use; non-comedogenic options exist for blemish-prone skin.'] },
];
