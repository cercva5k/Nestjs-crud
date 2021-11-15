import { EntityRepository, Repository } from 'typeorm';
import { createPostDto } from './dto/create-post.dto';
import { GetPostsFilterDto } from './dto/get-posts-filter.dto';
import { Post } from './post.entity';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  async getPosts(filterDto: GetPostsFilterDto): Promise<Post[]> {
    const { search } = filterDto;

    const query = this.createQueryBuilder('post');

    if(search) {
        query.andWhere(
            'post.title LIKE :search OR post.description LIKE :search',
            { search: `%${search}%` },
        );
    }

    const posts = await query.getMany();

    return posts;
  }

  async createPost(createPostDto: createPostDto): Promise<Post> {
    const { title, description } = createPostDto;

    const post = this.create({
      title,
      description,
    });

    await this.save(post);

    return post;
  }
}
