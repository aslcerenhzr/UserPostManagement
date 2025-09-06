import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostsService {
    private posts;
    create(createPostDto: CreatePostDto): Post;
    findAll(): Post[];
    findOne(id: number): Post;
    findByUserId(userId: number): Post[];
    update(id: number, updatePostDto: UpdatePostDto): Post;
    remove(id: number): boolean;
}
