import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, ChevronUp, GraduationCap } from 'lucide-react';
import './App.css'; 
export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [stats, setStats] = useState({ cgpa: 0, projects: 0, certifications: 0 });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'skills', 'projects', 'education', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const duration = 2000;
    const targets = { cgpa: 7.5, projects: 50 , certifications: 2 };
    const steps = 60;
    const increment = {
      cgpa: targets.cgpa / steps,
      projects: targets.projects / steps,
      certifications: targets.certifications / steps
    };

    let current = { cgpa: 7.5, projects: 4, certifications: 2 };
    let step = 0;

    const timer = setInterval(() => {
      if (step < steps) {
        current = {
          cgpa: Math.min(current.cgpa + increment.cgpa, targets.cgpa),
          projects: Math.min(Math.floor(current.projects + increment.projects), targets.projects),
          certifications: Math.min(Math.floor(current.certifications + increment.certifications), targets.certifications)
        };
        setStats(current);
        step++;
      } else {
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('Message sent successfully! 🎉');
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setFormStatus(''), 3000);
  };

 const projects = [
  {
    title: "College Dispensary Management System",
    description:
      "A digital platform for college medical staff to manage student health records, medicine inventory, and appointment scheduling efficiently.",
    tech: ["React", "Node.js", "MongoDB", "Express" , "NodeMailer" , "Tailwind CSS"],
    link: "https://dispensary-snowy.vercel.app/",
  },
  {
    title: "Zesty Bites – Online Food Ordering App",
    description:
      "A responsive food delivery web app where users can browse menus, add items to cart, and place orders with real-time order tracking.",
    tech: ["React", "Node.js", "MongoDB" , "Tailwind CSS" , "Stripe"],
    link: "#",
  },
  {
    title: "DevPulse – Task Management System",
    description:
      "A collaborative productivity tool for developers to track tasks, manage progress, and visualize team activity in real time.",
    tech: ["React", "Node.js", "MongoDB", "Socket.io"],
    link: "https://github.com/Sudarshan-03/TrackDev",
  },
  {
    title: "Personal Portfolio Website",
    description:
      "A modern, responsive portfolio showcasing my projects, skills, and achievements with smooth animations and a clean UI built using React and Tailwind CSS.",
    tech: ["React", "Tailwind CSS", "Framer Motion"],
    link: "#",
  },
];


  const skills = {
    "Programming": ["JavaScript", "Java", "C++" , "C"],
    "Web Development": ["React", "Node.js", "Next.js", "Express"],
    "AI & ML": ["TensorFlow", "Scikit-learn",],
    "Tools & Others": ["Git", "Vs Code", "AWS", "MongoDB"]
  };

  const education = [
    {
      year: "2022 - 2026",
      title: "B.Tech in Electrical Engineering",
      institution: "MNNIT Allahabad",
      description: "CGPA: 7.5/10 | Relevant coursework in Control System, Power System, Machine, Power Electronics"
    },
    {
      year: "2025",
      title: "Full Stack Development Certification",
      institution: "Online Learning Platform",
      description: "Comprehensive training in MERN stack development"
    },
    {
      year: "2024-25",
      title: "NCC 'C' Certificate",
      institution: "National Cadet Corps",
      description: "Awarded 'C' certificate for outstanding performance and leadership skills"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Portfolio
            </div>
            
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'skills', 'projects', 'education', 'contact'].map(item => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-colors ${activeSection === item ? 'text-purple-400' : 'text-gray-300 hover:text-white'}`}
                >
                  {item}
                </button>
              ))}
            </div>

            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-slate-800/95 backdrop-blur-md">
            {['home', 'about', 'skills', 'projects', 'education', 'contact'].map(item => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="block w-full text-left px-4 py-3 capitalize hover:bg-slate-700"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
       <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16 fade-in"> 

        <div className="text-center max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Hello, I'm <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Sudarshan Singh Yadav</span>
          </h1>
          <p className="text-2xl md:text-3xl text-gray-300 mb-8">Full Stack Developer & AI Enthusiast</p>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            Passionate about creating innovative web solutions and exploring the possibilities of artificial intelligence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection('projects')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform"
            >
              View My Work
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="border-2 border-purple-400 px-8 py-3 rounded-full font-semibold hover:bg-purple-400/10 transition-colors"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-4 scroll-mt-20">

        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-purple-400">Crafting Digital Experiences</h3>
              <p className="text-gray-300 mb-4">
                I'm a passionate developer with expertise in building scalable web applications and implementing cutting-edge AI solutions. With a strong foundation in both frontend and backend technologies, I bring ideas to life through clean, efficient code.
              </p>
              <p className="text-gray-300">
                Currently pursuing B.Tech in Electrical Engineering, I'm constantly learning and adapting to new technologies. My goal is to create impactful solutions that make a difference.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-slate-800/50 backdrop-blur p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-purple-400">{stats.cgpa.toFixed(1)}</div>
                <div className="text-sm text-gray-400 mt-2">CGPA</div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-pink-400">{stats.projects}+</div>
                <div className="text-sm text-gray-400 mt-2">Projects</div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-blue-400">{stats.certifications}+</div>
                <div className="text-sm text-gray-400 mt-2">Certifications</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 bg-slate-800/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Skills & Technologies</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="bg-slate-800/50 backdrop-blur p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 text-purple-400">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map(skill => (
                    <span key={skill} className="bg-slate-700 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Featured Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur rounded-xl overflow-hidden hover:scale-105 transition-transform">
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-3">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map(tech => (
                      <span key={tech} className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a href={project.link} className="inline-flex items-center text-purple-400 hover:text-purple-300">
                    View Project <ExternalLink size={16} className="ml-2" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-4 bg-slate-800/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Education & Certifications</h2>
          <div className="space-y-8">
            {education.map((item, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                    <GraduationCap size={24} />
                  </div>
                  {index < education.length - 1 && <div className="w-0.5 h-full bg-purple-500/30 mt-2"></div>}
                </div>
                <div className="flex-1 pb-8">
                  <div className="text-sm text-purple-400 mb-1">{item.year}</div>
                  <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                  <div className="text-gray-400 mb-2">{item.institution}</div>
                  <p className="text-gray-500">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Let's Work Together</h2>
          <p className="text-gray-400 mb-12">Have a project in mind? Let's discuss how we can collaborate!</p>
          <div className="bg-slate-800/50 backdrop-blur p-8 rounded-xl">
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-400"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-400"
              />
              <textarea
                rows={5}
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-400"
              />
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 py-3 rounded-lg font-semibold hover:scale-105 transition-transform"
              >
                Send Message
              </button>
              {formStatus && (
                <div className="text-green-400 text-center mt-4">{formStatus}</div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 mb-4 md:mb-0">
            © 2025 Sudarshan. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="https://github.com/Sudarshan-03" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/sudarshan03/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin size={24} />
            </a>
            <a href="mailto:sudarshan2004yadav@gmail.com" className="text-gray-400 hover:text-white transition-colors">
              <Mail size={24} />
            </a>
          </div>
          <button
            onClick={() => scrollToSection('home')}
            className="mt-4 md:mt-0 bg-purple-500 p-2 rounded-full hover:bg-purple-600 transition-colors"
          >
            <ChevronUp size={24} />
          </button>
        </div>
      </footer>
    </div>
  );
}