package com.erestaurant.gateway.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.erestaurant.gateway.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class OrderTypeDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(OrderTypeDTO.class);
        OrderTypeDTO orderTypeDTO1 = new OrderTypeDTO();
        orderTypeDTO1.setId("id1");
        OrderTypeDTO orderTypeDTO2 = new OrderTypeDTO();
        assertThat(orderTypeDTO1).isNotEqualTo(orderTypeDTO2);
        orderTypeDTO2.setId(orderTypeDTO1.getId());
        assertThat(orderTypeDTO1).isEqualTo(orderTypeDTO2);
        orderTypeDTO2.setId("id2");
        assertThat(orderTypeDTO1).isNotEqualTo(orderTypeDTO2);
        orderTypeDTO1.setId(null);
        assertThat(orderTypeDTO1).isNotEqualTo(orderTypeDTO2);
    }
}
