const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

const app = express();
const port = 2354;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Storage configuration for Multer
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
});

// Initialize application list
const appsFilePath = path.join(__dirname, 'apps.json');

// Read apps list
const getApps = () => {
  if (fs.existsSync(appsFilePath)) {
    return JSON.parse(fs.readFileSync(appsFilePath, 'utf-8'));
  }
  return [];
};

// Save apps list
const saveApps = (apps) => {
  fs.writeFileSync(appsFilePath, JSON.stringify(apps, null, 2));
};

// Get list of apps
app.get('/apps', (req, res) => {
  res.json(getApps());
});

// Launch an application
app.post('/launch', (req, res) => {
  const { appName } = req.body;
  const apps = getApps();
  const app = apps.find(a => a.name === appName);

  if (app) {
    exec(`start "" "${app.path}"`, (err) => {
      if (err) {
        console.error('Error launching app:', err);
        res.status(500).send('Error launching app');
      } else {
        res.send('App launched');
      }
    });
  } else {
    res.status(404).send('App not found');
  }
});

// Quit an application
app.post('/quit', (req, res) => {
  const { appName } = req.body;
  // Implement app quitting logic as needed
  res.send('App quit');
});

// Add a new application
app.post('/add-app', upload.single('file'), (req, res) => {
  const file = req.file;
  const apps = getApps();

  if (file) {
    const newApp = {
      name: path.basename(file.originalname, path.extname(file.originalname)),
      path: path.join(__dirname, 'uploads', file.originalname),
    };
    apps.push(newApp);
    saveApps(apps);
    res.send('Application added successfully');
  } else {
    res.status(400).send('No file uploaded');
  }
});

// Remove an application
app.post('/remove-app', (req, res) => {
  const { appName } = req.body;
  let apps = getApps();
  apps = apps.filter(a => a.name !== appName);

  // Remove the app file from the uploads directory
  const appPath = path.join(__dirname, 'uploads', appName + path.extname(apps.find(a => a.name === appName)?.path || ''));
  if (fs.existsSync(appPath)) {
    fs.unlinkSync(appPath);
  }

  saveApps(apps);
  res.send('Application removed');
});

// Create uploads directory if it does not exist
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
