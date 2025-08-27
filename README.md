# SopHero - AI-Powered Statement of Purpose Generator

SopHero is a modern web application that helps students create compelling Statements of Purpose (SOPs) for university applications using advanced AI technology. Built with Next.js 15, React 19, and shadcn/ui components, SopHero provides a beautiful, user-friendly interface for generating personalized SOPs powered by OpenAI's GPT-4.

## 🚀 Features

- **AI-Powered Generation**: Advanced OpenAI GPT-4 technology creates personalized, compelling SOPs
- **Professional Templates**: Access industry-standard templates and formats
- **Quick & Easy**: Generate complete SOPs in minutes, not hours
- **Quality Assurance**: Built-in quality checks ensure university standards
- **Personalized Content**: Every SOP is uniquely crafted based on your background
- **Expert Guidance**: Follow proven strategies from successful applicants
- **User Authentication**: Secure signup/login with email and Google OAuth
- **Data Persistence**: Save and manage your SOPs with MongoDB integration
- **Beautiful UI**: Modern, responsive design with shadcn/ui components
- **Theme Support**: Light/dark mode with system preference detection
- **Fallback System**: Template-based generation if AI is unavailable

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4, shadcn/ui components
- **Authentication**: NextAuth.js (Email/Password + Google OAuth)
- **Database**: MongoDB with Mongoose ODM
- **AI**: OpenAI GPT-4 API for intelligent SOP generation
- **Icons**: Lucide React
- **Theme**: next-themes for dark/light mode
- **Security**: bcryptjs for password hashing

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js 18+ installed
- MongoDB database (local or cloud)
- Google OAuth credentials (optional, for Google sign-in)
- OpenAI API key (required for AI-powered SOP generation)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-sop
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` and add your configuration:
   ```env
   # MongoDB Connection
   MONGODB_URI=mongodb://localhost:27017/sophero
   
   # NextAuth Configuration
   NEXTAUTH_SECRET=your-nextauth-secret-key-here
   NEXTAUTH_URL=http://localhost:3000
   
   # Google OAuth (Optional)
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   NEXT_PUBLIC_GOOGLE_OAUTH_ENABLED=true
   
   # OpenAI API (Required for AI-powered SOP generation)
   OPENAI_API_KEY=your-openai-api-key-here
   
   # Environment
   NODE_ENV=development
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage

### For New Users

1. **Sign Up**: Create an account using email/password or Google OAuth
2. **Complete Questionnaire**: Answer questions about your background, goals, and target program
3. **Generate SOP**: Let SopHero's AI create your personalized Statement of Purpose
4. **Review & Edit**: Make any necessary adjustments to your SOP
5. **Download**: Save your final SOP for submission

### For Returning Users

1. **Sign In**: Access your SopHero dashboard
2. **View SOPs**: See all your previously created Statements of Purpose
3. **Create New**: Start a new SOP for different programs or universities
4. **Manage**: Download, view, or create new SOPs as needed

## 🏗️ Project Structure

```
ai-sop/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   └── sop/           # SOP management endpoints
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # User dashboard
│   ├── generate-sop/      # SOP generation page
│   ├── questionnaire/     # SOP questionnaire
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── Navigation.tsx    # Navigation bar
│   ├── Footer.tsx        # Footer component
│   └── theme-provider.tsx # Theme provider
├── lib/                  # Utility libraries
│   ├── mongodb.ts        # Database connection
│   ├── sop-generator.ts  # AI SOP generation logic
│   ├── demo-data.ts      # Sample data
│   └── utils.ts          # Utility functions
├── models/               # Database models
│   ├── User.ts           # User model
│   └── SOP.ts            # SOP model
├── types/                # TypeScript type definitions
│   └── next-auth.d.ts    # NextAuth type extensions
└── public/               # Static assets
```

## 🔐 Authentication & Database

### User Authentication
- **Email/Password**: Traditional authentication with bcrypt password hashing
- **Google OAuth**: One-click sign-in with Google accounts
- **Session Management**: JWT-based sessions with NextAuth.js
- **Protected Routes**: Automatic redirection for unauthenticated users

### Data Persistence
- **MongoDB**: NoSQL database for flexible data storage
- **User Data**: Secure storage of user profiles and authentication info
- **SOP Storage**: Complete SOP data including questionnaire responses and generated content
- **Data Privacy**: User data is isolated and secure

## 🤖 AI-Powered SOP Generation

### OpenAI Integration
- **GPT-4 Model**: Uses OpenAI's latest language model for sophisticated SOP generation
- **Intelligent Prompting**: Carefully crafted prompts ensure high-quality, personalized content
- **Context Awareness**: AI understands academic writing standards and university requirements
- **Personalization**: Each SOP is uniquely tailored to the applicant's background and goals

### Fallback System
- **Template-Based Generation**: If OpenAI API is unavailable, falls back to template-based generation
- **Reliability**: Ensures SOP generation always works, even without internet connectivity
- **Quality Assurance**: Both AI and template methods produce professional-quality SOPs

### AI Features
- **Natural Language**: Generates human-like, engaging content
- **Academic Tone**: Maintains professional, scholarly writing style
- **Structure Optimization**: Creates well-organized, logical flow
- **Content Enhancement**: Transforms rough ideas into compelling narratives

## 🎨 UI/UX Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Modern Components**: Built with shadcn/ui for consistent, beautiful design
- **Theme Support**: Light and dark mode with system preference detection
- **Loading States**: Smooth loading animations and feedback
- **Form Validation**: Real-time validation and error handling
- **Accessibility**: WCAG compliant with proper ARIA labels

## 🔧 Configuration

### OpenAI API Setup
1. **Get API Key**: Sign up at [OpenAI](https://platform.openai.com/) and get your API key
2. **Add to Environment**: Set `OPENAI_API_KEY=your-api-key` in `.env.local`
3. **Test Generation**: Try creating an SOP to verify the API integration

### Google OAuth Setup
See [GOOGLE_OAUTH_SETUP.md](./GOOGLE_OAUTH_SETUP.md) for detailed instructions on setting up Google OAuth.

### Environment Variables
- `MONGODB_URI`: Your MongoDB connection string
- `NEXTAUTH_SECRET`: Secret key for NextAuth.js (generate with `openssl rand -base64 32`)
- `NEXTAUTH_URL`: Your application URL
- `GOOGLE_CLIENT_ID`: Google OAuth client ID (optional)
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret (optional)
- `NEXT_PUBLIC_GOOGLE_OAUTH_ENABLED`: Enable/disable Google OAuth button
- `OPENAI_API_KEY`: Your OpenAI API key (required for AI features)

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
- **Netlify**: Similar to Vercel deployment
- **Railway**: Great for full-stack applications
- **DigitalOcean**: App Platform for easy deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Google OAuth Setup Guide](./GOOGLE_OAUTH_SETUP.md)
2. Review the troubleshooting section in the setup guide
3. Open an issue on GitHub
4. Contact the development team

## 🙏 Acknowledgments

- [OpenAI](https://openai.com/) for providing the GPT-4 API
- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [NextAuth.js](https://next-auth.js.org/) for authentication
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide](https://lucide.dev/) for icons
- [MongoDB](https://www.mongodb.com/) for database
- [Vercel](https://vercel.com/) for hosting

---

**SopHero** - Your Statement of Purpose Hero 🦸‍♂️
