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
        property_type,
        property_selling_type,
        minPrice,
        maxPrice,
        minArea,
        maxArea,
        // realEstateOfficeId,
        page = 1,
        limit = 10,
      } = filterDto;

      const query = this.propertyRepository.createQueryBuilder('property')
        .leftJoinAndSelect('property.location', 'location')
        .leftJoinAndSelect('property.photos', 'photos')
        .leftJoinAndSelect('property.realEstateOffice', 'realEstateOffice');

      if (property_type) {
        query.andWhere('property.property_type = :property_type', { property_type });
      }

      if (property_selling_type) {
        query.andWhere('property.property_selling_type = :property_selling_type', { property_selling_type });
      }

      if (minPrice !== undefined) {
        query.andWhere('property.price >= :minPrice', { minPrice });
      }

      if (maxPrice !== undefined) {
        query.andWhere('property.price <= :maxPrice', { maxPrice });
      }

      if (minArea !== undefined) {
        query.andWhere('property.area >= :minArea', { minArea });
      }

      if (maxArea !== undefined) {
        query.andWhere('property.area <= :maxArea', { maxArea });
      }

    //   if (realEstateOfficeId) {
    //     query.andWhere('realEstateOffice.id = :realEstateOfficeId', { realEstateOfficeId });
    //   }

      const [data, total] = await query
        .skip((page - 1) * limit)
        .take(limit)
        .orderBy('property.createdAt', 'DESC')
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
