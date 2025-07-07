export class CommandProcessor {
    private commands = {
      "show --projects": {
        message:
          "🚀 Initializing project visualization modules...\n\n📊 Loading neural network interfaces...\n⚡ Spinning up development environments...\n\n✅ Project modules ready for inspection.",
        action: "show_projects",
      },
      "show --project bargainradar": {
        message:
          "📊 Loading BargainRadar module...\n\n🤖 AI-powered price prediction agent\n📈 Uses OpenAI Frontier API & Chroma vector database\n🎯 94% accuracy in market trend analysis\n⚡ Real-time price optimization\n\n🔧 Module status: ACTIVE | Performance: Optimal",
        action: null,
      },
      "show --project campusgpt": {
        message:
          "🏫 Loading Campus GPT module...\n\n🧠 Multimodal RAG QA system for universities\n🔍 FireCrawler + LangChain + Gemini 2.5 Pro\n📚 Intelligent campus assistance platform\n🎓 Student query resolution: 96% success rate\n\n🔧 Module status: COMPLETED | Performance: Excellent",
        action: null,
      },
      "cat resume.pdf": {
        message:
          "📄 Accessing neural profile data...\n\n👨‍💻 AADITYA KHANAL\n🎓 Data Science Student @ Northern Kentucky University\n📊 GPA: 3.74/4.0 | Expected Graduation: May 2026\n\n💼 EXPERIENCE:\n• Consumer Insights Data Analyst @ Beats By Dre (Sept-Oct 2024)\n• Student Researcher @ NKU HCI Lab (Dec 2023-Jul 2024)\n• Vice President @ Data Science Club (May 2024-Present)\n\n🏆 CERTIFICATIONS:\n• NVIDIA Deep Learning Fundamentals (March 2025)\n• Oracle Cloud AI Professional (July 2024)\n• Microsoft Azure AI Fundamentals (June 2024)\n\n📧 Contact: khanal.aditya1122@gmail.com\n📱 Phone: 859-628-1641",
        action: "show_resume",
      },
      "analyze --skills": {
        message:
          "🧠 Initiating comprehensive skill diagnostics...\n\n🔍 Scanning neural pathways... ✅\n📊 Analyzing code repositories... ✅\n⚡ Evaluating project complexity... ✅\n🎮 Generating RPG-style power levels... ✅\n\n📈 Skill matrix compilation complete!\n🎯 Radar visualization activated.",
        action: "show_skills",
      },
      "whoami --contact": {
        message:
          "📧 CONTACT INFORMATION:\n\n✉️ Email: khanal.aditya1122@gmail.com\n📱 Phone: 859-628-1641\n🔗 LinkedIn: linkedin.com/in/-khanalaaditya/\n🐙 GitHub: github.com/ak-pydev\n🏆 Kaggle: kaggle.com/aadityaiscoding\n📍 Location: Northern Kentucky, USA\n\n🤝 Always open to collaboration and new opportunities!",
        action: null,
      },
      "unlock secret": {
        message:
          "🔓 ACCESSING CLASSIFIED DEVELOPER FILES...\n\n🎭 SECRET UNLOCKED!\n\n😅 Confession #1: I once spent 8 hours debugging a machine learning model, only to discover I was training it on the test set. The model was 'learning' the answers! 🤦‍♂️\n\n🚀 Confession #2: My first 'AI chatbot' was actually 200 if-else statements pretending to be intelligent. It fooled everyone for months! 😂\n\n☕ Confession #3: I've written more code after midnight than during normal hours. Coffee consumption: 4.7 cups/day average.\n\n🦆 Confession #4: I still explain my code to a rubber duck. Success rate: 73%",
        action: null,
      },
      chaos: {
        message:
          "⚠️ WARNING: Initiating chaos protocol...\n\n🌀 Reality matrix destabilizing...\n⚡ Glitch subroutines activated...\n🔥 Dimensional barriers weakening...\n\n💀 PREPARE FOR NEURAL STORM 💀",
        action: "chaos_mode",
      },
      help: {
        message:
          "🤖 AADINET COMMAND REFERENCE:\n\n📂 PROJECT COMMANDS:\n• show --projects - View all project modules\n• show --project [name] - Load specific project\n\n👤 PROFILE COMMANDS:\n• cat resume.pdf - Display resume data\n• analyze --skills - Run skill diagnostics\n• whoami --contact - Show contact info\n\n🎮 SPECIAL COMMANDS:\n• unlock secret - Access easter eggs\n• chaos - Activate glitch mode\n• help - Show this menu\n\n💡 TIP: I have memory! Ask follow-up questions.",
        action: null,
      },
    }
  
    async process(input: string, sessionMemory: string[]): Promise<{ message: string; action: string | null }> {
      const normalizedInput = input.toLowerCase().trim()
  
      // Simulate processing delay
      await new Promise((resolve) => setTimeout(resolve, 300))
  
      // Check for exact command matches
      const exactMatch = Object.entries(this.commands).find(([cmd]) => cmd.toLowerCase() === normalizedInput)
  
      if (exactMatch) {
        return exactMatch[1]
      }
  
      // Memory-based contextual responses
      if (sessionMemory.length > 0) {
        const recentQueries = sessionMemory.slice(-3).join(" ").toLowerCase()
  
        if (normalizedInput.includes("more") && recentQueries.includes("project")) {
          return {
            message:
              "🤔 Based on your interest in projects, you might also like:\n\n🏥 Colorectal Cancer Prediction - MLOps pipeline with Docker & PyTorch\n💰 Khutruke AI - Financial planning chatbot (Hackathon Winner)\n🎬 Tube2Text Agent - YouTube to blog conversion\n\nTry: 'show --project [name]' for details!",
            action: null,
          }
        }
  
        if (normalizedInput.includes("tell me more") || normalizedInput.includes("details")) {
          return {
            message: `🧠 I remember you asked about: ${sessionMemory.slice(-2).join(", ")}\n\nWhat specific aspect would you like to explore further? I can provide:\n• Technical implementation details\n• Project challenges and solutions\n• Technology stack deep-dives\n• Performance metrics and results`,
            action: null,
          }
        }
      }
  
      // Fuzzy matching for common queries
      if (
        normalizedInput.includes("project") ||
        normalizedInput.includes("work") ||
        normalizedInput.includes("portfolio")
      ) {
        return this.commands["show --projects"]
      }
  
      if (
        normalizedInput.includes("skill") ||
        normalizedInput.includes("diagnostic") ||
        normalizedInput.includes("abilities")
      ) {
        return this.commands["analyze --skills"]
      }
  
      if (
        normalizedInput.includes("resume") ||
        normalizedInput.includes("cv") ||
        normalizedInput.includes("experience")
      ) {
        return this.commands["cat resume.pdf"]
      }
  
      if (normalizedInput.includes("contact") || normalizedInput.includes("email") || normalizedInput.includes("reach")) {
        return this.commands["whoami --contact"]
      }
  
      if (
        normalizedInput.includes("secret") ||
        normalizedInput.includes("easter") ||
        normalizedInput.includes("hidden")
      ) {
        return this.commands["unlock secret"]
      }
  
      // AI-style conversational responses
      const greetings = ["hello", "hi", "hey", "greetings"]
      if (greetings.some((greeting) => normalizedInput.includes(greeting))) {
        return {
          message:
            "👋 Hello! I'm Aaditya's AI assistant. I'm here to help you explore his capabilities and projects.\n\n🚀 Try asking me about:\n• His projects and technical work\n• Skills and expertise\n• Professional experience\n• Contact information\n\nWhat would you like to know?",
          action: null,
        }
      }
  
      // Default response with memory context
      const memoryContext =
        sessionMemory.length > 0 ? `\n\n🧠 I remember our conversation about: ${sessionMemory.slice(-3).join(", ")}` : ""
  
      return {
        message: `🤖 Command not recognized: "${input}"\n\n💡 Try these commands:\n• show --projects\n• analyze --skills\n• cat resume.pdf\n• whoami --contact\n• unlock secret\n• help\n\n🗣️ Or just ask me naturally! I understand conversational queries too.${memoryContext}`,
        action: null,
      }
    }
  }
  