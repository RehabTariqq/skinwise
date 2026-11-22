import type { Ingredient } from '../types';
const s = (x: string) => x.split('|');
const i = (id: string, name: string, what: string, uses: string, concerns: string, precautions: string, usage: string): Ingredient =>
  ({ id, name, what, uses: s(uses), concerns: s(concerns), precautions: s(precautions), usage });
export const ingredients: Ingredient[] = [
  i('salicylic-acid', 'Salicylic acid', 'A beta hydroxy acid (BHA) that is oil-soluble, so it can work inside pores.', 'Gentle exfoliation|Helping unclog pores|Smoothing texture', 'pimples|blackheads|whiteheads|clogged-pores|forehead-acne|excess-oiliness|rough-skin',
    'Can cause dryness, stinging or peeling|Avoid on broken skin|Ask a professional if pregnant or using other strong actives|Patch test first', 'Usually found in cleansers, toners and leave-on products. Start infrequently and follow product directions.'),
  i('niacinamide', 'Niacinamide', 'A form of vitamin B3 used in many leave-on products.', 'Supporting the skin barrier|Helping with the look of oiliness and pores|Supporting an even-looking tone', 'excess-oiliness|uneven-skin-tone|dark-spots|pimples|under-eye-darkness|clogged-pores',
    'Generally well tolerated, but may cause flushing or irritation in some|Patch test first', 'Commonly layered into daily routines. Follow product directions and introduce gradually.'),
  i('hyaluronic-acid', 'Hyaluronic acid', 'A humectant that attracts and holds water in the skin surface.', 'Boosting surface hydration|Plumping the look of skin|Supporting moisturizer performance', 'dehydrated-skin|dry-flaky-skin|skin-sensitivity|under-eye-darkness|uneven-texture',
    'Rarely irritating, but some people react to the full formula|Apply to damp skin and seal with moisturizer', 'Used in serums and moisturizers. Layering it under a moisturizer is common.'),
  i('benzoyl-peroxide', 'Benzoyl peroxide', 'An over-the-counter acne ingredient that works against acne-related bacteria and helps shed dead skin.', 'Targeting inflamed pimples|Supporting acne-prone routines', 'pimples',
    'Can cause dryness, redness and peeling|May bleach fabrics and hair|Avoid on broken skin|Patch test first|Ask a professional about use with other actives', 'Usually in washes or leave-on spot or all-over products. Start gradually per product directions.'),
  i('retinoids', 'Retinoids', 'Vitamin A derivatives. Some are available over the counter and others by prescription.', 'Supporting skin cell turnover|Helping clogged pores|Supporting smoother texture and tone', 'pimples|blackheads|whiteheads|clogged-pores|uneven-texture|dark-spots|uneven-skin-tone',
    'Can cause dryness, irritation and sun sensitivity|Not recommended during pregnancy without medical advice|Increase use slowly|Always use sunscreen|Prescription versions require a professional', 'Usually used in the evening and introduced gradually. Ask a professional for guidance.'),
  i('ceramides', 'Ceramides', 'Lipids naturally found in the skin barrier, also used in moisturizers.', 'Supporting the skin barrier|Reducing water loss|Comforting dry skin', 'dry-flaky-skin|skin-sensitivity|redness|dehydrated-skin|rough-skin',
    'Generally gentle|Rich formulas may feel heavy on very oily skin|Patch test first', 'Found in moisturizers and cleansers. Often paired with other barrier-supporting ingredients.'),
  i('glycerin', 'Glycerin', 'A widely used humectant that draws water into the skin surface.', 'Hydration|Softening skin|Supporting moisturizers', 'dry-flaky-skin|dehydrated-skin|skin-sensitivity|redness|excess-oiliness|rough-skin|under-eye-darkness',
    'Usually well tolerated|Patch test as with any product', 'Present in many cleansers and moisturizers. Follow product directions.'),
  i('azelaic-acid', 'Azelaic acid', 'An acid found in some skincare products; stronger forms are available by prescription.', 'Supporting blemish-prone skin|Helping with the look of marks and redness|Supporting even-looking tone', 'pimples|dark-spots|redness|uneven-skin-tone|blackheads|whiteheads|forehead-acne',
    'May cause stinging, tingling or dryness|Patch test first|Ask a professional about prescription strengths', 'Used in leave-on products. Introduce gradually and follow product directions.'),
];
