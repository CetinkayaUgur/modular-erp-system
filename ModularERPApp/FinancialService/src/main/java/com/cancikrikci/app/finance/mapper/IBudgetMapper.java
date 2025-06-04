package com.cancikrikci.app.finance.mapper;

import com.cancikrikci.app.finance.dto.BudgetDTO;
import com.cancikrikci.app.finance.entity.Budget;
import org.mapstruct.Mapper;

@Mapper(implementationName = "BudgetImpl", componentModel = "spring")

public interface IBudgetMapper {
    BudgetDTO toBudgetDTO(Budget budget);
}
