import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';
import { Routes } from './routes';

export function App() {
  return (
    <Router>
      <AuthContextProvider>
        <Routes />
      </AuthContextProvider>
    </Router>
  );
}
