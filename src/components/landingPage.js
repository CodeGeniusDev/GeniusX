import React, { useRef, useState, useEffect } from "react";

const projects = [
  {
    title: "CRM Web App (The Creative Traders)",
    description:
      "Lead management, follow-ups, reports, analytics — built with React, Node, MongoDB.",
    github: "https://github.com/code-genius/crm-web-app",
    live: "#",
    image:
      "https://user-images.githubusercontent.com/74038190/212751381-b0b2320e-6ef6-4041-a77a-de279fe5d3ae.gif",
    category: "Web App",
  },
  {
    title: "CodeGeniusBot",
    description:
      "AI chatbot widget with Gemini API, modular React UI, and Tailwind CSS styling.",
    github: "https://github.com/CodeGeniusDev/CodeGenius-ChatBot",
    live: "https://geniusbot-three.vercel.app/",
    image:
      "https://user-images.githubusercontent.com/74038190/212750147-854a394f-fee9-4080-9770-78a4b7ece53f.gif",
    category: "Web App",
  },
  {
    title: "Portfolio Website",
    description:
      "Modern responsive portfolio built with React & hosted via Vercel.",
    github: "https://github.com/CodeGeniusDev/Portfolio-Web-MAIN",
    live: "https://portfolio.triplealpha.blog",
    image:
      "https://user-images.githubusercontent.com/74038190/264141683-8aa99f6c-267d-4977-9cd3-1a4c11675863.gif",
    category: "Portfolio",
  },
  {
    title: "Business Website (TA Enterprises)",
    description:
      "Import/export website for rice, dry fruits, sesame, henna, with lead form and branding.",
    github: "https://github.com/code-genius/ta-enterprises",
    live: "https://taenterprises.com.pk/",
    image:
      "https://user-images.githubusercontent.com/74038190/240885342-127d79d7-e59d-4aa8-bd18-63b89c666d95.gif",
    category: "Business",
  },
  {
    title: "CodeGenius.Dev Landing Page",
    description:
      "Responsive landing page for branding and project showcases using React.",
    github: "https://github.com/CodeGeniusDev/Apple-Landing-Page",
    live: "https://code-page-3.netlify.app/",
    image:
      "https://user-images.githubusercontent.com/74038190/238353480-219bcc70-f5dc-466b-9a60-29653d8e8433.gif",
    category: "Landing Page",
  },
  {
    title: "Fitness Tracker App",
    description:
      "A fitness tracking app built with React and Firebase to log workouts and set goals.",
    github: "https://github.com/code-genius/fitness-tracker",
    live: "https://fitness-tracker-ten.vercel.app/",
    image:
      "https://user-images.githubusercontent.com/74038190/249570803-02293768-9242-47e1-bf8f-d084ba0a2d1d.gif",
    category: "Web App",
  },
  {
    title: "Weather Forecast Dashboard",
    description:
      "Weather app using OpenWeatherMap API with beautiful UI and responsive layout.",
    github: "https://github.com/CodeGeniusDev/Weather-App",
    live: "",
    image:
      "https://user-images.githubusercontent.com/74038190/212748842-9fcbad5b-6173-4175-8a61-521f3dbb7514.gif",
    category: "Web App",
  },
  {
    title: "TrueFocus",
    description:
      "Productivity web app with task management, Pomodoro timer, progress tracking, cross-platform access.",
    github: "https://github.com/CodeGeniusDev/TrueFocus",
    live: "",
    image:
      "https://user-images.githubusercontent.com/74038190/212749447-bfb7e725-6987-49d9-ae85-2015e3e7cc41.gif",
    category: "Web App",
  },
  {
    title: "WealthX",
    description:
      "Expense tracker built with React and Vite, offering an intuitive interface for users to manage expenses and track financial goals.",
    github: "https://github.com/CodeGeniusDev/WealthX",
    live: "https://wealthx.netlify.app/",
    image:
      "https://user-images.githubusercontent.com/74038190/240815068-993370af-11f4-48e7-9e0d-e5b79c2e7890.gif",
    category: "Web App",
  },
  {
    title: "Python Password Checker",
    description:
      "A Python script that checks password strength and helps users create secure passwords.",
    github: "https://github.com/CodeGeniusDev/Python-Check-password",
    live: "#",
    image:
      "https://user-images.githubusercontent.com/74038190/212749168-86d6c7ab-98da-409b-998f-c5b74721badd.gif",
    category: "Utility",
  },
  {
    title: "Emoji Game",
    description:
      "A fun web game where players guess the meaning behind sequences of emojis.",
    github: "https://github.com/CodeGeniusDev/Emoji-Game",
    live: "#",
    image:
      "https://user-images.githubusercontent.com/74038190/225813708-98b745f2-7d22-48cf-9150-083f1b00d6c9.gif",
    category: "Game",
  },
  {
    title: "Watch Landing Page",
    description:
      "A visually engaging landing page template for watches, designed with HTML and CSS.",
    github: "https://github.com/CodeGeniusDev/Watch-Web",
    live: "#",
    image:
      "https://user-images.githubusercontent.com/74038190/219923823-bf1ce878-c6b8-4faa-be07-93e6b1006521.gif",
    category: "Landing Page",
  },
  {
    title: "Headphones Landing Page",
    description:
      "A responsive landing page template for headphones, featuring modern design elements.",
    github: "https://github.com/CodeGeniusDev/Headphones-Landing-Page",
    live: "#",
    image:
      "https://user-images.githubusercontent.com/74038190/212750672-2f3f2b50-c84f-4ed8-a60a-849ae69ff9df.gif",
    category: "Landing Page",
  },
];

function MainPage() {
  const headerRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const [typedText, setTypedText] = useState("");
  const subtitleText = "Full-Stack Web Developer | UI/UX Designer";

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < subtitleText.length) {
        setTypedText(subtitleText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);
    return () => clearInterval(typingInterval);
  }, []);

  const scrollToSection = (id) => {
    const headerHeight = headerRef.current.offsetHeight;
    const target = document.getElementById(id);
    if (target) {
      const targetPosition =
        target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const filteredProjects =
    activeTab === "All"
      ? projects
      : projects.filter((project) => project.category === activeTab);

  const categories = [
    "All",
    ...new Set(projects.map((project) => project.category)),
  ];

  return (
    <main className="min-h-screen bg-background font-sans text-black">
      <style>
        {`
          @keyframes staggeredFadeIn {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowBorder {
            0% { box-shadow: 0 0 5px rgba(150, 136, 125, 0.5); }
            50% { box-shadow: 0 0 15px rgba(150, 136, 125, 0.8); }
            100% { box-shadow: 0 0 5px rgba(150, 136, 125, 0.5); }
          }
          @keyframes wave {
            0% { background-position-x: 0; }
            100% { background-position-x: 1000px; }
          }
          @keyframes fadeInOut {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .staggered-fade-in {
            animation: staggeredFadeIn 0.5s ease-in-out forwards;
          }
          .glow-border {
            animation: glowBorder 2s infinite ease-in-out;
          }
          .wave-bg {
            background: linear-gradient(to right, #f4f4f0 0%, #e0e0e0 50%, #f4f4f0 100%);
            background-size: 200%;
            animation: wave 8s linear infinite;
          }
          .tilt-hover {
            transition: transform 0.3s ease;
          }
          .tilt-hover:hover {
            transform: perspective(1000px) rotateX(5deg) rotateY(5deg);
          }
          .input-focus {
            transition: all 0.3s ease;
          }
          .input-focus:focus {
            transform: scale(1.02);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          .top-up-button {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 100;
            background-color: #2563eb;
            color: white;
            padding: 12px;
            border-radius: 50%;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            transition: opacity 0.3s ease, transform 0.3s ease;
            opacity: 0;
            transform: translateY(10px);
          }
          .top-up-button.visible {
            opacity: 1;
            transform: translateY(0);
            animation: fadeInOut 0.3s ease forwards;
          }
        `}
      </style>

      {/* Enhanced Header */}
      <nav
        ref={headerRef}
        className="sticky top-0 z-50 bg-gradient-to-r from-white to-gray-50 border-b border-black/10 py-4 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-primary tracking-tight">
            CodeGenius.Dev
          </h1>
          <button
            className="md:hidden text-2xl focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            <i className="fas fa-bars text-gray-800 hover:text-primary transition-colors duration-300"></i>
          </button>
          <div className="hidden md:flex space-x-8 items-center">
            {["about", "skills", "projects", "contact"].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(section);
                }}
                className="relative text-lg font-medium text-gray-800 hover:text-primary transition-colors duration-300 group"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <a
              href="https://github.com/CodeGeniusDev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-gray-800 hover:text-primary transition-colors duration-300"
              aria-label="GitHub Profile"
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              href="https://www.youtube.com/@CodeGeniusDev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-gray-800 hover:text-primary transition-colors duration-300"
              aria-label="YouTube Channel"
            >
              <i className="fab fa-youtube"></i>
            </a>
          </div>
          {/* Mobile and Tablet Menu with Backdrop and Icons */}
          {isMenuOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsMenuOpen(false)}
            ></div>
          )}
          <div
            className={`fixed top-14 right-4 w-48 bg-white border border-black/10 rounded-lg shadow-lg z-50 transform transition-all duration-300 ease-in-out ${
              isMenuOpen
                ? "translate-y-0 opacity-100"
                : "-translate-y-2 opacity-0 pointer-events-none"
            }`}
          >
            <div className="flex flex-col p-4 space-y-3">
              {["about", "skills", "projects", "contact"].map((section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(section);
                  }}
                  className="text-lg font-medium text-gray-800 hover:text-primary transition-colors duration-300"
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              ))}
              <div className="flex space-x-4 mt-4">
                <a
                  href="https://github.com/CodeGeniusDev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-gray-800 hover:text-primary transition-colors duration-300"
                  aria-label="GitHub Profile"
                >
                  <i className="fab fa-github"></i>
                </a>
                <a
                  href="https://www.youtube.com/@CodeGeniusDev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-gray-800 hover:text-primary transition-colors duration-300"
                  aria-label="YouTube Channel"
                >
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 my-12 mx-4 rounded-2xl shadow-lg overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-20 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center md:space-x-16">
            <div className="relative mb-8 md:mb-0">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-full blur-xl"></div>
              <img
                src="https://avatars.githubusercontent.com/u/164690054?v=4"
                alt="Profile"
                className="relative w-56 h-56 rounded-full object-cover border-4 border-primary shadow-lg transition-transform duration-500"
              />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-fadeInDown tracking-tight">
                Welcome to My Portfolio
              </h2>
              <p className="text-lg md:text-xl mb-6 max-w-xl mx-auto animate-fadeInUp text-gray-600">
                {typedText}
                <span className="inline-block w-0.5 h-5 bg-primary animate-blink"></span>
              </p>
              <a
                href="https://portfolio.triplealpha.blog"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl hover:bg-black transition-all duration-300 glow-border animate-fadeInUp"
                aria-label="Visit CodeGenius.Dev Portfolio"
              >
                Explore My Work
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section id="about" className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center animate-fadeInDown tracking-tight">
            About Me
          </h2>
          <div className="bg-white p-8 rounded-2xl shadow-lg bg-gradient-to-br from-gray-50 to-white">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-2/3">
                <p className="text-lg leading-relaxed text-center md:text-left animate-fadeInUp text-gray-700">
                  I'm a passionate web developer specializing in frontend
                  development while exploring backend technologies. I thrive on
                  creating clean, responsive websites and intuitive user
                  interfaces, blending creativity with functionality to deliver
                  exceptional digital experiences.
                </p>
              </div>
              <div className="md:w-1/3">
                <h3 className="text-xl font-semibold mb-4 text-center md:text-left text-primary">
                  Key Skills
                </h3>
                <ul className="flex flex-wrap gap-3 justify-center md:justify-start">
                  {[
                    "HTML5/CSS3",
                    "JavaScript",
                    "React.js",
                    "UI/UX Design",
                    "Graphic Design",
                  ].map((skill, index) => (
                    <li
                      key={index}
                      className="bg-gray-100 text-sm font-medium py-2 px-4 rounded-full border border-black/10 hover:bg-primary hover:text-white transition-all duration-300 shadow-sm animate-fadeInUp"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Skills Section */}
      <section id="skills" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center animate-fadeInDown tracking-tight">
            My Expertise
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "HTML5/CSS3", icon: "fab fa-html5" },
              { name: "JavaScript", icon: "fab fa-js" },
              { name: "React.js", icon: "fab fa-react" },
              { name: "Next.js", icon: "fab fa-node" },
              { name: "UI/UX Design", icon: "fas fa-paint-brush" },
              { name: "Figma", icon: "fab fa-figma" },
              { name: "Graphic Design", icon: "fas fa-palette" },
              { name: "Node.js (Learning)", icon: "fab fa-node-js" },
            ].map((skill, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-md p-4 rounded-lg border border-black/10 shadow-lg hover:shadow-xl hover:bg-primary hover:text-white transition-all duration-300 animate-fadeInUp hover:rotate-2"
              >
                <div className="flex items-center justify-center space-x-2">
                  <i className={`${skill.icon} text-xl`}></i>
                  <p className="text-center font-medium">{skill.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Projects Section */}
      <section id="projects" className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center animate-fadeInDown tracking-tight">
            Projects
          </h2>
          <div className="flex overflow-x-auto space-x-4 mb-8 pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-5 py-2 rounded-lg font-medium transition-all duration-300 whitespace-nowrap shadow-md ${
                  activeTab === category
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-black hover:bg-gray-200"
                } animate-fadeIn`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={`${activeTab}-${index}`}
                className="bg-white p-6 rounded-xl border border-black/10 shadow-lg tilt-hover glow-border staggered-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-40 object-cover rounded-lg mb-4 transition-transform duration-300 hover:scale-105"
                />
                <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                <p className="text-sm mb-4 text-gray-600">
                  {project.description}
                </p>
                <div className="flex gap-3 justify-between">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-transparent text-primary font-medium py-2 px-4 rounded-md border border-primary hover:bg-primary hover:text-white transition-all duration-300"
                    aria-label={`View ${project.title} on GitHub`}
                  >
                    GitHub
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-block font-medium py-2 px-4 rounded-md transition-all duration-300 ${
                      project.live === "#"
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-primary text-white hover:bg-black"
                    }`}
                    aria-label={`View live demo of ${project.title}`}
                  >
                    View
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center animate-fadeInDown tracking-tight">
            Get in Touch
          </h2>
          <div className="max-w-lg mx-auto">
            <form className="space-y-6 animate-fadeInUp">
              {[
                {
                  id: "name",
                  label: "Name",
                  type: "text",
                  placeholder: "Your Name",
                },
                {
                  id: "email",
                  label: "Email",
                  type: "email",
                  placeholder: "Your Email",
                },
              ].map((field) => (
                <div key={field.id}>
                  <label
                    htmlFor={field.id}
                    className="block text-sm font-medium mb-1"
                  >
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    id={field.id}
                    className="w-full px-4 py-2 border border-black/20 rounded-lg bg-gray-50 shadow-inner input-focus focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder={field.placeholder}
                  />
                </div>
              ))}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  className="w-full px-4 py-2 border border-black/20 rounded-lg bg-gray-50 shadow-inner input-focus focus:outline-none focus:ring-2 focus:ring-primary h-24 resize-none"
                  placeholder="Your Message"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-black transition-all duration-300 shadow-md hover:shadow-lg glow-border"
              >
                Send Message
              </button>
            </form>
            <div className="mt-8 text-center animate-fadeInUp">
              <p className="text-lg mb-4">Or reach me at:</p>
              <div className="flex justify-center space-x-6 mb-4">
                <a
                  href="mailto:codegenius.inc@gmail.com"
                  className="text-primary hover:underline"
                >
                  Email
                </a>
                <a
                  href="https://wa.me/923291540015"
                  className="text-primary hover:underline"
                >
                  WhatsApp
                </a>
              </div>
              <p className="text-gray-600">Location: Lahore, Pakistan</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-background border-t border-black py-8 wave-bg">
        <div className="flex justify-center space-x-6 mb-4">
          {[
            { href: "https://github.com/CodeGeniusDev", icon: "fab fa-github" },
            {
              href: "https://www.youtube.com/@CodeGeniusDev",
              icon: "fab fa-youtube",
            },
            { href: "https://wa.me/923291540015", icon: "fab fa-whatsapp" },
          ].map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-primary transition-colors duration-300"
            >
              <i className={`${social.icon} text-2xl`}></i>
            </a>
          ))}
        </div>
        <p className="text-sm text-center">
          © 2025 <a className="text-black font-bold hover:text-primary hover:underline transition-colors duration-300" href="https://portfolio.triplealpha.blog">CodeGenius.Dev</a> - All rights reserved
        </p>
      </footer>
    </main>
  );
}

export default MainPage;
