import React, { useState } from 'react';
import { contact, profile, social } from '../data/content';
import { Button } from '../components/Button';
import { Mail, Send, CheckCircle2, ArrowUpRight, Github, Linkedin } from 'lucide-react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusError, setStatusError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setStatusError('');

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    // If an access key is configured, submit via Web3Forms API
    if (accessKey && accessKey !== 'YOUR_WEB3FORMS_ACCESS_KEY') {
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: accessKey,
            name: formData.name,
            email: formData.email,
            message: formData.message,
            subject: `Portfolio Message from ${formData.name}`,
            from_name: 'Sarthak Panda Portfolio',
          }),
        });

        const result = await response.json();
        if (result.success) {
          setIsSubmitted(true);
          setFormData({ name: '', email: '', message: '' });
          setIsSubmitting(false);
          return;
        } else {
          throw new Error(result.message || 'Submission failed');
        }
      } catch (err) {
        console.warn('Web3Forms submission failed, offering mailto fallback:', err);
        setStatusError('Could not connect to email service. Click below to send directly via your email app.');
        setIsSubmitting(false);
        return;
      }
    }

    // Default fallback: Trigger mailto with prefilled details and show success
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }, 400);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (statusError) setStatusError('');
  };

  return (
    <section
      id="contact"
      aria-label="Contact and Inquiries"
      className="section bg-transparent"
    >
      <div className="max-w-content mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info & Social CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            <div>
              <span className="label text-clay">Get in Touch</span>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-forest mt-3 tracking-tight leading-[1.1]">
                {contact.heading}
              </h2>
              <p className="text-forest-muted text-base sm:text-lg leading-relaxed mt-6 max-w-lg">
                {contact.paragraph}
              </p>

              <div className="mt-8 inline-flex items-center gap-2.5 px-4 py-2 rounded-pill bg-surface border border-hairline text-xs font-medium text-forest">
                <span className="w-2 h-2 rounded-full bg-clay animate-pulse" />
                <span>{contact.availability}</span>
              </div>
            </div>

            {/* Quick Links & Direct Email */}
            <div className="space-y-4 pt-4 border-t border-hairline/60">
              <span className="label text-forest-muted block">Direct Contact</span>
              <a
                href={`mailto:${contact.email}`}
                className="font-serif text-2xl sm:text-3xl text-forest hover:text-clay transition-colors duration-fast block"
              >
                {contact.email}
              </a>

              {/* Social Quick Pills */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-pill bg-surface border border-hairline text-xs font-medium text-forest hover:border-forest hover:text-clay transition-colors duration-fast"
                >
                  <Mail size={14} strokeWidth={1.5} />
                  <span>Say Hello</span>
                </a>
                {social.linkedin && (
                  <a
                    href={social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-pill bg-surface border border-hairline text-xs font-medium text-forest hover:border-forest hover:text-clay transition-colors duration-fast"
                  >
                    <Linkedin size={14} strokeWidth={1.5} />
                    <span>LinkedIn ↗</span>
                  </a>
                )}
                {social.github && (
                  <a
                    href={social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-pill bg-surface border border-hairline text-xs font-medium text-forest hover:border-forest hover:text-clay transition-colors duration-fast"
                  >
                    <Github size={14} strokeWidth={1.5} />
                    <span>GitHub ↗</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form Card */}
          <div className="lg:col-span-6 bg-surface border border-hairline rounded-card p-8 md:p-10">
            <h3 className="font-serif text-2xl sm:text-3xl text-forest mb-2">
              Send a Message
            </h3>
            <p className="text-xs text-forest-muted mb-6">
              Fill out the details below and I'll get back to you promptly.
            </p>

            {isSubmitted ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                <span className="p-3 rounded-pill bg-clay text-clay-contrast">
                  <CheckCircle2 size={28} strokeWidth={2} />
                </span>
                <h4 className="font-serif text-2xl text-forest">
                  Message Sent!
                </h4>
                <p className="text-xs text-forest-muted max-w-xs">
                  Thank you for reaching out. I'll review your note and respond to your email soon.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 text-xs font-medium text-clay hover:underline underline-offset-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="contact-name" className="label block text-[10px] mb-1.5">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Sarthak Panda"
                    className="w-full px-4 py-3 rounded-card bg-sand/50 border border-hairline text-forest placeholder:text-forest-muted/50 text-sm focus:bg-sand focus:border-clay focus:outline-none transition-colors duration-fast"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="label block text-[10px] mb-1.5">
                    Your Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="sarthakpanda.outlook@gmail.com"
                    className="w-full px-4 py-3 rounded-card bg-sand/50 border border-hairline text-forest placeholder:text-forest-muted/50 text-sm focus:bg-sand focus:border-clay focus:outline-none transition-colors duration-fast"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="label block text-[10px] mb-1.5">
                    Your Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, internship, or opportunity..."
                    className="w-full px-4 py-3 rounded-card bg-sand/50 border border-hairline text-forest placeholder:text-forest-muted/50 text-sm focus:bg-sand focus:border-clay focus:outline-none resize-none transition-colors duration-fast"
                  />
                </div>

                {statusError && (
                  <div className="p-3 rounded-card bg-red-500/10 border border-red-500/20 text-xs text-red-600 dark:text-red-400 space-y-2">
                    <p>{statusError}</p>
                    <a
                      href={`mailto:${contact.email}?subject=${encodeURIComponent(
                        `Portfolio Message from ${formData.name || 'Visitor'}`
                      )}&body=${encodeURIComponent(formData.message || '')}`}
                      className="inline-block font-medium text-clay hover:underline underline-offset-4"
                    >
                      Click here to email directly →
                    </a>
                  </div>
                )}

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="highlight"
                    className="w-full text-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
