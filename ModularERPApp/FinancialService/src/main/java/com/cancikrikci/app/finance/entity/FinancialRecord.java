package com.cancikrikci.app.finance.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "financial_records")
public class FinancialRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "record_id")
    public int id;

    @Column(name = "date")
    @JsonFormat(pattern = "dd/MM/yyyy")
    public LocalDate date;

    @Column(name = "amount", nullable = false)
    public BigDecimal amount;

    @Column(name = "type", nullable = false, length = 10)
    @Enumerated(EnumType.STRING)
    public FinancialRecordType type;

    @Column(name = "source_type", length = 50)
    public String sourceType;

    @Column(name = "source_id")
    public Integer sourceId;

    @Column(name = "description")
    public String description;
}