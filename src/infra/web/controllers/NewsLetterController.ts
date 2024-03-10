import { Controller, Post } from '@nestjs/common';

@Controller('news-letter')
export class NewsLetterController {

    constructor(){}
    
    @Post('/subscribe')
    async subscribe(){

    }

}