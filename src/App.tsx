import { LoadingScreen } from './components/LoadingScreen';
import { Home } from './pages/home';
import { useSession } from './providers/Session/useSession';

function App() {
  const { appLoading } = useSession();

  return appLoading ? <LoadingScreen /> : <Home />;
}

export default App;
