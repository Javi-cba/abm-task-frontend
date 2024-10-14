import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import CmpHeader from './components/publico/CmpHeader';
import PageInicio from './page/publico/PageInicio';
import PageTask from './page/privado/PageTask';
import Unauthorized from './page/status/PageUnauthorized';
import NotFound from './page/status/PageNotFound';
import PrivateRoute from './page/status/PrivateRoute';
import CmpLoad from './components/publico/CmpLoad';
import './App.css';

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <CmpLoad />;
  }

  return (
    <div className="App">
      <Router>
        <CmpHeader /> {/* Siempre se muestra */}
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<PageInicio />} />

          {/* Ruta protegida */}
          <Route
            path="/tareas"
            element={
              <PrivateRoute>
                <PageTask />
              </PrivateRoute>
            }
          />
          {/* Ruta de unauthorized */}
          <Route path="/unauthorized" element={<Unauthorized />} />
          {/* Ruta 404 */}
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
