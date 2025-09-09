# Bio Web

A modern, customizable bio link application that allows users to create beautiful landing pages to showcase their social media links, projects, and content - similar to Linktree but with enhanced features and full customization.

## ✨ Features

### Core Features
- **🔗 Link Management**: Create, edit, and organize your important links
- **📚 Collections**: Group related links into organized collections
- **👤 Profile Customization**: Upload avatars, set bio descriptions, and customize your page
- **🎨 Theming**: Dark/light mode support with custom gradient backgrounds
- **📱 Responsive Design**: Optimized for mobile and desktop viewing
- **🔍 Search Functionality**: Visitors can search through your links
- **📊 Analytics**: Track link clicks and page visits
- **🌐 Internationalization**: Multi-language support (English, Portuguese)

### Advanced Features
- **🎯 Drag & Drop**: Reorder links and collections with intuitive drag-and-drop
- **🔐 Authentication**: Secure user registration and login system
- **📤 Sharing**: Easy sharing options for your bio page
- **🎮 Interactive Mode**: Enhanced user interaction features
- **📱 PWA Ready**: Progressive Web App capabilities
- **🐳 Docker Support**: Containerized deployment options

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible UI primitives

### Key Libraries
- **React Router DOM** - Client-side routing
- **React Hook Form + Zod** - Form management and validation
- **Zustand** - State management
- **Axios** - HTTP client
- **i18next** - Internationalization
- **Lucide React** - Icon library
- **FontAwesome** - Additional icons
- **Hello Pangea DND** - Drag and drop functionality
- **Recharts** - Data visualization

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 🚀 Getting Started

### Prerequisites
- **Node.js** (version 18 or higher)
- **pnpm** (recommended) or npm
- **bio-api** - The backend API must be running before starting this frontend application

### Backend Setup
This project requires the **bio-api** backend to be running. <br>
Follow the instructions in https://github.com/wellsm/bio-api

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/wellsm/bio-web.git
   cd bio-web
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

### Available Scripts

```bash
# Development
pnpm dev          # Start development server with hot reload

# Building
pnpm build        # Build for production
pnpm preview      # Preview production build locally

# Code Quality
pnpm lint         # Run ESLint

# Production
pnpm start        # Serve built application
```

## 🏗️ Project Structure

```
src/
├── app/
│   ├── components/     # Application-specific components
│   │   ├── bio.tsx            # Main bio page component
│   │   ├── bio-link.tsx       # Individual link component
│   │   ├── bio-collection.tsx # Collection component
│   │   ├── navbar.tsx         # Navigation component
│   │   └── ...
│   ├── contexts/       # React contexts (auth, theme, etc.)
│   ├── interfaces/     # TypeScript type definitions
│   ├── pages/          # Page components
│   ├── stores/         # Zustand stores
│   └── css/           # Custom CSS files
├── components/
│   └── ui/            # Reusable UI components (Radix UI)
├── lib/               # Utility functions and configurations
├── languages/         # Internationalization files
└── main.tsx          # Application entry point
```

## 🎨 Customization

### Themes
The application supports both dark and light themes with custom gradient backgrounds. Users can:
- Switch between dark/light modes
- Create custom gradient backgrounds
- Customize link appearance and layout

### Layouts
Two layout options are available:
- **List Layout**: Traditional vertical list of links
- **Grid Layout**: Grid-based layout for better visual organization

## 🌐 Deployment

### Docker Deployment
```bash
# Build Docker image
docker build -f docker/Dockerfile -t bio-web .

# Run container
docker run -p 8080:8080 bio-web
```

### Standard Deployment
```bash
# Build for production
pnpm build

# The built files will be in the `dist` directory
# Serve these files with any static file server
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory for configuration:
```env
# Backend API Configuration (Required)
VITE_API_URL=http://localhost:3000  # URL where bio-api is running

# Add other environment variables here as needed
```

**Important**: Make sure the `VITE_API_URL` points to your running bio-api instance. The default assumes bio-api is running on `localhost:3000`.

### Caddy Configuration
The project includes a `Caddyfile` for Caddy web server deployment.

## 🌍 Internationalization

The application supports multiple languages:
- **English** (`en.json`)
- **Portuguese** (`pt_BR.json`)

To add a new language:
1. Create a new JSON file in `src/languages/`
2. Add translations following the existing structure
3. Update the i18n configuration in `src/languages/i18n.ts`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Use TypeScript for all new components
- Follow the existing code style and linting rules
- Add proper type definitions for new features
- Test your changes thoroughly

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:
1. Check the existing issues in the repository
2. Create a new issue with detailed information
3. Provide steps to reproduce any bugs

## 🔗 Related Projects

- [Linktree](https://linktr.ee/) - Original inspiration
- [Bio.link](https://bio.link/) - Similar service
- [Carrd](https://carrd.co/) - Website builder

---

**Built with ❤️ using React, TypeScript, and modern web technologies.** 