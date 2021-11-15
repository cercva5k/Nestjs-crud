import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Put,
  Patch,
  Query,
} from '@nestjs/common';
import { createPostDto } from './dto/create-post.dto';
import { GetPostsFilterDto } from './dto/get-posts-filter.dto';
import { Post as PostEntity } from './post.entity';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  //   http://localhost:3000/posts
  @Get()
  getAllPosts(@Query() filterDto: GetPostsFilterDto): Promise<PostEntity[]> {
    return this.postsService.getPosts(filterDto);
  }

  // //   http://localhost:3000/posts/${id}
  @Get('/:id')
  getPostById(@Param('id') id: string): Promise<PostEntity> {
    return this.postsService.getPostById(id);
  }


  // //   http://localhost:3000/posts
  @Post()
  createPost(@Body() createPostDto: createPostDto): Promise<PostEntity> {
    return this.postsService.createPost(createPostDto);
  }

  // //   http://localhost:3000/posts/${id}
  @Delete('/:id')
  deletePost(@Param('id') id: string): Promise<void> {
    return this.postsService.deletePost(id);
  }

  // //   http://localhost:3000/posts/${id}
  @Patch('/:id')
  updatePost(
    @Param('id') id: string,
    @Body() updatePostDto: createPostDto,
  ): Promise<PostEntity> {
    return this.postsService.updatePost(id, updatePostDto);
  }
}
