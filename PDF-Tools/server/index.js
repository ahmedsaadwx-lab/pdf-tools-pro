const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

// Health
app.get('/api/health', (req, res) => res.json({ ok: true }));

// Upload endpoint (placeholder)
app.post('/api/upload', upload.single('file'), (req, res) => {
  res.json({ uploaded: true, file: req.file });
});

// TODO: implement merge/compress/auth endpoints

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
