import Hero from '../components/Hero';
import HowToUse from '../components/HowToUse';
import SafetyBrand from '../components/SafetyBrand';
import FDAApproval from '../components/FDAApproval';
import FAQ from '../components/FAQ';
import SEO from '../components/SEO';

function HomePage({ amazonUrl }) {
  return (
    <div className="min-h-screen pt-20">
      <SEO
        title="Durvalis - Premium Equine Parasite Control"
        description="Professional-grade apple-flavored dewormer for complete equine parasite control. Shop now with fast shipping and expert support."
        canonical="https://durvalis.com"
      />
      
      <Hero 
        amazonUrl={amazonUrl}
      />
      <HowToUse />
      <SafetyBrand />
      <FDAApproval />
      <FAQ amazonUrl={amazonUrl} />
    </div>
  );
}

export default HomePage;