import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'prisma-database/prisma.service';
import { UsersService } from 'src/users/users.service';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class BooksService {
  constructor(
    private prisma: PrismaService,
    private userService: UsersService,
  ) {}

  async create(data: CreateBookDto, user_id: number) {
    const {
      title,
      writer,
      translator,
      price,
      publisher,
      ISBN,
      editor,
      topicId,
    } = data;
    const new_book = await this.prisma.book.create({
      data: {
        title,
        writer,
        translator,
        price,
        publisher,
        ISBN,
        editor,
        topic: {
          connect: {
            id: topicId,
          },
        },
      },
    });
    return this.prisma.booksOfUsers.create({
      data: {
        userId: user_id,
        bookId: new_book.id,
      },
    });
  }

  async createTopic(data: Prisma.BookTopicCreateInput) {
    return this.prisma.bookTopic.create({ data });
  }

  findAll() {
    return this.prisma.book.findMany();
  }

  findOne(id: number) {
    return this.prisma.book.findUnique({ where: { id } });
  }

  async findMyBooks(id: number) {
    const user_books = await this.userService.findOne(id).books();
    let mybooks = {};
    await Promise.all(
      user_books.map(async (book) => {
        let mybook = await this.findOne(book.bookId);
        mybooks[book.bookId] = mybook;
      }),
    );
    return mybooks;
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    let update = await this.prisma.book.update({where: {id}, data: updateBookDto})
    if (!update)
      throw new HttpException("data is wrong",HttpStatus.INTERNAL_SERVER_ERROR)
    else
      return update
  }

  async remove(id: number) {
    await this.prisma.booksOfUsers.deleteMany({where: {bookId: id}})
    const remove = await this.prisma.book.delete({where: {id}});
    return (remove) ? remove: new HttpException("error", 400);
  }
}
