# Whois API Full-Stack Application

A professional domain lookup service built with **Next.js** frontend and **NestJS** backend that provides comprehensive domain information and contact details using the WhoisXML API.

![Whois App Demo](https://img.shields.io/badge/Status-Production%20Ready-brightgreen) ![Next.js](https://img.shields.io/badge/Next.js-14.0-black) ![NestJS](https://img.shields.io/badge/NestJS-10.0-red) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

## 🚀 Features

### Domain Information Lookup
- **Domain Name**: Complete domain details
- **Registrar**: Domain registrar information
- **Registration Date**: When the domain was first registered
- **Expiration Date**: Domain expiration date
- **Estimated Domain Age**: Calculated domain age in years
- **Hostnames**: Associated nameservers (truncated if > 25 chars)

### Contact Information Lookup
- **Registrant Name**: Domain owner information
- **Technical Contact**: Technical contact person
- **Administrative Contact**: Administrative contact details
- **Contact Email**: Primary contact email address

### Technical Features
- ✅ Real-time domain validation
- ✅ Responsive design with Tailwind CSS
- ✅ Error handling with user-friendly messages
- ✅ Loading states and UX feedback
- ✅ CORS enabled for cross-origin requests
- ✅ Input sanitization and security
- ✅ Professional UI/UX design

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **pnpm**, **npm** or **yarn** package manager
- **Whois API Key** from [WhoisXML API](https://whois.whoisxmlapi.com/) (free tier available)

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/whois-fullstack-app.git
cd whois-fullstack-app
```

### 2. Environment Configuration

Create a `.env` file in the **root directory**:

```bash
# Whois API Configuration
WHOIS_API_KEY=your_whois_api_key_here
WHOIS_API_URL=https://www.whoisxmlapi.com/whoisserver/WhoisService

# Optional: Custom ports
BACKEND_PORT=5000
FRONTEND_PORT=3000
```

> **Important**: Get your free API key by signing up at [WhoisXML API](https://whois.whoisxmlapi.com/). Replace `your_whois_api_key_here` with your actual API key.

### 3. Backend Setup (NestJS)

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start development server
npm run start:dev
```

The backend will be available at: **http://localhost:5000**

### 4. Frontend Setup (Next.js)

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at: **http://localhost:3000**

## 🏗️ Project Structure

```
whois-app/
├── backend/                         # NestJS Backend
│   ├── src/
│   │   ├── description/             # Typescript type descriptions     
│   │   │   ├── whois.interface.ts
│   │   ├── whois/                   # Whois module
│   │   │   ├── whois.controller.ts
│   │   │   ├── whois.service.ts
│   │   │   └── whois.module.ts
│   │   ├── app.controller.ts
│   │   ├── app.module.ts
│   │   ├── app.service.ts
│   │   └── main.ts
│   ├── test/
│   ├── env.example
│   ├── package.json
│   ├── tsconfig.json
│   └── nest-cli.json
├── frontend/                   # Next.js Frontend (App Router)
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── app/               # App Router directory
│   │   │   ├── globals.css    # Global styles with Tailwind
│   │   │   ├── layout.tsx     # Root layout component
│   │   │   └── page.tsx       # Home page component
│   │   ├── components/        # Reusable components
│   │   │   ├── icons/         # SVG icon components
│   │   │   │   ├── ContactIcon.tsx
│   │   │   │   ├── DomainIcon.tsx
│   │   │   │   └── ErrorIcon.tsx
│   │   │   ├── ContactTable.tsx    # Contact info display
│   │   │   ├── DomainTable.tsx     # Domain info display
│   │   │   ├── ErrorHandler.tsx    # Error handling component
│   │   │   ├── SearchForm.tsx      # Search input form
│   │   │   ├── Tips.tsx            # Usage tips component
│   │   │   └── WhoisLookup.tsx     # Main lookup component
│   │   └── definitions/       # TypeScript type definitions
│   │       └── lookup.ts      # Lookup-related types
│   ├── package.json
│   ├── next-env.d.ts         # Next.js type declarations
│   ├── eslint.config.mjs     # ESLint configuration
│   ├── pnpm-lock.yaml        # PNPM lock file
│   ├── postcss.config.mjs    # PostCSS configuration
│   ├── tsconfig.json         # TypeScript configuration
│   └── README.md             # Frontend documentation
└── README.md
```

## 🔗 API Endpoints

### Backend API Routes

#### Health Check
```http
GET /health
```
Returns server status and health information.

#### Domain Information
```http
GET /whois/:domain?type=domain
```
**Example:**
```http
GET /whois/amazon.com?type=domain
```

**Response:**
```json
{
  "domainName": "amazon.com",
  "registrar": "MarkMonitor, Inc.",
  "registrationDate": "11/01/1994",
  "expirationDate": "10/31/2024",
  "estimatedDomainAge": "29 years",
  "hostnames": "ns1.p31.dynect.net, ns2..."
}
```

#### Contact Information
```http
GET /whois/:domain?type=contact
```
**Example:**
```http
GET /whois/amazon.com?type=contact
```

**Response:**
```json
{
  "registrantName": "Amazon Technologies, Inc.",
  "technicalContactName": "Amazon Technologies, Inc.",
  "administrativeContactName": "Amazon Technologies, Inc.",
  "contactEmail": "hostmaster@amazon.com"
}
```

## 🧪 Testing

### Test the Application

1. **Start both servers** (backend on :5000, frontend on :3000)
2. **Open your browser** to http://localhost:3000
3. **Test with sample domain**: `amazon.com`
4. **Try both lookup types**:
   - Domain Information
   - Contact Information

### Manual API Testing

Using curl or Postman:

```bash
# Test domain information
curl "http://localhost:5000/whois/amazon.com?type=domain"

# Test contact information
curl "http://localhost:5000/whois/amazon.com?type=contact"

# Test health endpoint
curl "http://localhost:5000/health"
```

## 🚀 Production Deployment

### Backend Deployment

1. **Build the application:**
```bash
cd backend
pnpm build
```

2. **Start production server:**
```bash
pnpm start:prod
```

### Frontend Deployment

1. **Build the application:**
```bash
cd frontend
pnpm build
```

2. **Start production server:**
```bash
pnpm start
```

### Environment Variables for Production

Update your `.env` file for production:

```bash
# Production Environment
NODE_ENV=production
WHOIS_API_KEY=your_production_api_key
WHOIS_API_URL=https://www.whoisxmlapi.com/whoisserver/WhoisService

# Production URLs
BACKEND_URL=https://your-backend-domain.com
FRONTEND_URL=https://your-frontend-domain.com
```

## 🔒 Security Considerations

- **API Key Security**: Never commit API keys to version control
- **Environment Variables**: Use `.env` files for sensitive configuration
- **Input Validation**: Domain names are validated with regex patterns
- **CORS Configuration**: Properly configured for production domains
- **Error Handling**: Secure error messages without exposing internal details

## 🐛 Troubleshooting

### Common Issues

#### Backend won't start
- ✅ Check if port 5000 is available
- ✅ Verify Node.js version (v16+)
- ✅ Ensure all dependencies are installed
- ✅ Check API key configuration

#### Frontend won't connect to backend
- ✅ Verify backend is running on port 5000
- ✅ Check CORS configuration
- ✅ Ensure both servers are running

#### API Key Issues
- ✅ Verify API key is correct
- ✅ Check API key permissions
- ✅ Ensure API key is not expired
- ✅ Test API key directly with WhoisXML API

#### Domain lookup fails
- ✅ Test with known working domain (amazon.com)
- ✅ Check domain name format
- ✅ Verify API response structure
- ✅ Check network connectivity

### Debug Mode

Enable debug logging:

```bash
# Backend debug mode
cd backend
pnpm start:debug

# Check backend logs
curl http://localhost:5000/health
```

## 📚 Technology Stack

### Backend (NestJS)
- **Framework**: NestJS 10.0
- **Language**: TypeScript 5.0
- **HTTP Client**: Native Fetch API
- **Validation**: Built-in NestJS validators
- **Architecture**: Modular structure with controllers and services

### Frontend (Next.js)
- **Framework**: Next.js 14.0
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS 3.3
- **State Management**: React Hooks (useState)
- **HTTP Client**: Native Fetch API

### External APIs
- **Whois Data**: WhoisXML API
- **Documentation**: https://whois.whoisxmlapi.com/documentation

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

## 🙋‍♂️ Support

If you encounter any issues or have questions:

1. **Check the troubleshooting section** above
2. **Review the API documentation** at [WhoisXML API Docs](https://whois.whoisxmlapi.com/documentation)
3. **Open an issue** on GitHub
4. **Contact the maintainer**

## 🌟 Acknowledgments

- [WhoisXML API](https://whoisxmlapi.com/) for providing the domain lookup service
- [NestJS](https://nestjs.com/) for the robust backend framework
- [Next.js](https://nextjs.org/) for the powerful React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

---

**Built with ❤️ using Next.js and NestJS**