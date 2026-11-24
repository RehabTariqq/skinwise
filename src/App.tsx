import { useRoute } from './lib/router';
import { StoreProvider } from './lib/store';
import { Header } from './components/ui';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Ingredients from './pages/Ingredients';
import Journal from './pages/Journal';
import Favorites from './pages/Favorites';
import Quiz from './pages/Quiz';
import { About, Article } from './pages/About';
export default function App() {
  const [a, b] = useRoute();
  const page = a === 'concerns' ? <Explore id={b} /> : a === 'ingredients' ? <Ingredients id={b} /> : a === 'journal' ? <Journal />
    : a === 'favorites' ? <Favorites /> : a === 'quiz' ? <Quiz /> : a === 'about' ? <About /> : a === 'article' && b ? <Article id={b} /> : <Home />;
  return (
    <StoreProvider><Header route={a === 'quiz' || a === 'article' ? '' : a ?? ''} /><main>{page}</main>
      <footer className="mt-16 border-t-4 border-sun bg-deep px-5 py-8 text-center text-xs text-white/70">SkinWise is for education only and is not medical advice.</footer></StoreProvider>);
}
