import { Controller, Post, UseInterceptors, UploadedFile, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileUploadDto } from '../dto/img-upload.dto';


// import { Response } from 'express';
// import { ImgUploadService } from '../service/img-upload.service';


@ApiTags('img-upload')
@Controller('img-upload')
export class ImgUploadController {

    // upload single file
    @Post()
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Загрузка файла',
        type: FileUploadDto,
    })

    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: 'dbase/tmp_img',
            filename: (req: any, file: any, cb: any) => {
                cb(null, `${file.originalname}`);
            }
        }),
    }))

    async uploadFile(@UploadedFile() file) {
        console.log(file);

        // const bfr = new Buffer(file.buffer.toString(), 'base64');
        const bfr = Buffer.from(file).toString('base64');

        console.log('base64', bfr);

        return await file;

        //     const response = {
        //         originalname: file.originalname,
        //         filename: file.filename,
        //         file: file,
        //     };

        //    return await {
        //         status: HttpStatus.OK,
        //         message: 'Image uploaded successfully',
        //         data: response,

        //     };




    }
}
