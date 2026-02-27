import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// This is a reusable "Component" - think of it as a template for your service boxes
function ServiceCard({ title, desc }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="p-8 rounded-2xl bg-abz-dark/50 border border-abz-gray hover:border-abz-accent transition-colors group cursor-default"
    >
      <div className="w-12 h-12 bg-abz-accent/10 rounded-lg mb-6 flex items-center justify-center text-abz-accent group-hover:bg-abz-accent group-hover:text-black transition-all">
        ◈
      </div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-abz-gray leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function ProjectCard({ title, category, imageSrc }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group rounded-2xl overflow-hidden bg-abz-dark border border-abz-gray hover:border-abz-accent transition-all duration-300"
    >
      <div className="h-64 bg-abz-gray relative overflow-hidden">
        {/* Placeholder image or actual image */}
        <div className="absolute inset-0 bg-abz-gray flex items-center justify-center text-abz-gray group-hover:scale-105 transition-transform duration-500">
          {imageSrc ? (
            <img src={imageSrc} alt={title} className="w-full h-full object-cover" />
          ) : (
            <span className="text-sm uppercase tracking-widest">[Image Placeholder]</span>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-abz-dark via-transparent to-transparent opacity-80" />
      </div>
      <div className="p-6">
        <p className="text-abz-accent text-sm font-medium tracking-wider mb-2 uppercase">{category}</p>
        <h3 className="text-2xl font-bold text-white group-hover:text-abz-accent transition-colors line-clamp-1">{title}</h3>
      </div>
    </motion.div>
  );
}

function App() {
  const [result, setResult] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    // IMPORTANT: Get your access key from https://web3forms.com/ by entering info@abzolute.uk
    formData.append("access_key", "b05993e6-cc41-422e-855d-bfd1a7766d97");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Message sent successfully!");
        event.target.reset();
      } else {
        console.log("Error", data);
        setResult(data.message);
      }
    } catch (error) {
      console.error(error);
      setResult("Something went wrong. Please try again.");
    }

    setTimeout(() => setResult(""), 5000);
  };

  return (
    <div id="top" className="min-h-screen bg-abz-dark text-white selection:bg-abz-accent selection:text-black font-sans">

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-abz-dark/80 backdrop-blur-md border-b border-abz-gray/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#top" className="flex items-center cursor-pointer">
            {/* The user will need to save their transparent logo as 'logo-transparent.png' in the public folder */}
            <img
              src="/images/logo-transparent.png"
              alt="Abzolute Studio"
              className="h-14 md:h-16 object-contain"
            />
          </a>
          <div className="hidden md:flex gap-8 text-sm font-medium tracking-wider uppercase text-abz-gray">
            <a href="#expertise" className="hover:text-abz-accent transition-colors">Expertise</a>
            <a href="#portfolio" className="hover:text-abz-accent transition-colors">Portfolio</a>
            <a href="#contact" className="hover:text-abz-accent transition-colors">Contact</a>
          </div>
          <button
            className="md:hidden text-abz-accent z-50 p-2 relative"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-20 left-0 w-full bg-abz-dark/95 backdrop-blur-xl border-b border-abz-gray/50 shadow-2xl md:hidden overflow-hidden"
            >
              <div className="flex flex-col p-6 space-y-6 text-lg font-medium tracking-wider uppercase text-abz-gray">
                {['expertise', 'portfolio', 'contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-abz-accent transition-colors py-2 border-b border-abz-gray/20 last:border-none"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 1. Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center p-6 text-center relative overflow-hidden pt-20">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#5F646A_1px,transparent_1px),linear-gradient(to_bottom,#5F646A_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.05]"></div>

        {/* Glow effect */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-abz-accent/10 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-abz-accent/5 rounded-full blur-[100px] -z-10"></div>

        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl relative z-10"
        >
          <h1 className="flex justify-center mb-6">
            <img
              src="/images/logo-transparent.png"
              alt="Abzolute Studio"
              className="h-32 md:h-48 object-contain drop-shadow-[0_0_15px_rgba(0,229,255,0.1)]"
            />
          </h1>

          <p className="text-abz-gray text-lg md:text-2xl font-light tracking-[0.2em] uppercase mb-12">
            Digital Architecture & Premium Code
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <a href="#contact" className="bg-abz-accent text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all duration-300 cursor-pointer">
              Start a Project
            </a>
            <a href="#expertise" className="border border-abz-gray bg-abz-dark/50 backdrop-blur-sm text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-abz-gray hover:border-abz-gray transition-all duration-300 cursor-pointer">
              View Expertise
            </a>
          </div>
        </motion.main>
      </section>

      {/* 2. Services Section */}
      <section id="expertise" className="max-w-7xl mx-auto px-6 py-32 scroll-mt-20 relative">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center gap-4 mb-16"
        >
          <div className="w-12 h-1 bg-abz-accent"></div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight uppercase">
            Our Expertise
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ServiceCard
            title="Web Design"
            desc="Immersive interfaces that turn users into advocates. We build designs that breathe."
          />
          <ServiceCard
            title="Custom Apps"
            desc="Scalable React applications built for performance. Complex problems, elegant solutions."
          />
          <ServiceCard
            title="Brand Identity"
            desc="Visual systems that define the next generation of brands. Stand out from the noise."
          />
        </div>
      </section>

      {/* 3. Portfolio Section */}
      <section id="portfolio" className="relative py-32 bg-abz-dark/30 border-y border-abz-dark scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center justify-between mb-16"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-1 bg-abz-accent"></div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight uppercase">
                Selected Work
              </h2>
            </div>
            <button className="hidden md:flex items-center gap-2 text-abz-accent font-bold tracking-widest uppercase hover:text-white transition-colors">
              View All <span className="text-xl">→</span>
            </button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <ProjectCard title="Wanderlust AI Assistant" category="Travel Agency Chatbot" imageSrc="/images/travel_chatbot.png" />
            <ProjectCard title="Elite Drive Chauffeurs" category="Private Hire Web Platform" imageSrc="/images/kb-cars.png" />
            <ProjectCard title="Nexus Real Estate" category="Property Listing Portal" imageSrc="/images/property_portal.png" />
            <ProjectCard title="Pulse Fitness App" category="Gym Membership Dashboard" imageSrc="/images/gym_dashboard.png" />
          </div>

          <button className="md:hidden w-full mt-10 py-4 border border-abz-gray rounded-full text-abz-accent font-bold tracking-widest uppercase hover:bg-abz-gray transition-colors">
            View All Projects
          </button>
        </div>
      </section>

      {/* 4. Contact Section */}
      <section id="contact" className="max-w-7xl mx-auto px-6 py-32 scroll-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="w-12 h-1 bg-abz-accent mb-8"></div>
            <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase leading-tight">
              Let's Build <br /> <span className="text-abz-gray">The Future.</span>
            </h2>
            <p className="text-abz-gray text-lg mb-10 max-w-md leading-relaxed">
              Ready to elevate your digital presence? Tell us about your project and we'll get back to you within 24 hours.
            </p>

            <div className="space-y-6 text-abz-gray">
              <div className="flex flex-col gap-6">
                {/* Email */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-abz-dark border border-abz-gray flex items-center justify-center text-abz-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <a href="mailto:info@abzolute.uk" className="font-medium tracking-wide hover:text-white transition-colors">info@abzolute.uk</a>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-abz-dark border border-abz-gray flex items-center justify-center text-abz-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.18-7.076-7.076l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                    </svg>
                  </div>
                  <a href="tel:+447435121112" className="font-medium tracking-wide hover:text-white transition-colors">+44 7435 12 11 12</a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="bg-abz-dark/50 p-8 md:p-10 rounded-3xl border border-abz-gray shadow-2xl relative overflow-hidden"
          >
            {/* Subtle form glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-abz-accent/5 rounded-full blur-[80px] -z-10 pointer-events-none"></div>

            <form className="space-y-6 relative z-10" onSubmit={onSubmit}>
              <div className="space-y-2">
                <label className="text-xs font-bold tracking-widest text-abz-gray uppercase">Your Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full bg-abz-dark border border-abz-gray rounded-xl px-4 py-4 text-white focus:outline-none focus:border-abz-accent focus:ring-1 focus:ring-abz-accent transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold tracking-widest text-abz-gray uppercase">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full bg-abz-dark border border-abz-gray rounded-xl px-4 py-4 text-white focus:outline-none focus:border-abz-accent focus:ring-1 focus:ring-abz-accent transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold tracking-widest text-abz-gray uppercase">Project Details</label>
                <textarea
                  name="message"
                  required
                  rows="4"
                  className="w-full bg-abz-dark border border-abz-gray rounded-xl px-4 py-4 text-white focus:outline-none focus:border-abz-accent focus:ring-1 focus:ring-abz-accent transition-all resize-none"
                  placeholder="Tell us about your next big idea..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-abz-accent text-black font-bold text-lg py-4 rounded-xl hover:bg-white hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all duration-300 transform active:scale-[0.98] disabled:opacity-75 disabled:cursor-not-allowed"
                disabled={result === "Sending...."}
              >
                {result === "Sending...." ? "Sending..." : "Send Message"}
              </button>

              {result && (
                <div className={`text-center mt-6 p-4 rounded-xl border text-sm font-medium tracking-wide ${result.includes("success") ? "bg-green-500/10 text-green-400 border-green-500/30" : result === "Sending...." ? "bg-blue-500/10 text-blue-400 border-blue-500/30" : "bg-red-500/10 text-red-400 border-red-500/30"}`}>
                  {result}
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-abz-dark bg-abz-dark relative">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center">
            <img
              src="/images/logo-transparent.png"
              alt="Abzolute Studio"
              className="h-10 object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            />
          </div>
          <p className="text-abz-gray text-sm tracking-widest uppercase">
            © 2026 Abzolute Studio. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
