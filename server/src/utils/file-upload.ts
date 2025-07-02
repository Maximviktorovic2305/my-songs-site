import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';

// Функция для обработки имени файла: возвращает оригинальное имя без изменений
export const editFileName = (
  req: any,
  file: Express.Multer.File,
  callback: (
    error: Error | null,
    filename: string,
    originalName: string,
  ) => void,
) => {
  const originalname = file.originalname;
  const filename = `${Date.now()}-${originalname}`;
  if (!req.fileOriginalNames) {
    req.fileOriginalNames = {};
  }
  req.fileOriginalNames[filename] = originalname;
  callback(null, filename, originalname);
};

const filenameWrapper = (
  req: any,
  file: Express.Multer.File,
  callback: (error: Error | null, filename: string) => void,
) => {
  editFileName(req, file, (error, filename, originalName) => {
    if (error) {
      return callback(error, '');
    }
    callback(null, filename);
  });
};

export const trackFileUploadOptions = {
  storage: diskStorage({
    destination: './uploads',
    filename: filenameWrapper,
  }),
  fileFilter: (
    req: any,
    file: Express.Multer.File,
    callback: (error: Error | null, acceptFile: boolean) => void,
  ) => {
    if (file.fieldname === 'image') {
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return callback(
          new BadRequestException('Разрешены только файлы изображений!'),
          false,
        );
      }
      callback(null, true);
    } else if (file.fieldname === 'audio') {
      if (!file.originalname.match(/\.(mp3|mpeg)$/i)) {
        return callback(
          new BadRequestException('Разрешены только аудиофайлы формата MP3!'),
          false,
        );
      }
      callback(null, true);
    } else {
      callback(new Error('Неожиданное имя поля файла!'), false);
    }
  },
  limits: {
    fileSize: 15 * 1024 * 1024,
  },
};
