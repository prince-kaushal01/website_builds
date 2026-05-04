import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

const HomePage            = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const ServicesPage        = lazy(() => import('./pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const PortfolioPage       = lazy(() => import('./pages/PortfolioPage').then(m => ({ default: m.PortfolioPage })));
const CaseStudiesPage     = lazy(() => import('./pages/CaseStudiesPage').then(m => ({ default: m.CaseStudiesPage })));
const CaseStudyDetailPage = lazy(() => import('./pages/CaseStudyDetailPage').then(m => ({ default: m.CaseStudyDetailPage })));
const ContactPage         = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const AboutPage           = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const WeddingPage         = lazy(() => import('./pages/WeddingPage').then(m => ({ default: m.WeddingPage })));
const AdsPage             = lazy(() => import('./pages/AdsPage').then(m => ({ default: m.AdsPage })));
const EditingPage         = lazy(() => import('./pages/EditingPage').then(m => ({ default: m.EditingPage })));
const ResortPage          = lazy(() => import('./pages/ResortPage').then(m => ({ default: m.ResortPage })));
const RealEstatePage      = lazy(() => import('./pages/RealEstatePage').then(m => ({ default: m.RealEstatePage })));

function PageLoader() {
  return (
    <div
      className="min-h-[80vh] flex items-center justify-center"
      style={{ backgroundColor: 'var(--dark)' }}
    >
      <div
        className="w-10 h-10 rounded-full border-2 animate-spin"
        style={{ borderColor: 'rgba(200,169,106,0.3)', borderTopColor: 'var(--accent-gold)' }}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/"                  element={<HomePage />} />
              <Route path="/services"          element={<ServicesPage />} />
              <Route path="/portfolio"         element={<PortfolioPage />} />
              <Route path="/case-studies"      element={<CaseStudiesPage />} />
              <Route path="/case-studies/:id"  element={<CaseStudyDetailPage />} />
              <Route path="/contact"           element={<ContactPage />} />
              <Route path="/about"             element={<AboutPage />} />
              <Route path="/wedding"           element={<WeddingPage />} />
              <Route path="/ads"               element={<AdsPage />} />
              <Route path="/editing"           element={<EditingPage />} />
              <Route path="/resort"            element={<ResortPage />} />
              <Route path="/realestate"        element={<RealEstatePage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
