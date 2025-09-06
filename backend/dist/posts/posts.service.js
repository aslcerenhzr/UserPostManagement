"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
let PostsService = class PostsService {
    constructor() {
        this.posts = [
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
    }
    create(createPostDto) {
        const newPost = {
            id: Math.max(...this.posts.map(p => p.id)) + 1,
            ...createPostDto,
        };
        this.posts.push(newPost);
        return newPost;
    }
    findAll() {
        return this.posts;
    }
    findOne(id) {
        return this.posts.find(post => post.id === id);
    }
    findByUserId(userId) {
        return this.posts.filter(post => post.userId === userId);
    }
    update(id, updatePostDto) {
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
    remove(id) {
        const postIndex = this.posts.findIndex(post => post.id === id);
        if (postIndex === -1) {
            return false;
        }
        this.posts.splice(postIndex, 1);
        return true;
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)()
], PostsService);
//# sourceMappingURL=posts.service.js.map