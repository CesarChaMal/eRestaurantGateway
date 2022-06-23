package com.erestaurant.gateway.service.mapper;

import com.erestaurant.gateway.domain.Profile;
import com.erestaurant.gateway.service.dto.ProfileDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Profile} and its DTO {@link ProfileDTO}.
 */
@Mapper(componentModel = "spring")
public interface ProfileMapper extends EntityMapper<ProfileDTO, Profile> {}
