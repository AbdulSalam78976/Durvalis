import Header from './components/Header';
import Hero from './components/Hero';
import ProductDetails from './components/ProductDetails';
import HowToUse from './components/HowToUse';
import SafetyBrand from './components/SafetyBrand';
import FDAApproval from './components/FDAApproval';
import FAQ from './components/FAQ';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function App() {
  const amazonUrl = "https://a.co/d/b8HCozh";

  return (
    <div className="min-h-screen pt-20">
      <Header amazonUrl={amazonUrl} />
      <Hero amazonUrl={amazonUrl} />
      <ProductDetails amazonUrl={amazonUrl} />
      <HowToUse />
      <SafetyBrand />
      <FDAApproval />
      <FAQ amazonUrl={amazonUrl} />
      <ContactForm />

      <Footer />
    </div>
  );
}

export default App;
