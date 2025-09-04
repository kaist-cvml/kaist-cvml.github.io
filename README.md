# KAIST Computer Vision & Machine Learning Lab Website

A modern, responsive academic website for the KAIST CVML Lab built with HTML, CSS, and JavaScript. Features JSON-based content management for easy maintenance and dynamic content loading.

## � Quick Start

### Local Development
```bash
# Clone or download the repository
cd kaist-cvml.github.io

# Start local development server (Python 3)
python3 -m http.server 8000

# Or with Python 2
python -m SimpleHTTPServer 8000

# Open in browser
open http://localhost:8000
```

### GitHub Pages Deployment
1. Create a repository named `username.github.io` or use a custom domain
2. Push this code to the repository
3. Go to repository Settings → Pages
4. Select "Deploy from main branch"
5. Your site will be available at `https://username.github.io`

## �📁 Project Structure

```
kaist-cvml.github.io/
├── index.html              # Homepage with news and featured publications
├── css/
│   └── main.css            # Complete styling for all pages
├── js/
│   ├── main.js             # Homepage functionality and shared utilities
│   ├── data-manager.js     # JSON data management with caching
│   └── publications.js     # Publications page filtering and search
├── data/
│   ├── news.json           # News items in structured JSON format
│   └── publications.json   # Publications with full metadata
├── pages/
│   ├── people.html         # Team members page
│   ├── publications.html   # Research publications with filtering
│   ├── projects.html       # Research projects showcase
│   ├── gallery.html        # Photo gallery with categories
│   └── apply.html          # Application and joining information
├── assets/
│   ├── logos/              # SVG logos and placeholders
│   │   ├── cvml-logo.svg
│   │   ├── faculty-placeholder.svg
│   │   └── student-placeholder.svg
│   └── images/             # Images and photos
│       ├── cvml-main-logo.png
│       └── gallery/        # Gallery images
├── .gitignore              # Git ignore rules
└── README.md               # This documentation
```

## ✨ Key Features

### 🏠 Homepage
- **Hero Section**: Lab introduction with mission and research areas
- **Dynamic News**: Latest lab updates loaded from JSON with "Load More" functionality
- **Featured Publications**: Showcase of important recent papers
- **Responsive Design**: Optimized for desktop, tablet, and mobile

### � Publications System
- **JSON-Based Management**: Easy content updates without HTML editing
- **Advanced Filtering**: Filter by year, category, and presentation type
- **Real-Time Search**: Search across titles, authors, and abstracts
- **Rich Metadata**: Authors, venues, abstracts, keywords, and links
- **Special Badges**: Oral presentations and outstanding paper awards

### 🔄 Dynamic Content Management
- **Centralized Data**: All content managed through JSON files
- **Automatic Caching**: Efficient data loading with browser caching
- **Error Handling**: Graceful fallbacks when data fails to load
- **Path Resolution**: Works correctly from both root and subdirectories

## � Content Management

### Adding News Items

Edit `data/news.json` to add new lab updates:

```json
{
  "news": [
    {
      "id": "news001",
      "date": "2025-09-04",
      "title": "Optional title",
      "content": "News content with <strong>HTML</strong> formatting supported.",
      "category": "publication",
      "featured": true,
      "venue": "CVPR 2025"
    }
  ]
}
```

**News Categories:**
- `publication`: Paper acceptances and publications
- `lab_update`: Lab news, graduations, new members
- `award`: Awards and recognitions
- `collaboration`: Partnerships and collaborations

### Managing Publications

Edit `data/publications.json` to manage research papers:

```json
{
  "publications": [
    {
      "id": "pub001",
      "title": "Your Paper Title",
      "authors": ["First Author*", "Second Author*", "Prof. Name"],
      "venue": "CVPR 2025",
      "year": 2025,
      "type": "conference",
      "status": "accepted",
      "date": "2025-03-01",
      "abstract": "Paper abstract...",
      "keywords": ["Computer Vision", "Machine Learning"],
      "pdf_url": "https://link-to-paper.pdf",
      "code_url": "https://github.com/username/repo",
      "project_url": "https://project-page.com",
      "featured": true,
      "category": "computer_vision",
      "presentation": "oral"
    }
  ]
}
```

**Publication Types:**
- `conference`: Conference papers
- `journal`: Journal articles
- `workshop`: Workshop papers
- `preprint`: ArXiv and other preprints

**Categories:**
- `computer_vision`: Computer Vision
- `machine_learning`: Machine Learning
- `nlp`: Natural Language Processing
- `multimodal`: Multi-Modal Learning

**Presentation Types:**
- `oral`: Oral presentation
- `outstanding paper`: Outstanding paper award
- `poster`: Poster presentation (default)

## 🎨 Customization

### Color Scheme
Main brand colors defined in `css/main.css`:
```css
--primary-color: #ff6b35;    /* Orange accent */
--text-primary: #333;        /* Dark gray text */
--text-secondary: #666;      /* Medium gray */
--background: #fff;          /* White background */
--background-alt: #f9f9f9;   /* Light gray sections */
```

### Layout Customization
- **Homepage Hero**: Edit the intro text and research areas in `index.html`
- **Navigation**: Update menu items in all HTML files
- **Footer**: Modify contact information and links

### Adding New Pages
1. Create HTML file in `pages/` directory
2. Copy navigation structure from existing pages
3. Use `../` prefix for assets (CSS, JS, images)
4. Add navigation link to all pages
5. Update JavaScript if dynamic content needed

## 🔧 Development Guidelines

### File Organization
- **HTML**: Semantic structure with proper accessibility
- **CSS**: Component-based organization with clear comments
- **JavaScript**: Modern ES6+ with error handling
- **Assets**: Optimized images, prefer SVG for icons

### Code Standards
- **Indentation**: 2 spaces for HTML, CSS, JavaScript
- **Naming**: kebab-case for files, camelCase for JavaScript
- **Comments**: Clear documentation for complex functionality
- **Responsive**: Mobile-first design approach

### Performance Tips
- **Images**: Optimize before adding to `assets/images/`
- **SVG**: Use for logos and simple graphics
- **JavaScript**: Keep minimal, avoid large libraries
- **Caching**: Leverage browser caching for static assets

## 🛠️ Technical Details

### JSON Data Management
The `DataManager` class provides:
- **Caching**: Prevents redundant API calls
- **Path Resolution**: Works from root and subdirectories
- **Error Handling**: Fallback data when JSON fails
- **Utility Functions**: Date formatting, filtering, searching

### Publications Features
- **Dynamic Filtering**: Multi-dimensional filtering system
- **Search Functionality**: Real-time search across all fields
- **Responsive UI**: Grid layout adapts to screen size
- **Loading States**: User feedback during data loading

### News System
- **Progressive Loading**: Load more functionality
- **Category Styling**: Visual distinction by news type
- **Date Formatting**: Consistent date display
- **HTML Support**: Rich text formatting in content

## 🐛 Troubleshooting

### Common Issues

**Publications not loading:**
- Check browser console for JavaScript errors
- Verify `data/publications.json` is valid JSON
- Ensure file paths use correct relative paths

**Images not displaying:**
- Check file paths (use `../` from pages directory)
- Verify image files exist in `assets/` directory
- Check browser console for 404 errors

**Styling issues:**
- Verify CSS file is loading correctly
- Check for CSS syntax errors
- Test on different browsers and devices

**Mobile menu not working:**
- Ensure JavaScript files are loading
- Check for JavaScript errors in console
- Verify navigation structure is correct

### File Path Reference
From different locations:
```
index.html → assets/images/logo.png
pages/publications.html → ../assets/images/logo.png
pages/publications.html → ../data/publications.json
pages/publications.html → ../css/main.css
```

### Validation
- **HTML**: Use W3C Markup Validator
- **CSS**: Use W3C CSS Validator
- **JSON**: Use JSONLint for data files
- **JavaScript**: Check browser console for errors

## 📄 License

This website template is open source. Customize it for your research lab's needs while maintaining appropriate attribution.
