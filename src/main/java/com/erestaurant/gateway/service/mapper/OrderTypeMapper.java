package com.erestaurant.gateway.service.mapper;

import com.erestaurant.gateway.domain.OrderType;
import com.erestaurant.gateway.service.dto.OrderTypeDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link OrderType} and its DTO {@link OrderTypeDTO}.
 */
@Mapper(componentModel = "spring")
public interface OrderTypeMapper extends EntityMapper<OrderTypeDTO, OrderType> {}
