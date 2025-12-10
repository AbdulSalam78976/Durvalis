import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Info, Shield, Users, Award, ChevronRight } from 'lucide-react';

function SafetyBrand() {
  const safetyInfo = [
    {
      icon: <Shield size={20} />,
      title: "Veterinary Use Only",
      description: "Specifically formulated Ivermectin Paste 1.87% for equine use.",
      color: "bg-green-50 text-green-700 border-green-100",
      iconColor: "text-green-600"
    },
    {
      icon: <AlertTriangle size={20} />,
      title: "Precise Dosage",
      description: "Follow weight-based instructions to ensure proper administration.",
      color: "bg-red-50 text-red-700 border-red-100",
      iconColor: "text-red-600"
    },
    {
      icon: <AlertTriangle size={20} />,
      title: "Safety First",
      description: "Not for human consumption. Keep out of reach of children.",
      color: "bg-orange-50 text-orange-700 border-orange-100",
      iconColor: "text-orange-600"
    },
    {
      icon: <Info size={20} />,
      title: "Proper Storage",
      description: "Store at room temperature (68°F - 77°F) in a dry place.",
      color: "bg-blue-50 text-blue-700 border-blue-100",
      iconColor: "text-blue-600"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-50 to-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Award size={16} />
            Premium Quality
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Safety & <span className="text-red-600">Quality</span> First
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We prioritize your horse's health with rigorously tested, veterinarian-approved products.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Safety Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {safetyInfo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center flex-shrink-0 border ${item.iconColor}`}>
                    <div className={item.iconColor}>
                      {item.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}


          </motion.div>

          {/* Brand Story */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 text-white overflow-hidden h-full">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full -translate-y-16 translate-x-16 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-600/10 rounded-full translate-y-16 -translate-x-16 blur-3xl" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <Users size={16} />
                  Trusted Brand
                </div>

                <h3 className="text-3xl font-bold mb-6 leading-tight">
                  Our Commitment to <br />
                  <span className="text-red-400">Equine Excellence</span>
                </h3>

                <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                  At Durvalis, we're dedicated to advancing equine health through science-backed solutions.
                  Every product is crafted with precision, tested for purity, and trusted by veterinarians nationwide.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">5,000+</div>
                    <div className="text-sm text-gray-400">Happy Customers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">99.8%</div>
                    <div className="text-sm text-gray-400">Satisfaction Rate</div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  {[
                    "Veterinarian recommended formulas",
                    "FDA approved manufacturing",
                    "Batch testing for consistency",
                    "Environmentally conscious packaging"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 text-gray-300">
                      <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quality Assurance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 pt-12 border-t border-gray-200"
        >
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Award size={16} />
              Quality Guaranteed
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Backed by Science, Trusted by Professionals
            </h3>
            <p className="text-gray-600">
              Every Durvalis product undergoes 37 quality checks and is manufactured in FDA-registered facilities.
              We stand behind our products with a 100% satisfaction guarantee.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default SafetyBrand;