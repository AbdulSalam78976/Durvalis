import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

function FAQ({ amazonUrl }) {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "How often should I administer this paste?",
      answer: "Consult your veterinarian for a deworming schedule tailored to your horse's specific needs, typically every 2-3 months during the grazing season."
    },
    {
      question: "What if my horse has an adverse reaction?",
      answer: "Discontinue use immediately and contact your veterinarian. Adverse reactions are rare but should be addressed promptly."
    },
    {
      question: "Is it safe for pregnant mares?",
      answer: "Consult your veterinarian before administering to pregnant or nursing mares. Safety studies support use in most cases."
    },
    {
      question: "Can I use this product on other animals?",
      answer: "This product is formulated specifically for horses. Do not use on other species without veterinary guidance."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 -right-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-2xl mb-6 shadow-sm">
            <HelpCircle size={32} />
          </div>
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 font-light">Everything you need to know about Durvalis Ivermectin Paste.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-2xl overflow-hidden transition-all duration-300 ${openFaq === index ? 'bg-white shadow-lg ring-1 ring-gray-900/5' : 'bg-white/60 hover:bg-white shadow-sm ring-1 ring-gray-900/5'}`}
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-8 py-6 text-left flex justify-between items-center group cursor-pointer"
              >
                <span className={`font-bold text-lg select-none transition-colors ${openFaq === index ? 'text-[var(--color-primary)]' : 'text-gray-800'}`}>
                  {faq.question}
                </span>
                <span className={`flex-shrink-0 ml-4 p-2 rounded-full transition-all duration-300 ${openFaq === index ? 'bg-[var(--color-primary)] text-white rotate-180' : 'bg-gray-100 text-gray-400 group-hover:bg-[var(--color-primary)]/10 group-hover:text-[var(--color-primary)]'}`}>
                  {openFaq === index ? <Minus size={20} /> : <Plus size={20} />}
                </span>
              </button>
              <AnimatePresence>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-8 pb-8 pt-0 text-gray-600 leading-relaxed font-light text-lg">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
