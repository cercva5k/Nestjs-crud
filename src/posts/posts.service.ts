import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { PostModel, PostStatus } from './posts.model';
import { v4 as id } from 'uuid';
import { createPostDto } from './dto/create-post.dto';
import { GetPostsFilterDto } from './dto/get-posts-filter.dto';
import { PostRepository } from './post.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostsService {

    constructor(
        @InjectRepository(PostRepository)
        private postRepository: PostRepository
    ) {}

    getPosts(@Query() filterDto: GetPostsFilterDto): Promise<Post[]> {
        return this.postRepository.getPosts(filterDto);
    }


    async getPostById(id: string): Promise<Post> {
        const found = await this.postRepository.findOne(id);

        if(!found) {
            throw new NotFoundException();
        }

        return found;
    }

    createPost(createPostDto: createPostDto): Promise<Post> {
        return this.postRepository.createPost(createPostDto);
    }


    async deletePost(id: string): Promise<void> {
        const result = await this.postRepository.delete(id);


        if(result.affected === 0) {
            throw new NotFoundException(`Post with id "${id}" not found!`)
        }
    }

    async updatePost(id: string, updatePostDto: createPostDto): Promise<Post> {
        const post = await this.getPostById(id);

        post.title = updatePostDto.title;
        post.description = updatePostDto.description;

        await this.postRepository.save(post);

        return post;
    }
}
