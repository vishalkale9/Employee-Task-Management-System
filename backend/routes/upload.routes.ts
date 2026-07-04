import { Router } from 'express';
import { upload } from '../middlewares/upload.middleware.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/', protect, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const filePath = `/uploads/${req.file.filename}`;
  res.json({ message: 'File uploaded successfully', path: filePath });
});

export default router;
