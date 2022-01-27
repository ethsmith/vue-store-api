import { Response } from 'express';
export declare class UploadController {
    uploadFile(file: any): {
        url: string;
    };
    getImage(path: any, response: Response): Promise<void>;
}
