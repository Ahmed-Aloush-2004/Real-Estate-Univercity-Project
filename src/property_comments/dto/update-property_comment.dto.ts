import { PartialType } from '@nestjs/swagger';
import { CreatePropertyCommentDto } from './create-property_comment.dto';

export class UpdatePropertyCommentDto extends PartialType(CreatePropertyCommentDto) {}
