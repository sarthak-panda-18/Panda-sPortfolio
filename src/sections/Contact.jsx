import React, { useState } from 'react';
import { contact, profile, social } from '../data/content';
import { Button } from '../components/Button';
import { Mail, Send, CheckCircle2, ArrowUpRight, Github, Linkedin, AlertCircle } from 'lucide-react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    botcheck: false,
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validate = (values) => {
    const errs = {};
    if (!values.name || !values.name.trim()) {
      errs.name = 'Please enter your name.';
    }
    if (!values.email || !values.email.trim()) {
      errs.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!values.message || !values.message.trim()) {
      errs.message = 'Please enter your message.';
    }
    return errs;
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const currentErrors = validate(formData);
    setErrors((prev) => ({ ...prev, [field]: currentErrors[field] }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
    if (submitError) setSubmitError('');
    if (touched[name]) {
      const updatedErrors = validate({ ...formData, [name]: val });
      setErrors((prev) => ({ ...prev, [name]: updatedErrors[name] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Spam bot check via honeypot field
    if (formData.botcheck) {
      return;
    }

    const validationErrors = validate(formData);
    setTouched({ name: true, email: true, message: true });
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      setSubmitError('Web forms service is not configured. Please reach out directly via email.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          subject: `Portfolio Message from ${formData.name.trim()}`,
          from_name: 'Sarthak Panda Portfolio',
        }),
      });

      const result = await response.json();
      if (result.success) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '', botcheck: false });
        setErrors({});
        setTouched({});
      } else {
        setSubmitError(result.message || 'Unable to send message. Please try again or reach out directly.');
      }
    } catch {
      setSubmitError('Network error. Please check your connection or reach out directly.');
    } finally {
      setIsSubmitting(false);
    }
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
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Honeypot field for spam prevention */}
                <input
                  type="checkbox"
                  name="botcheck"
                  checked={formData.botcheck}
                  onChange={handleChange}
                  className="hidden"
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Name Field */}
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
                    onBlur={() => handleBlur('name')}
                    placeholder="Sarthak Panda"
                    aria-invalid={Boolean(touched.name && errors.name)}
                    aria-describedby={touched.name && errors.name ? 'contact-name-error' : undefined}
                    className={`w-full px-4 py-3 rounded-card bg-sand/50 border text-forest placeholder:text-forest-muted/50 text-sm focus:bg-sand focus:outline-none transition-colors duration-fast ${
                      touched.name && errors.name
                        ? 'border-clay focus:border-clay ring-1 ring-clay/30'
                        : 'border-hairline focus:border-clay'
                    }`}
                  />
                  {touched.name && errors.name && (
                    <p id="contact-name-error" className="text-[11px] text-clay mt-1 font-medium flex items-center gap-1">
                      <AlertCircle size={12} strokeWidth={2} />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
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
                    onBlur={() => handleBlur('email')}
                    placeholder="sarthakpanda.outlook@gmail.com"
                    aria-invalid={Boolean(touched.email && errors.email)}
                    aria-describedby={touched.email && errors.email ? 'contact-email-error' : undefined}
                    className={`w-full px-4 py-3 rounded-card bg-sand/50 border text-forest placeholder:text-forest-muted/50 text-sm focus:bg-sand focus:outline-none transition-colors duration-fast ${
                      touched.email && errors.email
                        ? 'border-clay focus:border-clay ring-1 ring-clay/30'
                        : 'border-hairline focus:border-clay'
                    }`}
                  />
                  {touched.email && errors.email && (
                    <p id="contact-email-error" className="text-[11px] text-clay mt-1 font-medium flex items-center gap-1">
                      <AlertCircle size={12} strokeWidth={2} />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Message Field */}
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
                    onBlur={() => handleBlur('message')}
                    placeholder="Tell me about your project, internship, or opportunity..."
                    aria-invalid={Boolean(touched.message && errors.message)}
                    aria-describedby={touched.message && errors.message ? 'contact-message-error' : undefined}
                    className={`w-full px-4 py-3 rounded-card bg-sand/50 border text-forest placeholder:text-forest-muted/50 text-sm focus:bg-sand focus:outline-none resize-none transition-colors duration-fast ${
                      touched.message && errors.message
                        ? 'border-clay focus:border-clay ring-1 ring-clay/30'
                        : 'border-hairline focus:border-clay'
                    }`}
                  />
                  {touched.message && errors.message && (
                    <p id="contact-message-error" className="text-[11px] text-clay mt-1 font-medium flex items-center gap-1">
                      <AlertCircle size={12} strokeWidth={2} />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submission Error Alert */}
                {submitError && (
                  <div className="p-3 rounded-card bg-clay/10 border border-clay/30 text-xs text-clay space-y-1.5">
                    <div className="flex items-center gap-1.5 font-medium">
                      <AlertCircle size={14} strokeWidth={2} />
                      <span>{submitError}</span>
                    </div>
                    <a
                      href={`mailto:${contact.email}?subject=${encodeURIComponent(
                        `Portfolio Message from ${formData.name || 'Visitor'}`
                      )}&body=${encodeURIComponent(formData.message || '')}`}
                      className="inline-block font-medium underline underline-offset-4 hover:text-forest"
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
