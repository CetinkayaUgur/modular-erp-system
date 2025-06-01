package com.cancikrikci.app.finance.mapper;

import com.cancikrikci.app.finance.dto.BudgetDTO;
import com.cancikrikci.app.finance.entity.Budget;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-05-29T23:00:31+0300",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 19 (Oracle Corporation)"
)
@Component
public class BudgetImpl implements IBudgetMapper {

    @Override
    public BudgetDTO toBudgetDTO(Budget budget) {
        if ( budget == null ) {
            return null;
        }

        BudgetDTO budgetDTO = new BudgetDTO();

        budgetDTO.total = budget.total;

        return budgetDTO;
    }
}
