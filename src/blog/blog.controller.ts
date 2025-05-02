import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { AccessRealEstateOfficeMethodsGuard } from 'src/auth/guards/access-real-estate-office-methods/access-real-estate-office-methods.guard';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Controller('/blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  @UseGuards(AccessRealEstateOfficeMethodsGuard )
  create(@ActiveUser() user:ActiveUserData , @Body() createBlogDto: CreateBlogDto) {
    return this.blogService.createBlog(user.sub , createBlogDto);
  }

  @Get()
  @UseGuards(AccessRealEstateOfficeMethodsGuard )
  findAllBlogs(@ActiveUser() user:ActiveUserData) {
    return this.blogService.findAllOfficeBlogs(user.sub);
  }

  @Get(':blogId')
  @UseGuards(AccessRealEstateOfficeMethodsGuard )
  findOne(@ActiveUser() user:ActiveUserData , @Param('blogId') blogId: string) {
    return this.blogService.findOneOfficeBlog(user.sub , blogId);
  }

  @Put(':blogId')
  @UseGuards(AccessRealEstateOfficeMethodsGuard )
  updateByOffice(
    @ActiveUser() user:ActiveUserData, @Param('blogId') blogId: string, @Body() updateBlogDto: UpdateBlogDto,
  ) {
    return this.blogService.updateBlog(user.sub, blogId, updateBlogDto);
  }


  @Delete(':blogId')
  @UseGuards(AccessRealEstateOfficeMethodsGuard )
  deleteByOffice(@ActiveUser() user:ActiveUserData, @Param('blogId') blogId: string) {
    return this.blogService.deleteBlogOfOffice(user.sub , blogId);
  }

}
