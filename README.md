# 🚀 Full-Stack Portfolio

<div align="center">

![GitHub last commit](https://img.shields.io/github/last-commit/Fransuelton/meu-portfolio?color=blue)
![GitHub repo size](https://img.shields.io/github/repo-size/Fransuelton/meu-portfolio)
![GitHub issues](https://img.shields.io/github/issues/Fransuelton/meu-portfolio)
![GitHub pull requests](https://img.shields.io/github/issues-pr/Fransuelton/meu-portfolio)
![GitHub License](https://img.shields.io/github/license/Fransuelton/meu-portfolio)
![GitHub stars](https://img.shields.io/github/stars/Fransuelton/meu-portfolio?style=social)

![Project Status](https://img.shields.io/badge/status-production-brightgreen)
![Project Type](https://img.shields.io/badge/type-full--stack%20application-blue)
![Backend Status](https://img.shields.io/badge/backend-node.js%20api-green)
![Frontend Status](https://img.shields.io/badge/frontend-react-61DAFB)

</div>

📌 A modern, responsive full-stack portfolio website showcasing my skills as a Full Stack Developer. Built with React, Node.js, and Express, featuring a complete email system, smooth animations, responsive design, and a professional presentation of my projects and services.

**🌐 Live Demo:** [fransuelton.dev](https://fransuelton.dev/)  
**🔧 Backend API:** Production-ready Node.js/Express server with email functionality

---

## 📚 Table of Contents

- [🚀 Full-Stack Portfolio](#-full-stack-portfolio)
  - [📚 Table of Contents](#-table-of-contents)
  - [📝 About](#-about)
  - [✨ Features](#-features)
  - [🏗️ Architecture (REVISAR)](#️-architecture-revisar)
  - [🧰 Tech Stack](#-tech-stack)
    - [📦 Core Technologies](#-core-technologies)
    - [Frontend](#frontend)
    - [Backend](#backend)
    - [Email System](#email-system)
    - [Security \& Validation](#security--validation)
    - [UI \& Icons](#ui--icons)
    - [Animation \& Effects](#animation--effects)
    - [Development Tools](#development-tools)
  - [🖼️ Screenshots](#️-screenshots)
  - [🚀 Getting Started](#-getting-started)
    - [📋 Prerequisites](#-prerequisites)
    - [🔧 Installation](#-installation)
    - [⚙️ Environment Configuration](#️-environment-configuration)
    - [🏃‍♂️ Running the Application](#️-running-the-application)
  - [📡 API Endpoints](#-api-endpoints)
    - [Contact Email API](#contact-email-api)
    - [Email Test API](#email-test-api)
  - [📑 Sections](#-sections)
    - [🎯 Hero Section](#-hero-section)
    - [👨‍💻 About Section](#-about-section)
    - [🛠️ Services Section](#️-services-section)
    - [💼 Projects Section](#-projects-section)
      - [Featured Projects:](#featured-projects)
    - [📞 Contact Section](#-contact-section)
    - [🔗 Footer](#-footer)
  - [📁 Project Structure](#-project-structure)
  - [🔒 Security Features](#-security-features)
    - [Backend Security](#backend-security)
    - [Email Security](#email-security)
    - [Frontend Security](#frontend-security)
  - [🧪 Testing](#-testing)
    - [Email System Testing](#email-system-testing)
    - [Frontend Testing](#frontend-testing)
    - [Rate Limiting Testing](#rate-limiting-testing)
  - [🤝 Contributing](#-contributing)
    - [How to Contribute](#how-to-contribute)
    - [Development Guidelines](#development-guidelines)
  - [📄 License](#-license)
  - [📬 Contact](#-contact)

---

## 📝 About

This is my comprehensive full-stack portfolio developed with React and Node.js, showcasing my expertise in Frontend, Backend, and Full-Stack development. The project features a complete email system with a custom-built API, demonstrating real-world application development skills.

The goal of this portfolio is to demonstrate my technical skills as a full-stack web developer, focusing on:
- **Best Practices** - Clean code, proper architecture, and industry standards
- **Component Architecture** - Modular, reusable, and maintainable code structure
- **API Development** - RESTful services with proper validation and security
- **Email Integration** - Production-ready email system with confirmation emails
- **Security** - Input validation, rate limiting, and data sanitization
- **Performance** - Optimized for speed and user experience

**Live Demo:** [View Portfolio](https://fransuelton.dev/)

---

## ✨ Features

- 📱 **Responsive Design** - Optimized for all devices and screen sizes
- ✨ **Smooth Animations** - AOS (Animate On Scroll) and custom CSS animations
- 🎨 **Modern UI/UX** - Clean design with intuitive navigation
- ⚡ **Fast Performance** - Built with Vite for optimal loading speeds
- 🧩 **Component Architecture** - Modular and reusable React components
- 📧 **Full Email System** - Complete backend with email sending and validation
- 🔒 **Security Features** - Rate limiting, input validation, and CORS protection
- 📬 **Email Confirmation** - Automatic confirmation emails for users
- 📊 **Form Validation** - Client and server-side validation
- 🌐 **Social Integration** - Links to professional profiles and repositories
- 🛠️ **Project Showcase** - Interactive project cards with technology stacks
- 📄 **CV Download** - Easy access to downloadable resume
- 🚀 **Production Ready** - Deployed with proper CI/CD pipeline

---

## 🏗️ Architecture (REVISAR)

This portfolio follows a modern full-stack architecture pattern:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │───▶│   Backend API   │───▶│  Email Service  │
│   (React/Vite)  │    │  (Node.js/      │    │  (Nodemailer)   │
│                 │    │   Express)      │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Static Hosting │    │  Server Hosting │    │  SMTP Provider  │
│   (Vercel)      │    │   (Railway/     │    │ (Gmail/Custom)  │
│                 │    │    Heroku)      │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

**Key Components:**
- **Frontend**: React SPA with responsive design and animations
- **Backend API**: Express server with RESTful endpoints
- **Email System**: Nodemailer integration with HTML templates
- **Validation Layer**: Client and server-side data validation
- **Security Layer**: Rate limiting, CORS, and input sanitization

---

## 🧰 Tech Stack

### 📦 Core Technologies

[![Tech Stack](https://skillicons.dev/icons?i=react,nodejs,express,vite,js,styledcomponents)](https://skillicons.dev)

### Frontend

- **React 18.2.0** - Modern React with hooks and functional components
- **Vite 7.0.3** - Fast build tool and development server  
- **Styled Components 6.0.7** - CSS-in-JS styling solution

### Backend

- **Node.js 18+** - JavaScript runtime for server-side development
- **Express 5.1.0** - Fast, unopinionated web framework
- **CORS 2.8.5** - Cross-Origin Resource Sharing middleware
- **Helmet 8.1.0** - Security middleware for Express apps

### Email System

- **Nodemailer 7.0.5** - Email sending library with SMTP support
- **HTML Email Templates** - Professional email design with inline CSS
- **SMTP Integration** - Support for Gmail, Hostinger, and custom providers
- **Email Confirmation** - Automatic confirmation emails for users

### Security & Validation

- **Express Rate Limit 7.5.1** - Rate limiting middleware
- **Express Validator 7.2.1** - Server-side validation and sanitization
- **Helmet** - Security headers and protection
- **Input Sanitization** - XSS and injection protection

### UI & Icons

- **FontAwesome** - Professional icons for branding and navigation
- **React Icons** - Technology stack icons and social media icons
- **Lucide React** - Modern service icons

### Animation & Effects

- **AOS (Animate On Scroll) 3.0.0** - Scroll-triggered animations
- **Custom CSS Animations** - Typewriter effect and smooth transitions

### Development Tools

- **ESLint** - Code linting and formatting
- **Concurrently** - Run multiple commands simultaneously
- **dotenv** - Environment variable management
- **TypeScript Types** - Type definitions for better development experience

---

## 🖼️ Screenshots

| Main Section (Mobile)                                                    | Projects Section (Desktop)                                                                     |
| ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| ![Main Section (Mobile)](./src/assets/images/readme/iphone-13-main.webp) | ![Projects Section (Desktop) Screenshot](./src/assets/images/readme/macbook-air-projects.webp) |

---

## 🚀 Getting Started

### 📋 Prerequisites

- **Node.js** >= 18.x
- **npm** or **yarn**
- **Git**
- **Email Provider** (Gmail, Hostinger, or custom SMTP)

### 🔧 Installation

```bash
# Clone the repository
git clone https://github.com/Fransuelton/meu-portfolio.git

# Navigate to the project folder
cd meu-portfolio

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### ⚙️ Environment Configuration

Create a `.env` file in the `backend` directory with the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=http://localhost:5173

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com
EMAIL_TO=your-email@gmail.com

# For Gmail: Use App Password instead of regular password
# For Hostinger: Use your hosting email credentials
# EMAIL_HOST=smtp.hostinger.com
# EMAIL_PORT=465
```

**Email Setup Instructions:**

**For Gmail:**
1. Enable 2-Factor Authentication
2. Generate an App Password: [Google App Passwords](https://support.google.com/accounts/answer/185833)
3. Use the App Password in `EMAIL_PASS`

**For Hostinger or Custom SMTP:**
1. Use your hosting provider's SMTP settings
2. Update `EMAIL_HOST` and `EMAIL_PORT` accordingly

### 🏃‍♂️ Running the Application

```bash
# Run both frontend and backend simultaneously
npm run dev:full

# Or run them separately:

# Terminal 1 - Frontend (http://localhost:5173)
npm run dev

# Terminal 2 - Backend (http://localhost:3000)
npm run dev:backend

# Test email configuration
npm run test:email
```

**Available Scripts:**
- `npm run dev` - Start frontend development server
- `npm run dev:backend` - Start backend API server
- `npm run dev:full` - Start both frontend and backend
- `npm run build` - Build frontend for production
- `npm run preview` - Preview production build
- `npm run test:email` - Test email configuration

---

## 📡 API Endpoints

The backend provides the following RESTful API endpoints:

### Contact Email API

**POST** `/api/contact`

Send a contact form email with automatic confirmation.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com", 
  "message": "Hello, I would like to discuss a project..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email sent successfully! I'll get back to you soon.",
  "data": {
    "messageId": "<message-id@smtp.server>"
  }
}
```

**Features:**
- ✅ Input validation and sanitization
- ✅ Rate limiting (5 requests per 15 minutes)
- ✅ Automatic confirmation email to sender
- ✅ HTML email templates
- ✅ XSS protection

### Email Test API

**GET** `/api/email/test`

Test email configuration and connectivity.

**Response:**
```json
{
  "success": true,
  "message": "Email configuration is working correctly!"
}
```

**Error Handling:**
All endpoints return consistent error responses:
```json
{
  "success": false,
  "message": "Error description",
  "errors": [/* validation errors if applicable */]
}
```

---

## 📑 Sections

### 🎯 Hero Section

- **Dynamic Introduction** - Animated name and role with typewriter effect
- **Professional Branding** - Clean, centered layout with smooth animations

### 👨‍💻 About Section

- **Professional Summary** - Comprehensive overview of skills and experience
- **CV Download** - Direct access to downloadable resume
- **Profile Image** - Professional photo with hover effects

### 🛠️ Services Section

- **Web Development** - Frontend and responsive design services
- **API Development** - Backend and RESTful API creation
- **Maintenance & Optimization** - Code refactoring and performance improvements

### 💼 Projects Section

- **Featured Projects** - Showcase of top development projects
- **Technology Stack** - Visual representation of technologies used
- **Live Demos** - Direct links to project deployments and repositories
- **Project Cards** - Interactive cards with hover effects

#### Featured Projects:

1. **DevLinks** - Customizable link tree built with Vue.js + TypeScript
2. **AuthJS** - Complete authentication system with Node.js and JWT
3. **User Profile System** - Full-stack application with Laravel and Vue.js

### 📞 Contact Section

- **Contact Form** - Professional inquiry form with backend integration
- **Real-time Validation** - Client and server-side form validation
- **Email Confirmation** - Automatic confirmation emails for users
- **Rate Limiting** - Protection against spam and abuse
- **Social Links** - Direct access to professional profiles
- **Email Integration** - One-click email copying functionality
- **Multi-channel Communication** - LinkedIn, GitHub, and WhatsApp integration

### 🔗 Footer

- **Copyright Information** - Professional copyright notice
- **Back to Top** - Quick navigation to page top

---

## 📁 Project Structure

```
meu-portfolio/
├── frontend/
│   ├── public/
│   │   ├── favicon.ico
│   │   └── logo.svg
│   ├── src/
│   │   ├── assets/
│   │   │   └── images/
│   │   │       └── cover-authjs.webp
│   │   ├── components/
│   │   │   ├── index.jsx               # Component exports
│   │   │   └── layout/
│   │   │       ├── about/
│   │   │       │   └── index.jsx       # About section
│   │   │       ├── contact/
│   │   │       │   ├── index.jsx       # Contact section
│   │   │       │   └── ContactForm/
│   │   │       │       └── index.jsx   # Contact form component
│   │   │       ├── footer/
│   │   │       │   └── index.jsx       # Footer component
│   │   │       ├── header/
│   │   │       │   └── index.jsx       # Navigation header
│   │   │       ├── main/
│   │   │       │   └── index.jsx       # Hero section
│   │   │       ├── projects/
│   │   │       │   ├── index.jsx       # Projects showcase
│   │   │       │   └── projectCard.jsx # Project card component
│   │   │       └── services/
│   │   │           └── index.jsx       # Services section
│   │   ├── App.jsx                     # Main app component
│   │   └── main.jsx                    # React entry point
│   ├── index.html                      # HTML template
│   ├── package.json                    # Frontend dependencies
│   └── vite.config.js                  # Vite configuration
├── backend/
│   ├── middleware/
│   │   └── validation.js               # Input validation & sanitization
│   ├── services/
│   │   └── emailService.js             # Email sending service
│   ├── index.js                        # Express server entry point
│   ├── package.json                    # Backend dependencies
│   └── .env                           # Environment variables
├── package.json                        # Root package.json with scripts
├── .eslintrc.cjs                      # ESLint configuration
├── LICENSE                            # MIT License
└── README.md                          # Project documentation
```

**Architecture Highlights:**
- **Separation of Concerns** - Clear separation between frontend and backend
- **Modular Components** - Reusable React components with single responsibilities
- **Service Layer** - Dedicated services for email functionality
- **Middleware** - Validation, security, and error handling layers
- **Environment Configuration** - Secure environment variable management

---

## 🔒 Security Features

This portfolio implements comprehensive security measures:

### Backend Security
- **Helmet** - Sets various HTTP headers to secure the app
- **CORS** - Configurable Cross-Origin Resource Sharing
- **Rate Limiting** - Prevents abuse and spam (5 requests per 15 minutes)
- **Input Validation** - Server-side validation using express-validator
- **Data Sanitization** - XSS protection and input cleaning
- **Environment Variables** - Sensitive data protection

### Email Security
- **SMTP Authentication** - Secure email provider authentication
- **TLS/SSL Encryption** - Encrypted email transmission
- **Input Sanitization** - Email content XSS protection
- **Rate Limiting** - Email sending rate limits

### Frontend Security
- **Content Security Policy** - Protection against XSS attacks
- **Form Validation** - Client-side input validation
- **Secure Headers** - Security headers set by Helmet middleware

---

## 🧪 Testing

### Email System Testing

Test the email functionality:

```bash
# Test email configuration
npm run test:email

# Manual API testing with curl
curl -X GET http://localhost:3000/api/email/test

# Test contact form endpoint
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message from the API"
  }'
```

### Frontend Testing

```bash
# Lint frontend code
npm run lint

# Build and test production version
npm run build
npm run preview
```

### Rate Limiting Testing

```bash
# Test rate limiting (should block after 5 requests)
for i in {1..6}; do
  curl -X POST http://localhost:3000/api/contact \
    -H "Content-Type: application/json" \
    -d '{"name":"Test","email":"test@example.com","message":"Test message"}'
  echo "Request $i completed"
done
```

---

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements or find any issues, feel free to contribute.

### How to Contribute

```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/your-username/meu-portfolio.git

# Create a new branch for your feature
git checkout -b feature/amazing-feature

# Make your changes and commit them
git commit -m "feat: add amazing feature"

# Push to your fork
git push origin feature/amazing-feature

# Open a Pull Request on GitHub
```

### Development Guidelines

- **Code Style** - Follow the existing code style and conventions
- **Commit Messages** - Use conventional commits (feat:, fix:, docs:, etc.)
- **Testing** - Test your changes thoroughly before submitting
- **Documentation** - Update documentation when necessary
- **Security** - Follow security best practices
- **Environment** - Test in both development and production environments
- **Email Testing** - Test email functionality with real SMTP providers
- **API Testing** - Verify API endpoints with proper error handling
- **Responsive Design** - Ensure changes work across all device sizes
- **Performance** - Consider performance impact of changes
- **Accessibility** - Maintain accessibility standards

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

## 📬 Contact

**Fransuelton Francisco**  
Full Stack Developer

� **Email:** contato@fransuelton.dev  
🌐 **Portfolio:** [fransuelton.dev](https://fransuelton.dev)  
🐙 **GitHub:** [github.com/Fransuelton](https://github.com/Fransuelton)  
💼 **LinkedIn:** [linkedin.com/in/fransuelton](https://www.linkedin.com/in/fransuelton)  

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

---

**Built with ❤️ and ☕ by [Fransuelton Francisco](https://github.com/Fransuelton)**

*This portfolio demonstrates real-world full-stack development skills including React frontend, Node.js backend, email integration, security implementation, and production deployment.*

</div>
