import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { IndianWeddingsPage } from './pages/IndianWeddingsPage';
import { InternationalPage } from './pages/InternationalPage';
import { BlogPage } from './pages/BlogPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/indian" element={<IndianWeddingsPage />} />
            <Route path="/international" element={<InternationalPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}