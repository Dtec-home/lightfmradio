'use client';

import { Navbar } from '@/components/Navbar';
import { Player } from '@/components/Player';
import { Footer } from '@/components/Footer';
import { PlayerProvider } from '@/context/PlayerContext';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSubmitted(true);
    setIsLoading(false);
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: 'general',
        message: '',
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <PlayerProvider>
      <Navbar />
      <Player />

      <main className="pt-24 pb-32">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-primary via-background to-background border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-4">
                Get in Touch
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Have questions, feedback, or partnership opportunities? We'd love to hear from you.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Info */}
              <motion.div
                className="space-y-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  className="flex gap-4"
                  variants={itemVariants}
                >
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Email</h3>
                    <p className="text-muted-foreground">hello@lightfm.com</p>
                    <p className="text-muted-foreground">support@lightfm.com</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex gap-4"
                  variants={itemVariants}
                >
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Phone</h3>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    <p className="text-xs text-muted-foreground mt-1">Mon-Fri, 9am-6pm UTC</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex gap-4"
                  variants={itemVariants}
                >
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Location</h3>
                    <p className="text-muted-foreground">123 Radio Street</p>
                    <p className="text-muted-foreground">Music City, MC 12345</p>
                  </div>
                </motion.div>

                {/* Social Links */}
                <motion.div
                  className="border-t border-border pt-8"
                  variants={itemVariants}
                >
                  <h3 className="text-lg font-semibold text-foreground mb-4">Follow Us</h3>
                  <div className="flex gap-4">
                    {['Twitter', 'Instagram', 'YouTube', 'Spotify'].map((social) => (
                      <motion.a
                        key={social}
                        href="#"
                        className="w-10 h-10 bg-secondary rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors flex items-center justify-center text-sm font-medium"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {social.charAt(0)}
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                className="lg:col-span-2"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="bg-card border border-border rounded-lg p-8">
                  {submitted ? (
                    <motion.div
                      className="flex flex-col items-center justify-center py-12 text-center"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <motion.div
                        className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-4"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 0.5 }}
                      >
                        <CheckCircle className="w-8 h-8 text-accent" />
                      </motion.div>
                      <h3 className="text-2xl font-serif font-bold text-foreground mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-muted-foreground max-w-sm">
                        Thank you for reaching out. We'll get back to you as soon as possible.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <motion.div variants={itemVariants}>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-primary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
                          placeholder="Your name"
                        />
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-primary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
                          placeholder="your@email.com"
                        />
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Subject
                        </label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-primary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
                          placeholder="What is this about?"
                        />
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Category
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-primary border border-border rounded-lg text-foreground focus:outline-none focus:border-accent transition-colors cursor-pointer"
                        >
                          <option value="general">General Inquiry</option>
                          <option value="feedback">Feedback</option>
                          <option value="partnership">Partnership</option>
                          <option value="sponsorship">Sponsorship</option>
                          <option value="support">Technical Support</option>
                        </select>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Message
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          className="w-full px-4 py-3 bg-primary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors resize-none"
                          placeholder="Tell us what's on your mind..."
                        />
                      </motion.div>

                      <motion.button
                        type="submit"
                        disabled={isLoading}
                        className="w-full px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        variants={itemVariants}
                      >
                        <Send size={18} />
                        {isLoading ? 'Sending...' : 'Send Message'}
                      </motion.button>
                    </form>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-primary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground">
                Find answers to common questions about Light FM
              </p>
            </motion.div>

            <motion.div
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                {
                  q: 'How can I listen to Light FM?',
                  a: 'You can stream Light FM directly from our website, or download our mobile app for iOS and Android.',
                },
                {
                  q: 'Is Light FM free?',
                  a: 'Yes! Light FM is completely free to listen to. We support our operation through partnerships and sponsorships.',
                },
                {
                  q: 'Can I submit music to be played on Light FM?',
                  a: 'We love discovering new artists! Please fill out our submission form and email us your tracks.',
                },
                {
                  q: 'How can I advertise with Light FM?',
                  a: 'For advertising and sponsorship opportunities, please contact our partnerships team at partnerships@lightfm.com',
                },
              ].map((faq, i) => (
                <motion.div
                  key={i}
                  className="bg-card border border-border rounded-lg p-6 hover:border-accent transition-colors"
                  variants={itemVariants}
                >
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {faq.q}
                  </h3>
                  <p className="text-muted-foreground">
                    {faq.a}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </PlayerProvider>
  );
}
