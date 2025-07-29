package com.example.api.controller;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.api.dto.PollDto;
import com.example.api.model.Poll;
import com.example.api.service.PollService;

@RestController
@RequestMapping("/api/polls")
public class PollController {

    @Autowired
    private PollService pollService;

    @GetMapping
    public ResponseEntity<List<PollDto>> getAllPolls() {
        List<PollDto> polls = pollService.getAllPolls().stream()
                .map(PollDto::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(polls);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PollDto> getPollById(@PathVariable Long id) {
        return pollService.getPollById(id)
                .map(PollDto::fromEntity)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<PollDto> createPoll(@RequestBody PollDto pollDto) {
        Poll created = pollService.createPoll(pollDto.getQuestion());
        return ResponseEntity.created(URI.create("/api/polls/" + created.getId()))
                .body(PollDto.fromEntity(created));
    }

    @PostMapping("/{id}/yes")
    public ResponseEntity<PollDto> voteYes(@PathVariable Long id) {
        return pollService.voteYes(id)
                .map(PollDto::fromEntity)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/no")
    public ResponseEntity<PollDto> voteNo(@PathVariable Long id) {
        return pollService.voteNo(id)
                .map(PollDto::fromEntity)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping
    public ResponseEntity<Void> deletePolls() {
        pollService.deletePolls();
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePoll(@PathVariable Long id) {
        pollService.deletePoll(id);
        return ResponseEntity.noContent().build();
    }
}
