import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import "./HeroSection.css"; // Make sure you also updated your CSS file!

const HeroSection = () => {
  const navigate = useNavigate();

  // Roadmap steps config
  const steps = useMemo(
    () => [
      { id: 0, title: "Assess Skills", icon: "🧭", color: "#3B82F6", link: "/resume-analyzer" },
      { id: 1, title: "Build Profile", icon: "🧱", color: "#10B981", link: "/resume-builder" },
      { id: 2, title: "Explore Paths", icon: "🗺️", color: "#F59E0B", link: "/college-finder" },
      { id: 3, title: "Find Opportunities", icon: "🎯", color: "#EF4444", link: "/jobs" },
      { id: 4, title: "Connect & Grow", icon: "🌐", color: "#8B5CF6", link: "/community" },
      { id: 5, title: "Track Success", icon: "📈", color: "#06B6D4", link: "/notifications" },
    ],
    []
  );

  // Feature cards config
  const features = useMemo(
    () => [
      { title: "DreamFlow AI", desc: "AI Career Bot", icon: "🤖", color: "#8B5CF6", link: "/ai-bot" },
     
      { title: "Resume Analyzer", desc: "ATS Score", icon: "📝", color: "#10B981", link: "/resume-analyzer" },
      { title: "Scholarships", desc: "Funding", icon: "🎓", color: "#F59E0B", link: "/scholarships" },
      { title: "Job Alerts", desc: "Real-time", icon: "📣", color: "#EF4444", link: "/jobs" },
      { title: "Courses", desc: "Skill Up", icon: "📚", color: "#06B6D4", link: "/courses" },
      { title: "Events", desc: "Networking", icon: "📅", color: "#EC4899", link: "/events" },
    ],
    []
  );

  const [activeStep, setActiveStep] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Observe elements to add 'is-visible' when they scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          if (entry.isIntersecting) el.classList.add("is-visible");
        });
      },
      { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
    );
    const nodes = document.querySelectorAll(".animate-pop");
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  // Auto-advance roadmap
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [steps.length]);

  const scrollToRoadmap = () => {
    const el = document.getElementById("roadmap");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const watchDemo = () => {
    navigate("/demo");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="homepage">
      {/* Header */}
      <motion.header initial={{ y: -100 }} animate={{ y: 0 }} className="header">
        <div className="nav-container">
          <div className="logo">
            <img src="/logo.png" alt="CarrerFlow Logo" className="logo-icon" />
            <span className="logo-text">CarrerFlow</span>
          </div>
          <button
            className="menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
          <nav className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`} aria-label="Primary">
            <Link to="/jobs" onClick={() => setMobileMenuOpen(false)}>Jobs</Link>
            <Link to="/community" onClick={() => setMobileMenuOpen(false)}>Community</Link>
            <Link to="/scholarships" onClick={() => setMobileMenuOpen(false)}>Scholarships</Link>
            <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link>
          </nav>
        </div>
      </motion.header>

      {/* Hero */}
      <section className="hero" aria-labelledby="hero-title">
        {/*
          <<<<< START: THIS IS THE NEW WRAPPER YOU NEED TO ADD >>>>>
          This div wraps both your text and the new video
        */}
        <div className="hero-main-content">
          {/* This is your existing hero-content div */}
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 id="hero-title" className="hero-title">
              Chart Your <span className="highlight">Career Path</span>
              <br />
              with <span className="ai-highlight">CarrerFlow</span>
            </h1>
            <p className="hero-subtitle">
              Your all-in-one career guidance platform with AI-powered insights, resume tools, job
              matching, and community support.
            </p>
            <div className="hero-buttons">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cta-primary"
                onClick={scrollToRoadmap}
              >
                Start Your Journey
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="cta-secondary"
                onClick={watchDemo}
              >
                Watch Demo
              </motion.button>
            </div>
          </motion.div>

          {/*
            <<<<< THIS IS THE NEW VIDEO SECTION YOU NEED TO ADD >>>>>
            It goes right after the </motion.div> of hero-content
          */}
          <motion.div
            className="hero-video-container"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/*
              <<<<< PUT YOUR VIDEO LINK HERE >>>>>
              Change "/careerflow-demo.mp4" to your video's path
              (e.g., "/my-video.mp4")
            */}
            <video
              className="hero-video"
              src="/video1.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
          </motion.div>
          {/* <<<<< END: THIS IS THE CLOSING TAG FOR hero-main-content >>>>> */}
        </div>

        {/* Roadmap with SVG path (This part stays the same) */}
        <div id="roadmap" className="roadmap-container">
          <div className="roadmap">
            {/* Dynamic SVG Path */}
            <motion.svg
              className="roadmap-path"
              width="1000"
              height="200"
              viewBox="0 0 1000 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              initial={{ strokeDashoffset: 1000 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{
                position: "absolute",
                top: 0, left: 0,
                width: "100%", height: "200px", pointerEvents: "none",
                zIndex: 1
              }}
            >
              <path
                d="M 80 120 Q 200 60 320 120 Q 440 180 560 120 Q 680 60 800 120"
                stroke="#2563EB"
                strokeWidth="6"
                fill="none"
                strokeDasharray="1000"
              />
            </motion.svg>
            {/* Steps */}
            <div className="roadmap-steps">
              {steps.map((step, index) => {
                const isActive = activeStep === index;
                return (
                  <motion.div
                    key={step.id}
                    className={`roadmap-step ${isActive ? "active" : ""} step-animate animate-pop`}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: isActive ? 1.05 : 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    style={{
                      ["--step-color"]: step.color,
                      ["--anim-delay"]: `${index * 0.08}s`,
                    }}
                    onClick={() => {
                      setActiveStep(index);
                      navigate(step.link);
                    }}
                  >
                    <div className="step-icon" aria-hidden="true">
                      {step.icon}
                    </div>
                    <div className="step-content">
                      <h3>{step.title}</h3>
                    </div>
                    <div className="step-line" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features" aria-labelledby="features-title">
        <h2 id="features-title" className="section-title">Everything You Need</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="feature-card feature-anim animate-pop"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              onClick={() => navigate(feature.link)}
              style={{ ["--anim-delay"]: `${index * 0.06}s` }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") navigate(feature.link);
              }}
              aria-label={`${feature.title} - ${feature.desc}`}
            >
              <div className="card-icon" style={{ backgroundColor: `${feature.color}20` }}>
                <span style={{ color: feature.color, fontSize: "1.75rem" }}>{feature.icon}</span>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
              <button
                type="button"
                className="card-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(feature.link);
                }}
              >
                Go to {feature.title}
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="stats" aria-label="Platform statistics">
        <div className="stats-grid">
          <motion.div className="stat-item animate-pop" style={{ ["--anim-delay"]: `0.05s` }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <div className="stat-number">10K+</div>
            <div className="stat-label">Active Users</div>
          </motion.div>
          <motion.div className="stat-item animate-pop" style={{ ["--anim-delay"]: `0.18s` }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <div className="stat-number">500+</div>
            <div className="stat-label">Jobs Daily</div>
          </motion.div>
          <motion.div className="stat-item animate-pop" style={{ ["--anim-delay"]: `0.28s` }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <div className="stat-number">95%</div>
            <div className="stat-label">Success Rate</div>
          </motion.div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="cta-footer">
        <div className="cta-content">
          <h2>Ready to Transform Your Career?</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cta-footer-btn"
            onClick={() => navigate("/signup")}
          >
            Get Started Free
          </motion.button>
        </div>
      </footer>
    </div>
  );
};

export default HeroSection;