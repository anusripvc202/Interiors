import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop';

// Import Context
import { AuthProvider } from './context/AuthContext';

// Import Pages
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import ProcessPage from './pages/ProcessPage';
import ContactPage from './pages/ContactPage';
import DesignerProfilePage from './pages/DesignerProfilePage';
import LoginPage from './pages/LoginPage';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container" style={{ padding: '5rem 2rem', background: '#FFF0F0', color: '#C62828', border: '1px solid #E57373', margin: '4rem auto', borderRadius: '8px', textAlign: 'left' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '1rem' }}>Interiors Portal Rendering Error</h2>
          <p style={{ fontSize: '0.95rem', color: '#333', marginBottom: '1.5rem' }}>An exception occurred while rendering the page components:</p>
          <pre style={{ background: '#FFF', padding: '1.5rem', borderRadius: '4px', border: '1px solid #FFCDD2', overflowX: 'auto', fontFamily: 'monospace', fontSize: '0.9rem', color: '#000' }}>
            {this.state.error && this.state.error.toString()}
          </pre>
          <pre style={{ fontSize: '0.75rem', opacity: 0.8, whiteSpace: 'pre-wrap', marginTop: '1.5rem', background: '#F5F5F5', padding: '1rem', borderRadius: '4px', overflow: 'auto', maxHeight: '300px' }}>
            {this.state.error && this.state.error.stack}
          </pre>
          <button 
            onClick={() => window.location.reload()} 
            style={{ marginTop: '2rem', padding: '0.9rem 2rem', background: '#C9A96E', color: '#FFF', border: 'none', cursor: 'pointer', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em' }}
          >
            Reload Client Portal
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  return (
    <AuthProvider>
      <Router basename={import.meta.env.BASE_URL}>
        <ScrollToTop />
        <Navbar />
        <main>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/designer/:id" element={<DesignerProfilePage />} />
              <Route path="/process" element={<ProcessPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </ErrorBoundary>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
}
