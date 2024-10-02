export class CreateBookDto {
  title: string;
  writer: string;
  translator?: string;
  price: number;
  publisher?: string;
  ISBN?: string;
  editor?: string;
  topicId: number;
}
