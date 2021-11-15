import { PostStatus } from "../posts.model";

export class GetPostsFilterDto {
    status?: PostStatus;
    search?: string;
}