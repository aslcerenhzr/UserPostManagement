import { Injectable } from '@nestjs/common';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  private posts: Post[] = [
    {
      id: 1,
      userId: 1,
      title: 'The Future of Artificial Intelligence',
    },
    {
      id: 2,
      userId: 1,
      title: 'Climate Change and Renewable Energy',
    },
    {
      id: 3,
      userId: 2,
      title: 'Space Exploration and Mars Missions',
    },
    {
      id: 4,
      userId: 2,
      title: 'Healthy Living and Nutrition Tips',
    },
    {
      id: 5,
      userId: 3,
      title: 'Digital Photography Techniques',
    },
    {
      id: 6,
      userId: 3,
      title: 'Travel Destinations Around the World',
    },
    {
      id: 7,
      userId: 4,
      title: 'Music Production and Sound Design',
    },
    {
      id: 8,
      userId: 4,
      title: 'Sustainable Fashion Trends',
    },
    {
      id: 9,
      userId: 5,
      title: 'Mental Health and Wellness',
    },
    {
      id: 10,
      userId: 5,
      title: 'Cooking and Culinary Arts',
    },
    {
      id: 11,
      userId: 6,
      title: 'Sports and Fitness Training',
    },
    {
      id: 12,
      userId: 6,
      title: 'Art and Creative Expression',
    },
    {
      id: 13,
      userId: 7,
      title: 'Technology and Innovation',
    },
    {
      id: 14,
      userId: 7,
      title: 'Environmental Conservation',
    },
    {
      id: 15,
      userId: 8,
      title: 'Education and Learning Methods',
    },
    {
      id: 16,
      userId: 8,
      title: 'Business and Entrepreneurship',
    },
    {
      id: 17,
      userId: 9,
      title: 'History and Ancient Civilizations',
    },
    {
      id: 18,
      userId: 9,
      title: 'Psychology and Human Behavior',
    },
    {
      id: 19,
      userId: 10,
      title: 'Science and Research Discoveries',
    },
    {
      id: 20,
      userId: 10,
      title: 'Social Media and Digital Culture',
    },
  ];

  create(createPostDto: CreatePostDto): Post {
    const newPost: Post = {
      id: Math.max(...this.posts.map(p => p.id)) + 1,
      ...createPostDto,
    };
    this.posts.push(newPost);
    return newPost;
  }

  findAll(): Post[] {
    return this.posts;
  }

  findOne(id: number): Post {
    return this.posts.find(post => post.id === id);
  }

  findByUserId(userId: number): Post[] {
    return this.posts.filter(post => post.userId === userId);
  }

  update(id: number, updatePostDto: UpdatePostDto): Post {
    const postIndex = this.posts.findIndex(post => post.id === id);
    if (postIndex === -1) {
      return null;
    }
    
    this.posts[postIndex] = {
      ...this.posts[postIndex],
      ...updatePostDto,
    };
    
    return this.posts[postIndex];
  }

  remove(id: number): boolean {
    const postIndex = this.posts.findIndex(post => post.id === id);
    if (postIndex === -1) {
      return false;
    }
    
    this.posts.splice(postIndex, 1);
    return true;
  }
}
