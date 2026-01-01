// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ShieldCheck, FileText, ExternalLink, CheckCircle, BadgeCheck } from 'lucide-react';

function FDAApproval() {
    return (
        <section className="py-24 bg-blue-50/50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-white rounded-full mix-blend-overlay blur-3xl opacity-60 pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white text-blue-700 rounded-full text-sm font-bold tracking-wide shadow-sm mb-8 border border-blue-100">
                        <BadgeCheck size={16} />
                        <span className="uppercase">Officially Certified</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
                        FDA Approved & <br />
                        <span className="text-blue-600 italic">Verified Authentic.</span>
                    </h2>

                    <p className="text-xl text-gray-600 mb-10 leading-relaxed font-light max-w-2xl mx-auto">
                        Durvalis Ivermectin Paste 1.87% has undergone rigorous testing and has been officially approved by the U.S. Food and Drug Administration (FDA) for equine use.
                    </p>

                    <div className="space-y-4 mb-12 max-w-lg mx-auto">
                        {[
                            "NADA (New Animal Drug Application) #200-326",
                            "Manufactured in GMP Certified Facility",
                            "Batch Tested for Purity & Potency"
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white border border-blue-50 shadow-sm hover:shadow-md transition-all text-left">
                                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0 text-green-600">
                                    <CheckCircle size={18} />
                                </div>
                                <span className="text-gray-800 font-medium">{item}</span>
                            </div>
                        ))}
                    </div>

                    <a
                        href="https://www.accessdata.fda.gov/spl/data/e3af6af9-3379-433a-975b-4c9d3357cb1a/e3af6af9-3379-433a-975b-4c9d3357cb1a.xml"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:shadow-blue-700/40 transition-all group transform hover:-translate-y-0.5"
                    >
                        <FileText size={20} />
                        Verify National Drug Code
                        <ExternalLink size={16} className="opacity-70 group-hover:opacity-100 transition-opacity" />
                    </a>
                </motion.div>

            </div>
        </section>
    );
}

export default FDAApproval;
