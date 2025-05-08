import React, { useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import InputForm from "./InputForm";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyB5WklP4dqWXMlIdUZ-UF5W1jfpHsfMJu4");

function ChatBox({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("chatHistory")) || []
  );
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const chatRef = useRef(null);
  const chatBodyRef = useRef(null);
  const notificationSound = useRef(new Audio("/assets/audio/bell-tone.wav"));
  const prevMessageCount = useRef(messages.length);

  const knowledgeBase = {
    bio: "I am an experienced Front-end web developer with a passion for creating seamless and visually appealing digital experiences. I specialize in HTML5, CSS3, JavaScript, Bootstrap, Tailwind CSS, jQuery, GSAP, React, Next.js, TypeScript, Node.js, Express.js, and Git, delivering responsive and user-friendly applications.",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Bootstrap",
      "Tailwind CSS",
      "jQuery",
      "GSAP",
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Git",
      "GitHub",
      "Figma",
      "UI/UX"
    ],
    projects: [
      {
        name: "ChatBot",
        link: "https://github.com/CodeGeniusDev/codegeniuschat",
        description: "A conversational chatbot built with React, powered by the Gemini API, and styled with Tailwind CSS. It enables users to interact with an AI for dynamic responses."
      },
      {
        name: "TrueFocus (Daily-Reminder)",
        link: "https://github.com/CodeGeniusDev/Daily-Reminder",
        description: "A productivity web app called TrueFocus, featuring task management, a Pomodoro timer, progress tracking, and cross-platform access to help users stay focused."
      },
      {
        name: "Apple Landing Page",
        link: "https://github.com/CodeGeniusDev/Apple-Landing-Page",
        description: "A React-based landing page inspired by Apple's design, incorporating a 3D object and responsive layouts for an engaging user experience."
      },
      {
        name: "Scripters Quiz App",
        link: "https://github.com/CodeGeniusDev/Scripters-app",
        description: "A clean, user-friendly quiz web app built with HTML, CSS, and JavaScript, featuring multiple categories, a dark/light theme toggle, score tracking, and responsive design."
      },
      {
        name: "WealthX",
        link: "https://github.com/CodeGeniusDev/WealthX",
        description: "An expense tracker application built with React and Vite, offering an intuitive interface for users to manage expenses and track financial goals efficiently."
      },
      {
        name: "Portfolio Website",
        link: "https://github.com/CodeGeniusDev/Portfolio-Web-MAIN",
        description: "A personal portfolio website showcasing my web development skills, featuring a clean, responsive design with interactive elements to highlight projects and expertise."
      },
      {
        name: "Weather App",
        link: "https://github.com/CodeGeniusDev/Weather-App",
        description: "A weather forecast app with a user-friendly interface, allowing users to search for weather updates by city or current location and view a detailed 5-day forecast."
      },
      {
        name: "Emoji Game",
        link: "https://github.com/CodeGeniusDev/Emoji-Game",
        description: "A fun web game where players guess the meaning behind sequences of emojis, offering a challenging and engaging puzzle experience."
      },
      {
        name: "Watch Landing Page",
        link: "https://github.com/CodeGeniusDev/Watch-Web",
        description: "A visually engaging landing page template for watches, designed with HTML and CSS, optimized for desktop viewing."
      },
      {
        name: "Headphone Landing Page",
        link: "https://github.com/CodeGeniusDev/Headphone-Landing-page",
        description: "A responsive landing page template for headphones, featuring modern design elements and a focus on user engagement."
      },
      {
        name: "Python Password Checker",
        link: "https://github.com/CodeGeniusDev/Python-Check-password",
        description: "A Python script that checks password strength and helps users create secure passwords to protect their accounts from unauthorized access."
      }
    ],
    contact: {
      email: "codegenius.inc@gmail.com",
      phone: "+92 329 1540015",
      github: "https://github.com/CodeGeniusDev",
      youtube: "https://www.youtube.com/@CodeGeniusDev",
      portfolio: "https://abdullah-portfolio-web-eight.vercel.app"
    },
    location: "Punjab, Pakistan"
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showHistory) {
      setIsHistoryLoading(true);
      const timer = setTimeout(() => {
        setIsHistoryLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showHistory]);

  const handleInteraction = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
      notificationSound.current.load();
    }
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      const chatBody = chatBodyRef.current;
      const isScrolledToBottom =
        chatBody.scrollHeight - chatBody.scrollTop <= chatBody.clientHeight + 10;
      if (isScrolledToBottom) {
        chatRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [messages]);

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    if (
      hasInteracted &&
      messages.length > prevMessageCount.current &&
      messages[messages.length - 1].role === "bot"
    ) {
      notificationSound.current.load();
      notificationSound.current
        .play()
        .catch((err) => console.error("Audio play failed:", err));
    }
    prevMessageCount.current = messages.length;
  }, [messages, hasInteracted]);

  const checkPersonalInfo = (input) => {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes("who am i")) {
      return `I’m here to assist you! If you’re asking about the developer behind this AI, I can tell you they’re an experienced web developer based in Punjab, Pakistan, with a passion for creating seamless digital experiences. Want to know more about their skills or projects?`;
    } else if (lowerInput.includes("bio") || lowerInput.includes("about")) {
      return `Here’s a bit about the developer: ${knowledgeBase.bio}`;
    } else if (lowerInput.includes("skills")) {
      return `The developer’s skills include: ${knowledgeBase.skills.join(", ")}.`;
    } else if (lowerInput.includes("projects") || lowerInput.includes("project")) {
      return `The developer has worked on the following projects: ${knowledgeBase.projects.map(p => `${p.name} (${p.link}) - ${p.description}`).join("; ")}.`;
    } else if (lowerInput.includes("landing page")) {
      return `The portfolio landing page is a responsive site built with React, designed for branding and showcasing projects. It is hosted on Vercel at ${knowledgeBase.contact.portfolio}.`;
    } else if (lowerInput.includes("location") || lowerInput.includes("live")) {
      return `The developer is based in ${knowledgeBase.location}.`;
    } else if (lowerInput.includes("contact") || lowerInput.includes("email") || lowerInput.includes("phone")) {
      return `You can reach the developer at: Email: ${knowledgeBase.contact.email}, GitHub: ${knowledgeBase.contact.github}, YouTube: ${knowledgeBase.contact.youtube}, Portfolio: ${knowledgeBase.contact.portfolio}${lowerInput.includes("phone") ? `, Phone: ${knowledgeBase.contact.phone}` : ''}.`;
    } else if (lowerInput.includes("who are you") || lowerInput.includes("what are you")) {
      return `I’m a personal AI agent for an experienced web developer. I can provide detailed information about their skills, projects, and how to get in touch—just ask!`;
    }
    return null;
  };

  const sendMessage = async (input) => {
    const userMessage = {
      role: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const personalResponse = checkPersonalInfo(input);
      if (personalResponse) {
        const botMessage = {
          role: "bot",
          content: personalResponse,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        const newMessages = [...updatedMessages, botMessage];
        setMessages(newMessages);

        setHistory((prev) => {
          if (!currentConversationId) {
            const newConversation = {
              id: Date.now(),
              messages: newMessages,
              timestamp: new Date().toISOString(),
            };
            setCurrentConversationId(newConversation.id);
            return [...prev, newConversation];
          } else {
            return prev.map((conv) =>
              conv.id === currentConversationId
                ? { ...conv, messages: newMessages, timestamp: new Date().toISOString() }
                : conv
            );
          }
        });
      } else {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `You are a personal AI agent for an experienced web developer based in ${knowledgeBase.location}. Use the following information when relevant: Bio: ${knowledgeBase.bio}, Skills: ${knowledgeBase.skills.join(", ")}, Projects: ${knowledgeBase.projects.map(p => `${p.name} (${p.link}) - ${p.description}`).join("; ")}, Contact: Email: ${knowledgeBase.contact.email}, GitHub: ${knowledgeBase.contact.github}, YouTube: ${knowledgeBase.contact.youtube}, Portfolio: ${knowledgeBase.contact.portfolio}. Answer the question: ${input}`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const botMessage = {
          role: "bot",
          content: text,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        const newMessages = [...updatedMessages, botMessage];
        setMessages(newMessages);

        setHistory((prev) => {
          if (!currentConversationId) {
            const newConversation = {
              id: Date.now(),
              messages: newMessages,
              timestamp: new Date().toISOString(),
            };
            setCurrentConversationId(newConversation.id);
            return [...prev, newConversation];
          } else {
            return prev.map((conv) =>
              conv.id === currentConversationId
                ? { ...conv, messages: newMessages, timestamp: new Date().toISOString() }
                : conv
            );
          }
        });
      }
    } catch (err) {
      const errorMessage = {
        role: "bot",
        content: "⚠️ An error occurred while processing your request. Please try again.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      const newMessages = [...updatedMessages, errorMessage];
      setMessages(newMessages);

      setHistory((prev) => {
        if (!currentConversationId) {
          const newConversation = {
            id: Date.now(),
            messages: newMessages,
            timestamp: new Date().toISOString(),
          };
          setCurrentConversationId(newConversation.id);
          return [...prev, newConversation];
        } else {
          return prev.map((conv) =>
            conv.id === currentConversationId
              ? { ...conv, messages: newMessages, timestamp: new Date().toISOString() }
              : conv
          );
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  const startNewConversation = () => {
    setMessages([]);
    setCurrentConversationId(null);
    setShowHistory(false);
  };

  const loadConversation = (conversation) => {
    setMessages(conversation.messages);
    setCurrentConversationId(conversation.id);
    setShowHistory(false);
  };

  const deleteConversation = (id) => {
    setHistory((prev) => prev.filter((conv) => conv.id !== id));
    if (id === currentConversationId) {
      setMessages([]);
      setCurrentConversationId(null);
    }
  };

  const copyMessage = async (content) => {
    try {
      await navigator.clipboard.writeText(content);
      alert("Message copied to clipboard successfully!");
    } catch (err) {
      console.error("Failed to copy message:", err);
      alert("Failed to copy message. Please try again.");
      const textarea = document.createElement("textarea");
      textarea.value = content;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        alert("Message copied to clipboard (fallback method)!");
      } catch (fallbackErr) {
        console.error("Fallback copy failed:", fallbackErr);
        alert("Failed to copy message. Please copy manually.");
      } finally {
        document.body.removeChild(textarea);
      }
    }
  };

  const toggleMaximize = () => {
    setIsMaximized((prev) => !prev);
  };

  const getTimeDifference = (timestamp) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffInDays = Math.floor((now - past) / (1000 * 60 * 60 * 24));
    return diffInDays > 0 ? `${diffInDays}d ago` : "Today";
  };

  return (
    <div
      className={`chat-box fixed bottom-3 md:bottom-4 lg:bottom-6 right-3 md:right-4 lg:right-6 ${isMaximized ? "w-[95vw] sm:w-[85vw] md:w-[60vw] lg:w-[40vw] h-[80vh] sm:h-[75vh] md:h-[70vh] lg:h-[75vh] max-h-[90vh]" : "w-[95vw] sm:w-[75vw] md:w-[35vw] lg:w-[25vw] max-h-[80vh] h-[60vh] sm:h-[65vh]"} bg-gradient-to-br from-blue-50 via-white to-gray-100 [backdrop-filter:blur(10px)] rounded-lg md:rounded-xl border border-gray-200 shadow-xl z-50 flex flex-col transition-all duration-300 font-['Inter']`}
      onClick={handleInteraction}
    >
      <style>
        {`
          @keyframes shimmer {
            0% { background-position: -200px 0; }
            100% { background-position: 200px 0; }
          }
          .animate-shimmer {
            background-size: 200px 100%;
            animation: shimmer 1.5s infinite;
          }
        `}
      </style>
      <div className="chat-header bg-gradient-to-r from-gray-800 to-gray-600 text-white p-2 sm:p-3 md:p-3 rounded-t-lg md:rounded-t-xl flex justify-between items-center shadow-md">
        <span
          onClick={() => setShowHistory(true)}
          className="history-tab cursor-pointer hover:bg-primary px-2 sm:px-3 py-1 sm:py-1.5 rounded flex items-center gap-2 sm:gap-2 transition duration-300 transform"
        >
          <i className="fas fa-history text-base sm:text-lg md:text-lg"></i>
          <span className="hidden sm:inline md:block font-medium text-sm sm:text-base md:text-sm">History</span>
        </span>
        <div className="chat-header-buttons flex gap-5 sm:gap-3 md:gap-4">
          <div className="relative group">
            <button
              onClick={startNewConversation}
              className="hover:text-gray-300 flex items-center gap-1 sm:gap-1.5 transition duration-300 transform"
            >
              <i className="fas fa-plus text-base sm:text-lg md:text-xl"></i>
            </button>
            <span className="absolute w-max hidden group-hover:block -top-8 sm:-top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs sm:text-sm rounded py-1 px-2 transition-opacity duration-300">
              Start New Chat
            </span>
          </div>
          <div className="relative group">
            <button
              onClick={clearChat}
              className="hover:text-gray-300 flex items-center gap-1 sm:gap-1.5 transition duration-300 transform"
            >
              <i className="fas fa-trash text-base sm:text-lg md:text-lg"></i>
            </button>
            <span className="absolute w-max hidden group-hover:block -top-8 sm:-top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs sm:text-sm rounded py-1 px-2 transition-opacity duration-300">
              Clear Chat
            </span>
          </div>
          <div className="relative group">
            <button
              onClick={toggleMaximize}
              className={`hover:text-gray-300 ${isMaximized ? "minimize" : "maximize"} flex items-center gap-1 sm:gap-1.5 transition duration-300 transform`}
            >
              <i className="fas fa-expand text-base sm:text-lg md:text-lg"></i>
            </button>
            <span className="absolute w-max hidden group-hover:block -top-8 sm:-top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs sm:text-sm rounded py-1 px-2 transition-opacity duration-300">
              {isMaximized ? "Minimize" : "Maximize"}
            </span>
          </div>
          <div className="relative group">
            <button
              onClick={onClose}
              className="hover:text-gray-300 flex items-center gap-1 sm:gap-1.5 transition duration-300 transform"
            >
              <i className="fas fa-times text-base sm:text-lg md:text-xl"></i>
            </button>
            <span className="absolute w-max hidden group-hover:block -top-8 sm:-top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs sm:text-sm rounded py-1 px-2 transition-opacity duration-300">
              Close Chat
            </span>
          </div>
        </div>
      </div>
      {showHistory ? (
        <div className="history-panel flex-1 p-2 sm:p-3 md:p-4 bg-gray-50 overflow-y-auto transition-opacity duration-500 ease-in-out">
          {isHistoryLoading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="history-skeleton bg-white border border-gray-200 rounded-lg md:rounded-xl p-3 sm:p-4 animate-pulse"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1">
                      <div className="h-5 sm:h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-shimmer w-3/4"></div>
                      <div className="h-3 sm:h-4 bg-gray-200 rounded mt-2 w-1/2"></div>
                    </div>
                    <div className="flex gap-2 sm:gap-3">
                      <div className="w-8 sm:w-9 h-8 sm:h-9 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-shimmer"></div>
                      <div className="w-8 sm:w-9 h-8 sm:h-9 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-shimmer"></div>
                    </div>
                    <div className="w-16 sm:w-20 h-4 sm:h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-shimmer"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : history.length === 0 ? (
            <div className="history-empty text-center text-gray-500 text-sm sm:text-base md:text-sm">No conversations yet.</div>
          ) : (
            history.map((conversation) => (
              <div
                key={conversation.id}
                className="history-item bg-white p-2 sm:p-3 md:p-4 rounded-lg md:rounded-xl border border-gray-200 hover:border-black cursor-pointer flex justify-between items-center mb-2 sm:mb-3 transition-all duration-300 transform hover:scale-102 hover:shadow-md"
              >
                <div className="history-message flex-1 text-sm sm:text-base md:text-sm text-gray-800 truncate" onClick={() => loadConversation(conversation)}>
                  {conversation.messages[0]?.content || "Empty conversation"}
                </div>
                <div className="history-actions flex gap-2 sm:gap-3 md:gap-3">
                  <button
                    onClick={() => loadConversation(conversation)}
                    className="history-action-btn open-btn bg-white border border-gray-300 text-gray-700 px-1 sm:px-2 py-1 sm:py-1.5 rounded hover:bg-indigo-50 transition duration-300 transform hover:scale-105"
                  >
                    <i className="fas fa-folder-open text-base sm:text-lg md:text-sm"></i>
                  </button>
                  <button
                    onClick={() => deleteConversation(conversation.id)}
                    className="history-action-btn delete-btn bg-white border border-red-400 text-red-500 px-1 sm:px-2 py-1 sm:py-1.5 rounded hover:bg-red-50 transition duration-300 transform"
                  >
                    <i className="fas fa-trash text-base sm:text-lg md:text-sm"></i>
                  </button>
                </div>
                <div className="history-timestamp text-xs sm:text-sm md:text-sm text-gray-500 ml-1 sm:ml-2 md:ml-3">
                  {getTimeDifference(conversation.timestamp)}
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <>
          <div className="chat-body flex-1 p-2 sm:p-3 md:p-4 bg-gray-50 overflow-y-auto flex flex-col gap-1 sm:gap-2 transition-opacity duration-500 ease-in-out" ref={chatBodyRef}>
            {isInitialLoading ? (
              <div className="chat-message bot bg-white/90 border border-gray-200 p-2 sm:p-3 md:p-4 rounded-lg md:rounded-xl max-w-[90%] sm:max-w-[85%] self-start text-sm sm:text-base md:text-sm shadow-md animate-fadeInUp flex items-center justify-center">
                <div className="flex items-center gap-2 sm:gap-3">
                  <i className="fas fa-spinner fa-spin text-base sm:text-lg md:text-lg"></i>
                  <span>Loading Chat...</span>
                </div>
              </div>
            ) : messages.length === 0 ? (
              <div className="chat-message bot bg-white/90 border border-gray-200 p-2 sm:p-3 md:p-4 rounded-lg md:rounded-xl max-w-[90%] sm:max-w-[85%] self-start text-sm sm:text-base md:text-sm shadow-md animate-fadeInUp">
                <div>Welcome! I’m a personal AI agent for an experienced web developer. Ask me about their skills, projects, or how to get in touch!</div>
                <div className="timestamp text-xs sm:text-sm md:text-sm text-gray-500 mt-1 sm:mt-1.5 text-right">
                  {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            ) : null}
            {messages.map((msg, idx) => (
              <div key={idx} className="chat-message-wrapper cursor-pointer animate-slideIn" onClick={() => copyMessage(msg.content)}>
                <ChatMessage message={msg} />
              </div>
            ))}
            {loading && (
              <div className="chat-loading text-black text-sm sm:text-base md:text-sm italic flex items-center gap-1 sm:gap-2 self-start animate-pulse">
                <i className="fas fa-spinner fa-spin text-base sm:text-lg md:text-lg"></i> Processing...
              </div>
            )}
            <div ref={chatRef}></div>
          </div>
          <div className="w-full p-2 sm:p-3 md:p-4 bg-gray-50">
            <InputForm onSend={sendMessage} disabled={loading} />
          </div>
        </>
      )}
    </div>
  );
}

export default ChatBox;