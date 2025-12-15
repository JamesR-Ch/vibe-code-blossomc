# Blossom Contract Management System 🌸

A modern, responsive contract management system for Blossom Pixel services. Built with React, TypeScript, and Tailwind CSS.

## ✨ Features

- **🎨 Modern UI/UX**: Clean, professional design with hover effects and animations
- **📱 Fully Responsive**: Optimized for phone, tablet, and desktop
- **🎯 Service Selection**: Interactive service cards with contextual icons
- **📋 Dynamic Forms**: Smart form generation with field validation
- **📄 Contract Generation**: Professional contract templates with printing support
- **✏️ Custom Service Names**: Edit service names freely in contract templates
- **➕ Add-on Support**: Flexible add-on items with individual pricing
- **🌐 Bilingual Support**: Thai and English language options
- **⚙️ Configurable**: Easy-to-modify service configurations and pricing

## 🚀 Services Supported

- **📦 Bundle Service**: Complete service packages with custom pricing
- **📷 Photobooth**: Professional photo booth with multiple size options
- **🎥 360 Video**: 360-degree video recording service
- **💝 Blessing Video**: Video blessing service for special occasions
- **⭐ Horoscope Booth**: Interactive horoscope and fortune telling
- **🏷️ Stickerline**: Custom sticker creation service
- **🎁 Add-on**: Additional services with up to 4 customizable items

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4.x
- **Build Tool**: Vite
- **Linting**: ESLint with TypeScript support

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/JamesR-Ch/vibe-code-blossomc.git
cd vibe-code-blossomc

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📦 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Deploy!

### Other Platforms
The build output is in the `dist` folder and can be deployed to any static hosting service.

## 🎨 Customization

### Service Configuration
Edit `src/services/serviceConfig.ts` to modify:
- Service names and descriptions
- Pricing and default values
- Form fields and validation

### Styling
- Global styles: `src/index.css`
- Component-specific styles: Tailwind classes in components
- Theme colors: Modify Tailwind configuration

## 📋 Default Service Settings

- **Bundle Service**: Custom pricing, ฿0
- **Photobooth**: 3 hours, indoor, 18:00-21:00, ฿8,900
- **360 Video**: 3 hours, indoor, 18:00-21:00, ฿10,900
- **Blessing Video**: 2 hours, indoor, 18:00-20:00, ฿4,900
- **Horoscope Booth**: 2 hours, indoor, 18:00-20:00, ฿4,900
- **Stickerline**: 12 stickers, ฿1,200
- **Add-on**: Up to 4 custom items with individual pricing, ฿0

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary to Blossom Pixel.

## 🙋‍♂️ Support

For support and questions, please contact the development team.

---

**Made with ❤️ for Blossom Pixel**
