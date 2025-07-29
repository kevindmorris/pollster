package com.example.api.model;

import java.time.Instant;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "polls")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Poll {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String question;

    @CreationTimestamp
    private Instant createdOn;

    @Builder.Default
    @Column(columnDefinition = "integer default 0")
    private Integer numYes = 0;

    @Builder.Default
    @Column(columnDefinition = "integer default 0")
    private Integer numNo = 0;

    public void yes() {
        this.numYes++;
    }

    public void no() {
        this.numNo++;
    }

}