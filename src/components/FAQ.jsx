import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

// eslint-disable-next-line no-unused-vars
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
    <section id="faq" className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-red-600/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 -right-20 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-600 to-red-800 text-white rounded-2xl mb-6 shadow-xl shadow-red-900/30">
            <HelpCircle size={32} />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            Frequently Asked <span className="text-red-600">Questions</span>
          </h2>
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
              className={`rounded-2xl overflow-hidden transition-all duration-300 ${openFaq === index ? 'bg-white shadow-xl ring-2 ring-red-600/20' : 'bg-white/80 hover:bg-white shadow-md ring-1 ring-gray-900/5'}`}
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-6 sm:px-8 py-6 text-left flex justify-between items-start sm:items-center gap-4 group cursor-pointer"
              >
                <span className={`font-bold text-base sm:text-lg select-none transition-colors font-sans ${openFaq === index ? 'text-red-600' : 'text-gray-800 group-hover:text-gray-900'}`}>
                  {faq.question}
                </span>
                <span className={`flex-shrink-0 p-2 rounded-xl transition-all duration-300 ${openFaq === index ? 'bg-red-600 text-white rotate-180 shadow-lg' : 'bg-gray-100 text-gray-400 group-hover:bg-red-50 group-hover:text-red-600'}`}>
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
                    <div className="px-6 sm:px-8 pb-6 pt-0 text-gray-600 leading-relaxed font-light text-base sm:text-lg border-t border-gray-100 mt-2 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center bg-gradient-to-br from-red-600 to-red-800 rounded-2xl p-8 sm:p-10 text-white shadow-xl shadow-red-900/30"
        >
          <h3 className="text-2xl sm:text-3xl font-bold mb-3 font-serif">Still Have Questions?</h3>
          <p className="text-red-100 mb-6 text-base sm:text-lg">Our equine specialists are here to help you make the best choice for your horse.</p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-red-600 px-8 py-4 rounded-xl font-bold hover:shadow-2xl transition-all hover:scale-105"
          >
            Contact Us
            <HelpCircle size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default FAQ;
