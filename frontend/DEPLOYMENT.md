# Deployment Guide - User & Post Management System

## 🚀 Production Deployment

### 1. Build the Application

```bash
# Install dependencies
npm install

# Build for production
npm run build:prod
```

### 2. Deploy to Static Hosting

#### Option A: Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build:prod`
3. Set publish directory: `dist`
4. Deploy automatically on push

#### Option B: Vercel
1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build:prod`
3. Set output directory: `dist`
4. Deploy automatically on push

#### Option C: GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts:
   ```json
   "deploy": "gh-pages -d dist"
   ```
3. Build and deploy: `npm run build:prod && npm run deploy`

### 3. Environment Variables

Create a `.env.production` file for production settings:

```env
VITE_API_BASE_URL=https://jsonplaceholder.typicode.com
VITE_APP_TITLE=User & Post Management System
```

### 4. Server Configuration

For custom server deployment, ensure your server serves the `dist` folder and handles client-side routing:

#### Nginx Configuration
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

#### Apache Configuration
```apache
<Directory "/path/to/dist">
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</Directory>
```

## 🔧 Development

### Local Development
```bash
npm run dev
```

### Preview Production Build
```bash
npm run build:prod
npm run serve
```

## 📱 Features

- ✅ Responsive design for all devices
- ✅ Turkish language support
- ✅ Form validation with error messages
- ✅ Loading states and error handling
- ✅ Modern UI with smooth animations
- ✅ SEO optimized
- ✅ Production-ready build configuration

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📊 Performance

- Optimized bundle splitting
- Lazy loading for better performance
- Minified and compressed assets
- Modern CSS with vendor prefixes
