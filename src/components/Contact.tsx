import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import confetti from 'canvas-confetti';
import { 
  Mail, 
  Copy, 
  Check, 
  Send, 
  ArrowRight, 
  CheckCircle2, 
  MessageSquareCode,
  ExternalLink,
  Loader2
} from 'lucide-react';

export const Contact: React.FC = () => {
  const { personalInfo } = portfolioData;
  
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: 'Power BI Dashboard & DAX Modeling',
    budget: '$2,500 - $5,000 (End-to-End Power BI Model)',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const getDirectMailtoUrl = () => {
    const subject = encodeURIComponent(`Project Inquiry: ${formData.projectType} - ${formData.name || 'Client'}`);
    const body = encodeURIComponent(
      `Hi Zubair,\n\n` +
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Company: ${formData.company || 'N/A'}\n` +
      `Project Scope: ${formData.projectType}\n` +
      `Estimated Budget: ${formData.budget}\n\n` +
      `Project Goals & Message:\n${formData.message}\n\n` +
      `Best regards,\n${formData.name}`
    );
    return `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      // Send real email directly to zubairanwar499@gmail.com using FormSubmit AJAX service
      const response = await fetch(`https://formsubmit.co/ajax/${personalInfo.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company || 'Not specified',
          project_scope: formData.projectType,
          budget: formData.budget,
          message: formData.message,
          _subject: `New Project Inquiry from ${formData.name} [${formData.projectType}]`,
          _template: 'table',
          _captcha: 'false'
        })
      });

      if (response.ok) {
        setSubmitted(true);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00f0ff', '#8b5cf6', '#ec4899', '#10b981']
        });
      } else {
        // Fallback: open mail client with all pre-filled details
        window.location.href = getDirectMailtoUrl();
        setSubmitted(true);
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.6 },
        });
      }
    } catch {
      // Fallback on network/cors issue
      window.location.href = getDirectMailtoUrl();
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-50/70 dark:bg-navy-950/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-bold tracking-wide uppercase mb-3">
            <MessageSquareCode className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Have a Data Problem? Let's Solve It.
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300 text-base">
            Whether you need a Power BI dashboard, automated reporting solution, data analysis, or a modern analytics platform, let's discuss what you're trying to achieve.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left: Contact Info & Availability Card */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Availability Callout Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-xl shadow-cyan-500/20 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Open for Inquiries</span>
              </div>

              <h3 className="text-2xl font-bold tracking-tight">
                Let's Build Better Reporting Together
              </h3>

              <p className="text-cyan-100 text-sm leading-relaxed">
                {personalInfo.availability}. Let's jump on a discovery call or email exchange to walk through your data challenges.
              </p>

              <div className="pt-2">
                <span className="text-xs text-cyan-200 font-mono">
                  Guaranteed response to {personalInfo.email} within 24 hours.
                </span>
              </div>
            </div>

            {/* Direct Contact Cards */}
            <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200/80 dark:border-navy-800 shadow-sm space-y-4">
              
              <div className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase">
                Direct Channels:
              </div>

              {/* Email with direct mailto & 1-click copy */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200/70 dark:border-navy-800 flex items-center justify-between gap-3 group hover:border-cyan-500/50 transition-colors">
                <a
                  href={`mailto:${personalInfo.email}?subject=Data%20Analytics%20Project%20Inquiry%20-%20Zubair%20Anwar`}
                  className="flex items-center gap-3 overflow-hidden flex-1"
                  title="Click to compose email"
                >
                  <div className="p-2.5 rounded-xl bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 shrink-0 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[10px] font-mono text-slate-400 block flex items-center gap-1">
                      <span>Email Directly</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 truncate block">
                      {personalInfo.email}
                    </span>
                  </div>
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-xl bg-white dark:bg-navy-800 text-slate-500 hover:text-cyan-500 dark:text-slate-400 dark:hover:text-cyan-400 border border-slate-200 dark:border-navy-700 transition-colors shrink-0 shadow-xs"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* LinkedIn */}
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200/70 dark:border-navy-800 flex items-center justify-between gap-3 hover:border-cyan-500/50 transition-colors group"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0 group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.67 1.67 0 1 0 0-3.34 1.67 1.67 0 0 0 0 3.34M7.86 18.5V10.13H5.07V18.5h2.79Z"/>
                    </svg>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block">LinkedIn Profile</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 truncate block">
                      {personalInfo.linkedinDisplay}
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-500 group-hover:translate-x-0.5 transition-all" />
              </a>

              {/* GitHub */}
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200/70 dark:border-navy-800 flex items-center justify-between gap-3 hover:border-cyan-500/50 transition-colors group"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2.5 rounded-xl bg-slate-500/10 text-slate-700 dark:text-slate-300 shrink-0 group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"/>
                    </svg>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block">GitHub Profile</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 truncate block">
                      github.com/zubairanwar499-bi
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-500 group-hover:translate-x-0.5 transition-all" />
              </a>

            </div>

          </div>

          {/* Right: High-Conversion Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200/80 dark:border-navy-800 shadow-md">
              
              {submitted ? (
                <div className="py-10 text-center space-y-5 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                      Inquiry Sent Successfully!
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                      Your message and project requirements have been routed directly to <strong>{personalInfo.email}</strong>. I will review the details and follow up with you within 24 hours.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <a
                      href={getDirectMailtoUrl()}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors shadow-md"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Open in Your Mail App</span>
                    </a>

                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          company: '',
                          projectType: 'Power BI Dashboard & DAX Modeling',
                          budget: '$2,500 - $5,000 (End-to-End Power BI Model)',
                          message: '',
                        });
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-navy-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-navy-750 transition-colors"
                    >
                      <span>Send Another Inquiry</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Your Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-sm bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-navy-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white placeholder-slate-400 transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-sm bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-navy-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white placeholder-slate-400 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Company */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        placeholder="Acme Corp / Startup"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-sm bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-navy-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white placeholder-slate-400 transition-all"
                      />
                    </div>

                    {/* Project Type */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Project Scope / Requirement
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-sm bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-navy-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white transition-all"
                      >
                        <option>Power BI Dashboard & DAX Modeling</option>
                        <option>Microsoft Fabric Lakehouse & Architecture</option>
                        <option>SQL Analytics & Data Mart Optimization</option>
                        <option>Excel Reporting Automation</option>
                        <option>Full-Time / Contract Role Inquiry</option>
                        <option>General Data Consulting</option>
                      </select>
                    </div>
                  </div>

                  {/* Budget Selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Estimated Project Budget
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-navy-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white transition-all"
                    >
                      <option>&lt; $2,500 (Small Dashboard / Query Audit)</option>
                      <option>$2,500 - $5,000 (End-to-End Power BI Model)</option>
                      <option>$5,000 - $10,000 (Multi-Source BI & SQL Data Mart)</option>
                      <option>$10,000+ (Enterprise Fabric Lakehouse Architecture)</option>
                      <option>Full-time Salary / Monthly Consulting Retainer</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Project Details & Goals <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Describe your current data sources, reporting challenges, and what business questions you need to answer..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-navy-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white placeholder-slate-400 transition-all"
                    ></textarea>
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-medium">
                      {errorMessage}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-200 disabled:opacity-50 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending message to {personalInfo.email}...</span>
                      </span>
                    ) : (
                      <>
                        <span>Send Message & Schedule Discovery</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
