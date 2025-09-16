# J Square Photography - Website Redesign Guide

## 📸 Project Overview

A modern, minimalist photography portfolio and client management system built with Next.js, featuring QNAP NAS integration for seamless photo management and delivery.

## 🎯 Vision Statement

Create a high-performance photography platform that:
- Showcases work with elegant simplicity
- Provides seamless client gallery access
- Integrates directly with QNAP storage
- Offers instant dark/light theme switching
- Delivers exceptional user experience

---

## 🏗️ Architecture Overview

```
┌─────────────────┐     ┌──────────────┐     ┌─────────────┐
│   QNAP NAS      │────▶│   Next.js    │────▶│   Client    │
│  Photo Storage  │     │   Web App    │     │   Browser   │
└─────────────────┘     └──────────────┘     └─────────────┘
        ▲                       │                     │
        │                       ▼                     ▼
        │               ┌──────────────┐     ┌─────────────┐
        └───────────────│   Vercel     │     │   Theme     │
         Direct Upload  │   CDN/Host   │     │  Dark/Light │
                        └──────────────┘     └─────────────┘
```

---

## 📚 Technology Stack

### Core Technologies
| Technology | Purpose | Why Chosen |
|------------|---------|------------|
| **Next.js 15.5** | Frontend Framework | Server-side rendering, API routes, optimal performance |
| **TypeScript** | Type Safety | Prevent runtime errors, better IDE support |
| **Tailwind CSS** | Styling | Rapid development, consistent design system |
| **QNAP NAS** | Photo Storage | Centralized storage, direct workflow integration |
| **PostgreSQL** | Database | User data, gallery metadata, client information |
| **NextAuth.js** | Authentication | Secure client logins, session management |
| **Vercel** | Hosting | Optimized for Next.js, global CDN |

### Supporting Libraries
| Library | Purpose |
|---------|---------|
| **Framer Motion** | Smooth animations |
| **Three.js** | 3D hero effects (optional) |
| **Sharp** | Image optimization |
| **next-themes** | Theme management |
| **SWR** | Data fetching |
| **React Hook Form** | Form handling |
| **Zod** | Schema validation |

---

## 🎨 Design System

### Theme Configuration

```javascript
// Light Theme (Default)
{
  background: '#FFFFFF',
  text: '#000000',
  accent: '#1A1A1A',
  overlay: 'rgba(255, 255, 255, 0.9)'
}

// Dark Theme
{
  background: '#000000',
  text: '#FFFFFF',
  accent: '#F5F5F5',
  overlay: 'rgba(0, 0, 0, 0.9)'
}
```

### Design Principles
1. **Minimalism First** - Let photography be the focus
2. **Typography-Driven** - Clean, readable fonts
3. **High Contrast** - Pure blacks and whites
4. **Smooth Transitions** - 200-300ms animations
5. **Mobile-First** - Responsive by default

---

## 📁 Project Structure

```
jsquare-photography/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (public)/           # Public routes
│   │   │   ├── page.tsx        # Homepage
│   │   │   ├── portfolio/      # Gallery pages
│   │   │   ├── about/          # About section
│   │   │   └── contact/        # Contact form
│   │   ├── (protected)/        # Auth required
│   │   │   ├── client/         # Client galleries
│   │   │   └── admin/          # Admin dashboard
│   │   ├── api/                # API routes
│   │   │   ├── qnap/           # QNAP integration
│   │   │   ├── auth/           # Authentication
│   │   │   └── galleries/      # Gallery management
│   │   └── layout.tsx          # Root layout
│   ├── components/
│   │   ├── ui/                 # UI components
│   │   ├── gallery/            # Gallery components
│   │   ├── theme/              # Theme components
│   │   └── layout/             # Layout components
│   ├── lib/
│   │   ├── qnap/               # QNAP utilities
│   │   ├── auth/               # Auth helpers
│   │   └── utils/              # General utilities
│   ├── hooks/                  # Custom React hooks
│   ├── types/                  # TypeScript types
│   └── styles/                 # Global styles
├── public/                     # Static assets
├── prisma/                     # Database schema
└── tests/                      # Test files
```

---

## 🔧 QNAP Integration

### Storage Structure

```
QNAP NAS File Organization:
/PhotoLibrary/
├── /Portfolio/                 # Public galleries
│   ├── /Weddings/
│   │   ├── /2024-venue-name/
│   │   │   ├── metadata.json   # Gallery info
│   │   │   ├── /full-res/      # Original files
│   │   │   ├── /web/           # Optimized versions
│   │   │   └── /thumbnails/    # Gallery previews
│   │   └── ...
│   ├── /Portraits/
│   ├── /Commercial/
│   └── /Events/
│
└── /Clients/                   # Private galleries
    ├── /Active/
    │   └── /[client-name]-[date]/
    │       ├── config.json      # Access settings
    │       ├── /selects/        # Client selections
    │       ├── /downloads/      # Downloadable files
    │       └── /proofs/         # Watermarked previews
    └── /Archive/                # Past events
```

### Connection Methods

#### Option 1: Direct Mount (Development)
```bash
# Mount QNAP on development machine
mount -t nfs qnap.local:/PhotoLibrary /mnt/photos
```

#### Option 2: QNAP File Station API (Production)
```javascript
// API endpoint configuration
const QNAP_API = {
  host: process.env.QNAP_HOST,
  port: process.env.QNAP_PORT,
  username: process.env.QNAP_USER,
  password: process.env.QNAP_PASSWORD
}
```

#### Option 3: S3-Compatible (Recommended)
```javascript
// QuObjects configuration
const s3Config = {
  endpoint: process.env.QNAP_S3_ENDPOINT,
  accessKeyId: process.env.QNAP_ACCESS_KEY,
  secretAccessKey: process.env.QNAP_SECRET_KEY,
  s3ForcePathStyle: true
}
```

---

## 🚀 Features Roadmap

### Phase 1: Foundation ✅
- [x] Next.js setup with TypeScript
- [x] Basic routing structure
- [x] Theme system (dark/light)
- [ ] QNAP connection setup
- [ ] Basic component library

### Phase 2: Public Website
- [ ] Homepage with hero section
- [ ] Portfolio grid layout
- [ ] Gallery viewer with lightbox
- [ ] About page
- [ ] Contact form with validation
- [ ] SEO optimization

### Phase 3: Client Portal
- [ ] Authentication system
- [ ] Password-protected galleries
- [ ] Download functionality
- [ ] Favorites/selection system
- [ ] Client communication tools

### Phase 4: Admin Dashboard
- [ ] Gallery upload interface
- [ ] Client management
- [ ] Analytics dashboard
- [ ] Booking calendar
- [ ] Invoice generation

### Phase 5: Advanced Features
- [ ] Print ordering system
- [ ] Payment integration
- [ ] Email automation
- [ ] Mobile app (PWA)
- [ ] AI-powered tagging

---

## 💻 Development Setup

### Prerequisites
- Node.js 20+
- npm/yarn/pnpm
- QNAP NAS (or mock API for development)
- PostgreSQL database

### Installation Steps

```bash
# 1. Clone repository
git clone [repository-url]
cd jsquare-photography

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env.local
# Edit .env.local with your configurations

# 4. Setup database
npx prisma generate
npx prisma db push

# 5. Run development server
npm run dev
```

### Environment Variables

```env
# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="J Square Photography"

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/jsquare"

# Authentication
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# QNAP Configuration
QNAP_HOST="192.168.1.100"
QNAP_PORT="8080"
QNAP_USERNAME="admin"
QNAP_PASSWORD="secure-password"

# S3-Compatible (Optional)
QNAP_S3_ENDPOINT="http://qnap.local:9000"
QNAP_ACCESS_KEY="access-key"
QNAP_SECRET_KEY="secret-key"

# Email (Optional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email"
SMTP_PASSWORD="app-password"
```

---

## 📝 API Documentation

### Gallery Endpoints

#### Get Public Galleries
```http
GET /api/galleries/public
Response: Array of gallery objects
```

#### Get Client Gallery
```http
GET /api/galleries/client/[slug]
Headers: Authorization: Bearer [token]
Response: Gallery with images array
```

#### Upload Images
```http
POST /api/galleries/upload
Body: FormData with images
Response: Upload status and URLs
```

### Authentication Endpoints

#### Client Login
```http
POST /api/auth/login
Body: { email, password }
Response: { token, user }
```

#### Verify Gallery Password
```http
POST /api/auth/gallery-access
Body: { galleryId, password }
Response: { accessToken, expiresAt }
```

---

## 🎨 Component Architecture

### Core Components

```typescript
// Gallery Grid Component
<GalleryGrid
  images={images}
  columns={3}
  spacing="gap-4"
  onImageClick={handleImageClick}
/>

// Theme Toggle Component
<ThemeToggle
  position="top-right"
  showLabel={false}
  shortcut="cmd+d"
/>

// Client Gallery Component
<ClientGallery
  slug="smith-wedding-2024"
  password="protected"
  allowDownload={true}
  watermark={false}
/>
```

---

## 🔐 Security Considerations

### Client Gallery Protection
- Password hashing with bcrypt
- JWT tokens for session management
- Rate limiting on login attempts
- Expiring gallery links
- IP-based access logs

### Image Protection
- Optional watermarking
- Right-click prevention (optional)
- Hotlink protection
- Download tracking
- EXIF data stripping

---

## 📊 Performance Targets

| Metric | Target | Method |
|--------|--------|--------|
| **First Load** | <2s | Code splitting, lazy loading |
| **Image Load** | <1s | Progressive loading, CDN |
| **Theme Switch** | Instant | CSS variables, no reload |
| **Gallery Navigation** | <500ms | Prefetching, caching |
| **Mobile Score** | 95+ | Responsive images, minimal JS |

---

## 🧪 Testing Strategy

### Unit Tests
- Component rendering
- Utility functions
- API endpoints

### Integration Tests
- QNAP connection
- Authentication flow
- Gallery access

### E2E Tests
- Client journey
- Admin workflow
- Theme switching

---

## 📱 Progressive Web App

### Features
- Offline gallery viewing
- Install to home screen
- Push notifications
- Background sync
- Share API integration

### Implementation
```json
// manifest.json
{
  "name": "J Square Photography",
  "short_name": "JSP",
  "theme_color": "#000000",
  "background_color": "#ffffff",
  "display": "standalone",
  "orientation": "portrait",
  "icons": [...]
}
```

---

## 🚢 Deployment

### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod
```

### Environment Setup
1. Configure environment variables in Vercel dashboard
2. Setup domain and SSL
3. Configure QNAP firewall for API access
4. Setup monitoring and analytics

---

## 📈 Analytics & Monitoring

### Tracking
- Google Analytics 4
- Vercel Analytics
- Custom event tracking
- Gallery view statistics

### Monitoring
- Error tracking (Sentry)
- Performance monitoring
- Uptime monitoring
- QNAP health checks

---

## 🤝 Contributing

### Development Workflow
1. Create feature branch
2. Implement changes
3. Write tests
4. Submit pull request
5. Code review
6. Merge to main

### Code Standards
- ESLint configuration
- Prettier formatting
- TypeScript strict mode
- Conventional commits

---

## 📞 Support & Contact

- **Developer**: [Your Name]
- **Email**: support@jsquarephotography.com
- **Documentation**: [Link to docs]
- **Issues**: [GitHub Issues]

---

## 📄 License

Copyright © 2025 J Square Photography. All rights reserved.

---

## 🎯 Success Metrics

| Metric | Goal | Measurement |
|--------|------|-------------|
| **Page Load Speed** | <2 seconds | Google PageSpeed |
| **Client Satisfaction** | 95%+ | Survey feedback |
| **Gallery Access Time** | <5 seconds | Analytics |
| **Mobile Usage** | 60%+ | Analytics |
| **Theme Preference** | Track usage | Local storage |

---

*Last Updated: January 2025*
*Version: 1.0.0*