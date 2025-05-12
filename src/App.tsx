// src/App.tsx
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { routes } from './routes';

const TitleUpdater = () => {
  const location = useLocation();

  useEffect(() => {
    const currentRoute = routes.find(r => r.path === location.pathname);
    if (currentRoute) {
      document.title = currentRoute.title;
    }
  }, [location.pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <TitleUpdater />
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
