import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Prisma, Role } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() bookData: CreateBookDto, @Req() req: any) {
    const user_id = req.user.userId;
    return this.booksService.create(bookData, user_id);
  }

  @Post('/topic')
  @UseGuards(JwtAuthGuard)
  createTopic(@Body() topicData: Prisma.BookTopicCreateInput) {
    return this.booksService.createTopic(topicData);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findAll() {
    return this.booksService.findAll();
  }

  @Get('/mybooks')
  @UseGuards(JwtAuthGuard)
  findMyBooks(@Req() req: any) {
    const user_id = req.user.userId;
    return this.booksService.findMyBooks(user_id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
