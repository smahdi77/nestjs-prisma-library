import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { PrismaService } from 'prisma-database/prisma.service';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [BooksController],
  providers: [BooksService, PrismaService, UsersService],
})
export class BooksModule {}
