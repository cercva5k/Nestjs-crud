export interface PostModel {
    id: string;
    title: string;
    description: string;
    status: PostStatus;
}

export enum PostStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}