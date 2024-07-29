import multer from 'multer';
import fs from 'fs/promises';
import path from 'path';

// Set up multer
const storage = multer.diskStorage({
    destination: 'public/image/qrgen',
    filename: (req, file, callback) => {
        const originalName = file.originalname;
        const sanitizedFileName = originalName.replace(/\s+/g, '-'); // Replace spaces with dashes
        callback(null, sanitizedFileName);
    },
});

const upload = multer({ storage: storage });

export const config = {
    api: {
        bodyParser: false,
    },
};

// Middleware to handle file upload
export default upload.single('file');

export const post = async (req, res) => {
    const { file } = req;
    const publicPath = path.join(
        process.cwd(),
        'public',
        'image',
        'qrgen',
        file.filename, // Use the updated filename
    );
    try {
        await fs.rename(file.path, publicPath);
        res.status(200).json({ message: 'File uploaded successfully' });
    } catch (error) {
        console.error('Error moving file to public folder', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
