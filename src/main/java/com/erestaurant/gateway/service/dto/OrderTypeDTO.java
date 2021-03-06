package com.erestaurant.gateway.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.erestaurant.gateway.domain.OrderType} entity.
 */
public class OrderTypeDTO implements Serializable {

    @NotNull(message = "must not be null")
    @Size(min = 5)
    private String id;

    @Lob
    private String description;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof OrderTypeDTO)) {
            return false;
        }

        OrderTypeDTO orderTypeDTO = (OrderTypeDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, orderTypeDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "OrderTypeDTO{" +
            "id='" + getId() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
