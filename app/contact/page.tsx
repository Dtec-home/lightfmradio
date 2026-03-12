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
  const [error, setError] = useState('');

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
    setError('');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            subject: '',
            category: 'salvation',
            message: '',
          });
          setSubmitted(false);
        }, 5000);
      } else {
        setError('Failed to send message. Please try again.');
      }
    } catch (error) {
      setError('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
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
                Your Spiritual Journey Matters
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Whether you're accepting Jesus for the first time, seeking prayer, or have questions about faith, we're here to help you on your path to Christ.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Spiritual Resources & Contact Info */}
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
                    <h3 className="text-lg font-semibold text-foreground mb-2">Get Help Now</h3>
                    <p className="text-muted-foreground">lcministries254@gmail.com</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex gap-4"
                  variants={itemVariants}
                >
                  <div className="w-12 h-12 bg-accent-alt/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-accent-alt" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Prayer Line (24/7)</h3>
                    <p className="text-muted-foreground">0713710041</p>
                    <p className="text-xs text-muted-foreground mt-1">Call anytime for prayer or counseling</p>
                  </div>
                </motion.div>

                {/* <motion.div
                  className="flex gap-4"
                  variants={itemVariants}
                >
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Visit Us</h3>
                    <p className="text-muted-foreground">Light FM Christian Center</p>
                    <p className="text-muted-foreground">123 Grace Street, Faith City, FC 12345</p>
                  </div>
                </motion.div> */}

                {/* Gospel Message Box */}
                <motion.div
                  className="border-t border-border pt-8 bg-primary/50 border border-accent rounded-lg p-6"
                  variants={itemVariants}
                >
                  <h3 className="text-lg font-semibold text-foreground mb-4">The Gospel in 3 Minutes</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    <span className="font-semibold text-accent">God loves you</span> (John 3:16) and has a plan for your life. But our sins separate us from God. Jesus died for your sins and rose again. Believe in Him, confess your sins, and accept His forgiveness today.
                  </p>
                  <p className="text-xs text-muted-foreground italic">
                    "If you confess with your mouth that Jesus is Lord and believe in your heart that God raised him from the dead, you will be saved." - Romans 10:9
                  </p>
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
                        className="w-16 h-16 bg-accent-alt/20 rounded-full flex items-center justify-center mb-4"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 0.5 }}
                      >
                        <CheckCircle className="w-8 h-8 text-accent-alt" />
                      </motion.div>
                      <h3 className="text-2xl font-serif font-bold text-foreground mb-2">
                        Thank You, Friend!
                      </h3>
                      <p className="text-muted-foreground max-w-sm mb-4">
                        Your request has been received. Our ministry team will reach out to you within 24 hours to pray with you and support your spiritual journey.
                      </p>
                      <p className="text-sm text-accent font-semibold">
                        May the peace of Christ be with you. John 14:27
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
                          How Can We Help You?
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-primary border border-border rounded-lg text-foreground focus:outline-none focus:border-accent transition-colors cursor-pointer"
                        >
                          <option value="salvation">I Want to Accept Jesus Christ</option>
                          <option value="prayer">I Need Prayer</option>
                          <option value="counseling">I Need Spiritual Counseling</option>
                          <option value="questions">I Have Questions About Faith</option>
                          <option value="volunteer">I Want to Volunteer</option>
                          <option value="giving">I Want to Give/Support Ministry</option>
                          <option value="other">Other</option>
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

                      {error && (
                        <motion.div
                          className="text-red-500 text-sm text-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          {error}
                        </motion.div>
                      )}
                    </form>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section - Gospel & Faith Questions */}
        <section className="py-20 bg-primary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
                Common Questions About Jesus & Salvation
              </h2>
              <p className="text-muted-foreground">
                Biblical answers to help you understand faith and God's plan for your life
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
                  q: 'How do I become a Christian?',
                  a: 'Simply believe in Jesus Christ, repent of your sins, and accept Him as your Lord and Savior. Pray and tell God you want to follow Jesus. We\'re here to help you take this life-changing step.',
                },
                {
                  q: 'What happens after I accept Jesus?',
                  a: 'You experience God\'s forgiveness, peace, and eternal life. We recommend finding a local church, getting baptized, and connecting with a faith community to grow in your relationship with Christ.',
                },
                {
                  q: 'Is it too late for God to forgive me?',
                  a: 'No! God\'s grace is unlimited. No matter what you\'ve done, Jesus can forgive you. He died for ALL our sins. It\'s never too late to turn to Him.',
                },
                {
                  q: 'How can I know Jesus is real?',
                  a: 'Millions testify to encountering Jesus through prayer, Scripture, and the Holy Spirit. We invite you to seek Him with an open heart. Jesus said, "Ask and it will be given to you." (Matthew 7:7)',
                },
              ].map((faq, i) => (
                <motion.div
                  key={i}
                  className="bg-card border border-border rounded-lg p-6 hover:border-accent-alt transition-colors"
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
    </>
  );
}
