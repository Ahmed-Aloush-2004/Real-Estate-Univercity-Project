import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';
import { BlogPhoto } from './entities/blog-photo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OfficeService } from 'src/office/office.service';
import { Office } from 'src/office/entities/office.entity';

@Injectable()
export class BlogService {

  constructor(@InjectRepository(Blog)
    private readonly blogRepository:Repository<Blog> ,
    private readonly officeService: OfficeService,
  ){}

  async createBlog (userId:string , createBlogDto: CreateBlogDto) {
    let blog : Blog | null= null;

    const office: Office  = await this.officeService.getMyOffice(userId);

    try {
      blog = await this.blogRepository.findOne({
            where: {
                title: createBlogDto.title,
            }
        })
    } catch (error) {
        throw new RequestTimeoutException('Unable to process your request at the moment please try later.', {
            description: 'Error Connecting to the database'
        })
    }
    if (blog) {
        throw new BadRequestException('A blog with this title already exist, please choose another title. ')
    }
    blog = this.blogRepository.create({
        office: office,
        title: createBlogDto.title,
        intro: createBlogDto.intro,
        content: createBlogDto.content
    });
    try {
        await this.blogRepository.save(blog);
    } catch (error) {
        throw new InternalServerErrorException (error, {
            description: 'Something happen when we were connecting with the DB'
        })
    }
    return blog;
    
  }

  async findAllOfficeBlogs(userId: string) {
    
    const office: Office  = await this.officeService.getMyOffice(userId);

    const {id} = office;

    const blogs = await this.blogRepository.find({
      where: {
        office: {id: id}
      }
    });

    if(blogs.length === 0)
      throw new NotFoundException({message: "You haven't post any blogs yet"});

    return blogs;
  }

  async findOneOfficeBlog(userId: string , blogId: string) {
    
    const office: Office = await this.officeService.getMyOffice(userId);
    
    const {id} = office;

    const blog = await this.blogRepository.findOne({
      where: {
        office: {id: id} , 
        id: blogId
      }
    })

    if(!blog)
      throw new NotFoundException({message: "You haven't post any blogs yet"});

    return blog;
  }

  async updateBlog (userId: string , blogId: string, updateBlogDto: UpdateBlogDto): Promise<Blog> {
    let blog = await this.findOneOfficeBlog(userId , blogId);

    if (updateBlogDto.title) {
      const existing = await this.blogRepository.findOne({
        where: { title: updateBlogDto.title }
      });
      if (existing && existing.id !== blog.id) {
        throw new BadRequestException('Another blog already uses this title.');
      }
    }
    
    Object.entries(updateBlogDto).forEach(([key, value]) => {
      if (value !== undefined) blog[key] = value;
    });

    

    return await this.blogRepository.save(blog);
  }

  async deleteBlogOfOffice(userId: string , blogId: string): Promise<void> {
    let blog = await this.findOneOfficeBlog(userId , blogId);
  
    await this.blogRepository.delete(blog.id);
  }
    
}
