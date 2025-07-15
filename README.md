# Luci3 - Interactive Portfolio & Animation Showcase

A cutting-edge portfolio website built to demonstrate advanced web animations, smooth transitions, and modern web development techniques. This project showcases sophisticated UI/UX design principles with seamless user interactions and performance-optimized animations.

## ✨ Features

### 🎭 Advanced Animations
- **GSAP-powered animations** with ScrollTrigger integration
- **Smooth scroll implementation** for enhanced user experience
- **Custom cursor follower** with contextual interactions
- **Page transitions** with fluid motion effects
- **Scroll-triggered animations** that respond to user behavior
- **Interactive hover effects** with dynamic visual feedback

### 🎨 Visual Design
- **Modern, minimalist design** with professional aesthetics
- **Responsive layout** optimized for all devices
- **Custom typography** with web-optimized font loading
- **Video integration** for dynamic content presentation
- **Interactive work showcase** with project galleries
- **Contextual micro-interactions** throughout the interface

### 🔧 Technical Excellence
- **Next.js 14** with App Router for optimal performance
- **TypeScript** for type-safe development
- **Server-side rendering** for improved SEO and performance
- **Optimized asset loading** with Next.js Image component
- **Component-based architecture** for maintainable code

## 🛠️ Tech Stack

### Core Framework
- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[React 18](https://reactjs.org/)** - Modern React with latest features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript

### Styling & Design
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[SCSS](https://sass-lang.com/)** - Enhanced CSS with variables and mixins
- **[PostCSS](https://postcss.org/)** - CSS transformation and optimization

### Animation & Interaction
- **[GSAP](https://greensock.com/gsap/)** - Professional-grade animation library
  - ScrollTrigger - Scroll-based animations
  - Observer - Interaction detection
  - ScrollSmoother - Enhanced scrolling experience
- **[React Transition Group](https://reactcommunity.org/react-transition-group/)** - Component transitions
- **[Splitting.js](https://splitting.js.org/)** - Text animation effects

### UI Components & Icons
- **[Heroicons](https://heroicons.com/)** - Beautiful hand-crafted SVG icons
- **[Lucide React](https://lucide.dev/)** - Customizable icon library

### Utilities
- **[Lodash](https://lodash.com/)** - JavaScript utility library
- **[cookies-next](https://www.npmjs.com/package/cookies-next)** - Cookie management

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd luci3
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the result.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
luci3/
├── app/                          # Next.js App Router pages
│   ├── contact/                  # Contact page
│   ├── work/                     # Work showcase pages
│   │   └── [slug]/              # Dynamic project pages
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── components/                   # Reusable components
│   ├── AnimatedComponentWrapper/ # Scroll animation wrapper
│   ├── CursorFollower/          # Custom cursor component
│   ├── HoverButton/             # Interactive button component
│   ├── Marquee/                 # Text animation component
│   ├── navigation/              # Header and footer
│   ├── page-components/         # Page-specific components
│   ├── PageTransition/          # Page transition effects
│   └── ScrollSmootherWrapper/   # Smooth scroll implementation
├── public/                      # Static assets
│   └── assets/                  # Images, videos, fonts, styles
├── utils/                       # Utility functions
│   ├── context/                 # React contexts
│   ├── fonts/                   # Font configurations
│   ├── hooks/                   # Custom React hooks
│   └── gsap.ts                  # GSAP configuration
└── styles/                      # Global styles and SCSS
```

## 🎯 Key Components

### Animation System
- **AnimatedOnScroll**: Wrapper for scroll-triggered animations
- **CursorFollower**: Interactive cursor that responds to page elements
- **PageTransition**: Smooth transitions between routes
- **ScrollSmoother**: Enhanced scrolling experience

### Interactive Elements
- **HoverButton**: Buttons with advanced hover effects
- **Marquee**: Animated text elements
- **Work Gallery**: Interactive project showcases
- **Video Integration**: Optimized video playback

## 🎨 Design Philosophy

This portfolio demonstrates:
- **Performance-first animations** that maintain 60fps
- **Accessibility considerations** with reduced motion preferences
- **Progressive enhancement** for various device capabilities
- **User-centric design** with intuitive interactions
- **Professional presentation** suitable for client showcases

## 📈 Performance Optimizations

- **Code splitting** with Next.js automatic optimization
- **Image optimization** with Next.js Image component
- **Font optimization** with custom font loading strategies
- **Animation performance** with GSAP's optimized rendering
- **Bundle optimization** with tree shaking and compression

## 🌟 Showcase Highlights

This website demonstrates proficiency in:
- Modern React development patterns
- Advanced CSS animations and interactions
- Performance optimization techniques
- User experience design
- Professional web development workflow
- Creative coding and visual storytelling

## 📝 License

This project is a personal portfolio showcase. All rights reserved.

## 🤝 Contact

For inquiries about web development services or collaboration opportunities, please use the contact form on the website.

---

*Built with passion for modern web development and user experience design.*
