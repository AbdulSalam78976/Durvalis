import Header from './components/Header';
import Hero from './components/Hero';
import ProductDetails from './components/ProductDetails';
import HowToUse from './components/HowToUse';
import SafetyBrand from './components/SafetyBrand';
import FDAApproval from './components/FDAApproval';
import FAQ from './components/FAQ';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import SEO from './components/SEO';

function App() {
  const amazonUrl = "https://a.co/d/b8HCozh";

  return (
    <main className="min-h-screen pt-20">
      <SEO
        title="Durvalis - Premium Equine Parasite Control"
        description="Professional-grade apple-flavored dewormer for complete equine parasite control. Shop now on Amazon."
        canonical="https://durvalis.com"
      />
      <Header amazonUrl={amazonUrl} />
      <Hero amazonUrl={amazonUrl} />
      <ProductDetails amazonUrl={amazonUrl} />
      <HowToUse />
      <SafetyBrand />
      <FDAApproval />
      <FAQ amazonUrl={amazonUrl} />
      <ContactForm />

      <Footer />
    </main>
  );
}

export default App;
