import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: 'article title',
    length: 50,
  })
  title: string;

  @Column({
    comment: 'article content',
    type: 'text',
  })
  content: string;

  @Column({
    comment: 'view count',
    default: 0,
  })
  viewCount: number;

  @Column({
    comment: 'like count',
    default: 0,
  })
  likeCount: number;

  @Column({
    comment: 'collect count',
    default: 0,
  })
  collectCount: number;
}
