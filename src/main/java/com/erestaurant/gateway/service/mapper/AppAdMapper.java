package com.erestaurant.gateway.service.mapper;

import com.erestaurant.gateway.domain.AppAd;
import com.erestaurant.gateway.service.dto.AppAdDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link AppAd} and its DTO {@link AppAdDTO}.
 */
@Mapper(componentModel = "spring")
public interface AppAdMapper extends EntityMapper<AppAdDTO, AppAd> {}
