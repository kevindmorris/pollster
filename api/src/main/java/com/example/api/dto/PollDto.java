package com.example.api.dto;

import java.time.Instant;

import com.example.api.model.Poll;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PollDto {
    private Long id;
    private String question;
    private Instant createdOn;
    private Integer numYes;
    private Integer numNo;

    // Converts Poll entity to PollDto
    public static PollDto fromEntity(Poll poll) {
        if (poll == null) {
            return null;
        }
        return PollDto.builder()
                .id(poll.getId())
                .question(poll.getQuestion())
                .createdOn(poll.getCreatedOn())
                .numYes(poll.getNumYes())
                .numNo(poll.getNumNo())
                .build();
    }

    // Converts PollDto to Poll entity
    public static Poll toEntity(PollDto dto) {
        if (dto == null) {
            return null;
        }
        return Poll.builder()
                .id(dto.getId())
                .question(dto.getQuestion())
                .createdOn(dto.getCreatedOn())
                .numYes(dto.getNumYes() != null ? dto.getNumYes() : 0)
                .numNo(dto.getNumNo() != null ? dto.getNumNo() : 0)
                .build();
    }
}
