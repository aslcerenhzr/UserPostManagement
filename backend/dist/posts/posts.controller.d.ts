import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    create(createPostDto: CreatePostDto): import("./entities/post.entity").Post;
    findAll(): import("./entities/post.entity").Post[];
    findByUserId(userId: number): import("./entities/post.entity").Post[];
    findOne(id: number): import("./entities/post.entity").Post;
    update(id: number, updatePostDto: UpdatePostDto): import("./entities/post.entity").Post;
    remove(id: number): boolean;
}
