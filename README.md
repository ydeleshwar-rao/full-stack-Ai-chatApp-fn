# 🤖 AI-Powered Real-Time Chat Application

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![LangChain](https://img.shields.io/badge/LangChain-1C3C3C?style=for-the-badge&logo=chainlink&logoColor=white)
![WebSocket](https://img.shields.io/badge/WebSocket-010101?style=for-the-badge&logo=socket.io&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![GitHub Stars](https://img.shields.io/github/stars/your-username/your-repo-name.svg)](https://github.com/your-username/your-repo-name/stargazers)

An **AI-driven real-time chat app** with **LangChain integration**, where users can provide **custom prompts** and receive **context-aware intelligent replies**.  
Built using **React (frontend)** and **Express (backend)** with **WebSocket** for real-time communication, plus **authentication** for secure access.

## 🌟 Live Demo
🔗 **[View Live Demo](https://your-app-url.vercel.app)** | 📱 **[Mobile Preview](https://your-app-url.vercel.app)**

---

## 🚀 Features

- 🤖 **AI Assistant (LangChain)** – Contextual replies based on user prompts
- ⚡ **Real-Time Chat** – WebSocket-powered instant messaging  
- 🔐 **Authentication** – Secure user login & signup system
- 🎯 **Custom Prompts** – Users can guide AI with their own instructions
- 🖥️ **Modern UI** – Responsive React-based chat interface
- 📱 **Mobile Responsive** – Works seamlessly on all devices
- 🌙 **Dark/Light Mode** – Toggle between themes
- 💬 **Message History** – Persistent chat conversations
- 🔄 **Real-time Typing Indicators** – See when AI is responding
- 📊 **Analytics Dashboard** – Track usage and conversations

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **TailwindCSS** - Utility-first CSS framework
- **Socket.io Client** - Real-time communication
- **React Router** - Navigation
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Socket.io** - WebSocket library
- **LangChain** - AI framework
- **OpenAI API** - AI language model
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

### Database & Storage
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Redis** - Session storage (optional)

---

## 📂 Project Structure

```
root/
├── backend/                 # Express backend
│   ├── controllers/         # Route controllers
│   ├── middleware/          # Authentication & validation
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── services/           # LangChain & AI services
│   ├── socket/             # WebSocket handlers
│   └── server.js           # Entry point
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── context/        # React context
│   │   ├── services/       # API services
│   │   └── App.js          # Main App component
│   └── public/
├── docs/                   # Documentation
├── .env.example           # Environment variables template
└── README.md              # Project documentation
```

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- OpenAI API Key

### 1. Clone the repository
```bash
git clone https://github.com/your-username/ai-chat-app.git
cd ai-chat-app
```

### 2. Install dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Environment Setup
Create `.env` file in the `backend/` directory:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/ai-chat-db
# Or MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/ai-chat-db

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=30d

# AI Configuration
OPENAI_API_KEY=sk-your-openai-api-key-here
LANGCHAIN_TRACING_V2=true
LANGCHAIN_API_KEY=your_langchain_api_key

# Optional: Redis for session storage
REDIS_URL=redis://localhost:6379
```

### 4. Run the application
```bash
# Start backend server
cd backend
npm run dev

# In another terminal, start frontend
cd frontend
npm start
```

### 5. Access the application
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **API Documentation:** http://localhost:5000/api-docs

---

## 🎯 Usage

1. **Sign Up/Login** - Create account or login with existing credentials
2. **Start Chatting** - Begin conversation with AI assistant
3. **Custom Prompts** - Set custom instructions for AI behavior
4. **Real-time Responses** - Get instant AI-powered replies
5. **Message History** - Access previous conversations

### Example AI Prompts:
```
"Act as a helpful coding assistant"
"Respond like a friendly customer support agent"
"Be a creative writing mentor"
"Help me with technical problem-solving"
```

---

## 📸 Screenshots

### Chat Interface
![Chat Interface](./docs/screenshots/chat-interface.png)

### AI Response
![AI Response](./docs/screenshots/ai-response.png)

### Mobile View
![Mobile View](./docs/screenshots/mobile-view.png)

### Settings Panel
![Settings](./docs/screenshots/settings-panel.png)

---

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Chat
- `GET /api/chat/conversations` - Get user conversations
- `POST /api/chat/message` - Send message
- `PUT /api/chat/prompt` - Update custom prompt

### WebSocket Events
- `message` - Send/receive messages
- `typing` - Typing indicators
- `user-connected` - User connection status

---

## 🧪 Testing

```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
cd frontend
npm test

# Run e2e tests
npm run test:e2e
```

---

## 📈 Performance Optimization

- **Message Caching** - Redis for frequently accessed data
- **Connection Pooling** - Optimized database connections
- **Code Splitting** - Lazy loading for frontend components
- **CDN Integration** - Static asset optimization
- **Rate Limiting** - API protection against abuse

---

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
vercel deploy
```

### Backend (Heroku)
```bash
cd backend
heroku create your-app-name
git push heroku main
```

### Environment Variables for Production
Make sure to set all environment variables in your hosting platform.

---

## 📌 Future Enhancements

- [ ] 🎙️ Voice-based AI interaction
- [ ] 👥 Group chat support  
- [ ] 📎 File & media sharing
- [ ] 🌍 Multi-language support
- [ ] 📊 Advanced analytics dashboard
- [ ] 🤝 AI model fine-tuning
- [ ] 📱 Mobile app (React Native)
- [ ] 🔗 Third-party integrations (Slack, Discord)
- [ ] 🎨 Custom themes and UI customization
- [ ] 📋 Export chat conversations

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow ESLint configuration
- Write tests for new features
- Update documentation
- Use conventional commit messages

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**
- 🔗 [LinkedIn](https://linkedin.com/in/your-profile)
- 🌐 [Portfolio](https://your-portfolio.com)
- 🐱 [GitHub](https://github.com/your-username)
- 📧 [Email](mailto:your.email@example.com)

---

## 🙏 Acknowledgments

- [OpenAI](https://openai.com) for providing the AI API
- [LangChain](https://langchain.com) for the AI framework
- [React](https://reactjs.org) for the frontend framework
- [Express](https://expressjs.com) for the backend framework

---

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=your-username/ai-chat-app&type=Date)](https://star-history.com/#your-username/ai-chat-app&Date)

---

<div align="center">
  <strong>Made with ❤️ by Your Name</strong><br>
  <em>If you found this project helpful, please give it a ⭐!</em>
</div>
