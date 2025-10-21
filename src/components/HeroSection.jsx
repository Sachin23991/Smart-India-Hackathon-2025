import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import "./HeroSection.css";

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

  // Auto-advance roadmap
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [steps.length]);

  // Smooth scroll to roadmap
  const scrollToRoadmap = () => {
    const el = document.getElementById("roadmap");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Watch demo placeholder
  const watchDemo = () => {
    // Replace with your modal or video route
    navigate("/demo");
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close mobile menu when navigating
  const handleNavClick = (path) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <div className="homepage">
      {/* Header */}
      <motion.header initial={{ y: -100 }} animate={{ y: 0 }} className="header">
        <div className="nav-container">
          <div className="logo">
            {/* Keep this path aligned with your fixed logo path rule */}
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

        {/* Roadmap */}
        <div id="roadmap" className="roadmap-container">
          <div className="roadmap">
            <svg className="roadmap-path" viewBox="0 0 1200 300" preserveAspectRatio="none" aria-hidden="true">
              <path
                d="M 50,150 Q 200,100 350,140 Q 500,180 650,120 Q 800,160 950,140 Q 1100,120 1150,150"
                stroke="#E5E7EB"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />
            </svg>

            <div className="roadmap-steps">
              {steps.map((step, index) => {
                const isActive = activeStep === index;
                return (
                  <motion.div
                    key={step.id}
                    className={`roadmap-step ${isActive ? "active" : ""}`}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: isActive ? 1.05 : 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    style={{ ["--step-color"]: step.color }}
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
              className="feature-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              onClick={() => navigate(feature.link)}
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
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <div className="stat-number">10K+</div>
            <div className="stat-label">Active Users</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="stat-number">500+</div>
            <div className="stat-label">Jobs Daily</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
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