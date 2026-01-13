const express = require('express');
const path = require('path');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable gzip compression
app.use(compression());

// Serve static files with cache headers
app.use(express.static(path.join(__dirname, 'build'), {
  etag: true,
  lastModified: true,
  setHeaders: (res, filePath) => {
    // Cache static assets (JS, CSS, images) for 1 year
    if (filePath.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
    // Cache HTML files for 5 minutes (to allow updates)
    else if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'public, max-age=300, must-revalidate');
    }
    // Cache JSON files for 1 hour
    else if (filePath.endsWith('.json')) {
      res.setHeader('Cache-Control', 'public, max-age=3600');
    }
  }
}));

// Handle client-side routing - serve index.html for all non-static routes
app.get('*', (req, res) => {
  res.setHeader('Cache-Control', 'public, max-age=300, must-revalidate');
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

