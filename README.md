# Travel Bucket List 🌍

A beautiful and functional single-page application for managing your travel destinations. Plan your dream trips, track visited places, and get AI-powered travel assistance all in one place.

![Travel Bucket List](https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80)

## ✨ Features

### 🏠 Home Page
- **Destination Grid**: Beautiful card-based display of all your destinations
- **Smart Search & Filter**: Search by name, country, city, or notes. Filter by country, tags, and visited status
- **Statistics Dashboard**: Track total destinations, visited count, and wishlist items

### ➕ Add/Edit Destinations
- **Comprehensive Form**: Add detailed information about each destination
- **Photo Integration**: Add custom photos or search from Pixel
- **Tag System**: Organize destinations with custom tags
- **Priority Levels**: Categorize as Wishlist, Soon, or Planned
- **Visit Tracking**: Mark destinations as visited with dates

### 📸 Photo Search
- **Pixel Integration**: Search and browse high-quality destination photos
- **Masonry Grid**: Pinterest-style photo gallery
- **One-Click Selection**: Easily add photos to your destinations

### 🤖 AI Travel Assistant
- **Smart Chat Interface**: Get travel tips and recommendations
- **Typewriter Effect**: Engaging response animation
- **Markdown Support**: Formatted responses with headings and lists
- **Travel Expertise**: Weather, attractions, culture, and planning advice

## 🚀 Quick Start

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <https://github.com/muzhiwa/travel-bucket>
   cd travel-bucket-list
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🛠️ Built With

### Frontend Framework
- **React** (Create React App) - Modern component-based UI framework

### UI Libraries
- **React Bootstrap** - Responsive UI components
- **Bootstrap 5** - CSS framework for styling
- **Font Awesome** - Icon library

### APIs & Integrations
- **Pixel API** - High-quality destination photos
- **SheCodes AI API** - AI-powered travel assistance

### Additional Libraries
- **React Router DOM** - Client-side routing
- **Typewriter.js** - Animated typing effects
- **Marked** - Markdown parsing for AI responses

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.js       # Navigation header
│   ├── Hero.js         # Landing section
|   ├── Footer.js       # Links to Social Media 
|   ├── content.js      # Pre-loaded destination data
│   ├── DestinationCard.js # Destination display card
│   ├── SearchFilter.js # Search and filter functionality
│   ├── Stats.js        # Statistics dashboard
│   ├── ContactForm.js  # Contact form component
│   ├── PhotoSearch.js  # Photo search interface
│   └── AIChat.js       # AI chat component
├── pages/              # Main application pages
│   ├── Home.js         # Home/dashboard page
│   ├── AddDestination.js # Add/edit destination form
│   ├── PhotoSearchPage.js # Photo search page
│   └── AIPage.js       # AI assistant page
├── services/           # External service integrations
│   ├── localStorage.js # Data persistence layer
│   └── api.js          # API service functions
├── styles/             # CSS and styling files
│   ├── App.css         # Main application styles
│   └── Footer.css      # Footer-specific styles
└── App.js              # Main application component
```

## 💾 Data Management

### Local Storage
- All destination data is persisted in browser localStorage
- Automatic sample data loading for new users
- Real-time updates without page refresh

### Destination Schema
```javascript
{
  id: String,
  name: String,          // Required
  country: String,       // Required
  city: String,          // Optional
  notes: String,         // Optional (20-300 chars)
  visited: Boolean,
  visitedDate: String,   // Date string if visited
  tags: Array,           // Custom tags
  priority: String,      // 'wishlist' | 'soon' | 'planned'
  photo: String,         // Image URL
  createdAt: String      // ISO date string
}
```

## 🎨 Design Features

### Visual Design
- **Gradient Backgrounds**: Beautiful color transitions throughout
- **Card-based Layout**: Modern material design cards
- **Responsive Design**: Mobile-first approach
- **Smooth Animations**: CSS transitions and hover effects

### User Experience
- **Intuitive Navigation**: Clean navbar with active state indicators
- **Smart Empty States**: Helpful messages when no data exists
- **Form Validation**: Real-time validation with error messages

## 🔧 Customization

### Styling Variables
Modify the CSS custom properties in `src/index.css`:

```css
:root {
    --primary: #927fbf;
  --primary-dark: #4f3b78;
  --secondary: #363b4e;
  --accent: #8338ec;
  --light: #f8f9fa;
  --dark: #212529;
  --success: #890bdd;
  --warning: #b50ecb;
  --danger: #363b4e;
  --gray: #6c757d;
  --light-gray: #e9ecef;
  --border-radius: 12px;
  --box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  --transition: all 0.3s ease;
}
```

### API Configuration
Update API keys in the respective components:
- **Pixel API**: `src/components/PhotoSearch.js`
- **AI API**: `src/components/AIChat.js`

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Build the project: `npm run build`
2. Drag the `build` folder to Netlify
3. Configure environment variables if needed

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



## 🙏 Acknowledgments

- **Pixel API** for providing beautiful destination photos
- **SheCodes** for the AI API integration
- **React Bootstrap** for the component library
- **Font Awesome** for the icon set

**Happy Travel Planning!** ✈️🌎