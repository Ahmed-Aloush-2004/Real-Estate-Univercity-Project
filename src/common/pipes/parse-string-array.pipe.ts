import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class ParseStringArrayPipe implements PipeTransform {
  constructor(private readonly field: string) {}

  transform(value: any) {
    if (value && value[this.field]) {
      try {
        const parsed = JSON.parse(value[this.field]);
        value[this.field] = Array.isArray(parsed) ? parsed : [];
      } catch (error) {
        value[this.field] = [];
      }
    }
    return value;
  }
}