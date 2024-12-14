import multer, { FileFilterCallback } from 'multer';
import { Router ,Request} from "express";
const storage = multer.memoryStorage();
export const upload = multer({ 
  storage: storage,
  fileFilter: (
    req: Request, 
    file: Express.Multer.File, 
    cb: FileFilterCallback
  ) => {
    console.log("file")
    console.log(file)
    if (file.fieldname === 'profilePicture' || file.fieldname === 'uploads') {
    console.log("inside")

      if (file.mimetype.startsWith('image/')) {
        
        cb(null, true);
      } else {
        cb(null, false);
      console.log("else first")

      }
    } else {
      console.log("else last")
      cb(null, true);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB file size limit
  }
});