import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from '../property.entity';
import { FilterPropertyDto } from '../dtos/filter-property.dto';
import { PaginatedResponse } from '../../common/interfaces/response.interface';

@Injectable()
export class GetPropertiesWithFilterAndPaginationProvider {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
  ) {}

  public async getPropertiesWithFilterAndPagination(
    filterDto: FilterPropertyDto,
  ): Promise<PaginatedResponse<Property[]>> {
    try {
      const {
        type,
        operation,
        minPrice,
        maxPrice,
        minSpace,
        maxSpace,
        page = 1,
        limit = 10,
      } = filterDto;
      console.log(filterDto);
      

      const query = this.propertyRepository.createQueryBuilder('property')
        .leftJoinAndSelect('property.location', 'location')
        .leftJoinAndSelect('property.photos', 'photos')
        .leftJoinAndSelect('property.office', 'office');

      if (type) {
        query.andWhere('property.type = :type', { type });
      }

      if (operation) {
        query.andWhere('property.operation = :operation', { operation });
      }

      if (minPrice !== undefined) {
        query.andWhere('property.price >= :minPrice', { minPrice });
      }

      if (maxPrice !== undefined) {
        query.andWhere('property.price <= :maxPrice', { maxPrice });
      }

      if (minSpace !== undefined) {
        query.andWhere('property.space >= :minSpace', { minSpace });
      }

      if (maxSpace !== undefined) {
        query.andWhere('property.space <= :maxSpace', { maxSpace });
      }

      const [data, total] = await query
        .skip((page - 1) * limit)
        .take(limit)
        .orderBy('property.rating', 'DESC') // i should add something here 
        .getManyAndCount();

      return {
        success: true,
        message: 'Properties fetched successfully',
        data,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      console.error('Error fetching properties:', error);
      throw new InternalServerErrorException('Failed to fetch properties');
    }
  }
}
