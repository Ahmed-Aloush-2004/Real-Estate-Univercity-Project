// src/common/pipes/parse-location.pipe.ts

import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform,
  } from '@nestjs/common';
  
  @Injectable()
  export class ParseLocationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        console.log("value",value.location);
        console.log("metadata",metadata); 
        
      if (!value?.location) return value;
  
      if (typeof value.location === 'string') {
        try {
          value.location = JSON.parse(value.location); 
        } catch (err) {
          throw new BadRequestException('Invalid JSON string for location');
        }
      }
  
      if (typeof value.location !== 'object' || Array.isArray(value.location)) {
        throw new BadRequestException(
          'Location must be a valid object, not an array or string',
        );
      }
  
      return value;
    }
  }
  