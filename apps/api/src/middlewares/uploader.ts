import path from 'path';
import multer from 'multer'
import { Request } from 'express';
type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error:Error | null, filename: string) => void

export const uploader = (filePrefix: string, foldername?:string) => {
    const defaultDir = path.join(__dirname, "../../public")
        
    const storage = multer.diskStorage({
        destination: (
            req:Request,
            file: Express.Multer.File,
            cb: DestinationCallback
        ) => {
            const destination = foldername? defaultDir + foldername:defaultDir;
            cb(null, destination)
        },

        filename: (
            req:Request,
            file:Express.Multer.File,
            cb: FileNameCallback
        ) => {
            const originalNameParts = file.originalname.split('.')
            const fileExtension = originalNameParts[originalNameParts.length - 1]
            const newFileName = filePrefix+Date.now() + '.' + fileExtension
            cb(null, newFileName)
        }
    })

    return multer({storage: storage})
}