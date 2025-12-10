import { motion } from 'framer-motion';
import { Scale, Settings, Syringe, CalendarCheck, CheckCircle } from 'lucide-react';

function HowToUse() {
  const steps = [
    {
      icon: <Scale size={28} />,
      title: "1. Weigh Your Horse",
      description: "Accurately measure body weight for proper dosage calculation.",
      color: "text-blue-600 bg-blue-50",
      tips: ["Use weight tape or scale", "Round up to nearest 50 lbs"]
    },
    {
      icon: <Settings size={28} />,
      title: "2. Set Dosage",
      description: "Adjust syringe to match your horse's weight using calibrated markings.",
      color: "text-red-600 bg-red-50",
      tips: ["Unlock safety ring", "Slide to correct marking"]
    },
    {
      icon: <Syringe size={28} />,
      title: "3. Administer Paste",
      description: "Place syringe in corner of mouth and depress plunger completely.",
      color: "text-emerald-600 bg-emerald-50",
      tips: ["Hold head steady", "Ensure full dose delivery"]
    },
    {
      icon: <CalendarCheck size={28} />,
      title: "4. Follow Schedule",
      description: "Maintain proper deworming intervals as recommended by your vet.",
      color: "text-purple-600 bg-purple-50",
      tips: ["8-12 week intervals", "Rotate products yearly"]
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/2 left-0 w-full h-full bg-gradient-to-b from-gray-50/50 to-white -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-[var(--color-primary)]/10 text-[var(--color-primary)] px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase mb-6">
            <CheckCircle size={14} />
            Easy Administration
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            Simple <span className="text-[var(--color-primary)]">4-Step</span> Process
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            Our calibrated syringe makes deworming precise, easy, and stress-free for both you and your horse.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Connector Line (Desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-100 -z-10" />
              )}

              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center mb-6 shadow-sm mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  {step.icon}
                </div>

                {/* Content */}
                <div className="text-center flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 font-serif">{step.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed text-sm">{step.description}</p>
                </div>

                {/* Tips */}
                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                  {step.tips.map((tip, tipIndex) => (
                    <div key={tipIndex} className="flex items-center gap-2 text-xs text-gray-500 font-medium justify-center lg:justify-start">
                      <div className="w-1.5 h-1.5 bg-gray-300 rounded-full flex-shrink-0" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 pt-12 border-t border-gray-100"
        >
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1 font-serif">1.87%</div>
                <div className="text-sm text-gray-500 font-medium uppercase tracking-wide">Active Ingredient</div>
              </div>
              <div className="text-center border-l border-r border-gray-100 px-4">
                <div className="text-3xl font-bold text-gray-900 mb-1 font-serif">Apple</div>
                <div className="text-sm text-gray-500 font-medium uppercase tracking-wide">Flavor Preference</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1 font-serif">Pre-Measured</div>
                <div className="text-sm text-gray-500 font-medium uppercase tracking-wide">Calibrated Syringe</div>
              </div>
            </div>
          </div>

          <p className="mt-12 text-center text-sm text-gray-400 font-medium">
            *Always consult your veterinarian for specific dosage recommendations
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default HowToUse;