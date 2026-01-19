import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Send, User, Mail, MessageSquare, CheckCircle, Clock, ArrowRight, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

// Initialize EmailJS
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            // EmailJS configuration from environment variables
            const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
            const templateId = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID;
            const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

            const templateParams = {
                from_name: formData.name,
                from_email: formData.email,
                subject: formData.subject,
                message: formData.message
            };

            console.log('Sending email with params:', templateParams);
            console.log('Service ID:', serviceId);
            console.log('Template ID:', templateId);

            const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
            console.log('EmailJS Success:', result);

            setIsSubmitting(false);
            setIsSuccess(true);
            setFormData({ name: '', email: '', subject: '', message: '' });

            setTimeout(() => setIsSuccess(false), 5000);
        } catch (err) {
            setIsSubmitting(false);
            console.error('EmailJS Error Details:', err);
            console.error('Error status:', err.status);
            console.error('Error text:', err.text);

            let errorMessage = 'Failed to send message. ';
            if (err.status === 400) {
                errorMessage += 'Invalid template or service configuration.';
            } else if (err.status === 401) {
                errorMessage += 'Authentication failed. Check your public key.';
            } else if (err.status === 404) {
                errorMessage += 'Template or service not found.';
            } else {
                errorMessage += 'Please try again or email us directly at contact@durvalis.com';
            }

            setError(errorMessage);
        }
    };

    return (
        <section id="contact-form" className="min-h-screen py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-br from-red-50 to-transparent skew-y-3 transform origin-top-left -z-10" />
            <div className="absolute top-20 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-600 to-red-800 text-white rounded-2xl mb-6 shadow-xl shadow-red-900/30">
                        <Mail size={32} />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
                        Get in <span className="text-red-600">Touch</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
                        Questions about our products? Our equine specialists are here to help.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">
                    {/* Contact Info Cards */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <div className="bg-white rounded-2xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100 hover:-translate-y-2 transition-all duration-300 group">
                            <div className="w-12 h-12 bg-gradient-to-br from-red-50 to-red-100 text-red-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Mail size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2 font-serif">Email Support</h3>
                            <p className="text-gray-600 text-sm mb-4">Get detailed responses within 24 hours</p>
                            <a
                                href="mailto:contact@durvalis.com"
                                className="text-red-600 font-bold hover:text-red-800 transition-colors flex items-center gap-2 group"
                            >
                                contact@durvalis.com
                                <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all" />
                            </a>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100 hover:-translate-y-2 transition-all duration-300 group">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <MessageSquare size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2 font-serif">Quick Response</h3>
                            <p className="text-gray-600 text-sm mb-4">Typically reply within 2-4 hours</p>
                            <div className="flex items-center gap-2 text-gray-500 font-medium text-sm">
                                <Clock size={16} />
                                <span>Mon-Fri, 9am-5pm EST</span>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-2xl p-8 text-white shadow-xl shadow-red-900/30 hover:-translate-y-2 transition-all duration-300">
                            <h3 className="text-lg font-bold mb-4 font-serif">Before You Contact</h3>
                            <ul className="space-y-3 text-sm">
                                {[
                                    "Include your horse's age and weight",
                                    "Have your order number ready",
                                    "Check our FAQ for quick answers"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-white/80 rounded-full mt-2 flex-shrink-0" />
                                        <span className="text-white/95">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2"
                    >
                        <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/50 border border-gray-100 p-8 md:p-10">
                            {isSuccess ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center text-center py-12"
                                >
                                    <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-green-900/20">
                                        <CheckCircle size={48} />
                                    </div>
                                    <h3 className="text-3xl font-bold text-gray-900 mb-3 font-serif">Message Received!</h3>
                                    <p className="text-gray-600 mb-8 max-w-sm">Thank you for contacting us. We'll get back to you within 24 hours.</p>
                                    <button
                                        onClick={() => setIsSuccess(false)}
                                        className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-800 text-white font-bold rounded-xl hover:shadow-xl transition-all shadow-lg shadow-red-900/30"
                                    >
                                        Send Another Message
                                    </button>
                                </motion.div>
                            ) : (
                                <>
                                    <div className="mb-10">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2 font-serif">Send us a Message</h3>
                                        <p className="text-gray-600">Fill out the form below and we'll respond promptly.</p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label htmlFor="name" className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
                                                <div className="relative group">
                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[var(--color-primary)] transition-colors" size={18} />
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        name="name"
                                                        required
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-red-50 outline-none transition-all bg-gray-50 focus:bg-white placeholder-gray-400 font-medium"
                                                        placeholder="John Smith"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label htmlFor="email" className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                                                <div className="relative group">
                                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[var(--color-primary)] transition-colors" size={18} />
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        required
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-red-50 outline-none transition-all bg-gray-50 focus:bg-white placeholder-gray-400 font-medium"
                                                        placeholder="john@example.com"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="subject" className="text-sm font-bold text-gray-700 ml-1">Subject</label>
                                            <input
                                                type="text"
                                                id="subject"
                                                name="subject"
                                                required
                                                value={formData.subject}
                                                onChange={handleChange}
                                                className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-red-50 outline-none transition-all bg-gray-50 focus:bg-white placeholder-gray-400 font-medium"
                                                placeholder="What can we help you with?"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="message" className="text-sm font-bold text-gray-700 ml-1">Message</label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                required
                                                rows={5}
                                                value={formData.message}
                                                onChange={handleChange}
                                                className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-red-50 outline-none transition-all bg-gray-50 focus:bg-white placeholder-gray-400 font-medium resize-none"
                                                placeholder="Please provide details about your inquiry..."
                                            />
                                        </div>

                                        {error && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700"
                                            >
                                                <AlertCircle size={20} className="flex-shrink-0" />
                                                <p className="text-sm font-medium">{error}</p>
                                            </motion.div>
                                        )}

                                        <motion.button
                                            whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(185, 28, 28, 0.4)" }}
                                            whileTap={{ scale: 0.98 }}
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-gradient-to-r from-[var(--color-primary)] to-red-800 text-white py-5 rounded-xl font-bold text-lg shadow-lg shadow-red-900/20 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group"
                                        >
                                            {isSubmitting ? (
                                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            ) : (
                                                <>
                                                    Send Message
                                                    <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                                                </>
                                            )}
                                        </motion.button>
                                    </form>
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default ContactForm;