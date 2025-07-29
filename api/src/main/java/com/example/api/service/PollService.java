package com.example.api.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.api.dto.PollDto;
import com.example.api.model.Poll;
import com.example.api.repository.PollRepository;

@Service
public class PollService {

    @Autowired
    private PollRepository pollRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    /**
     * Create a new poll.
     */
    public Poll createPoll(String question) {
        Poll poll = Poll.builder()
                .question(question)
                .build();
        return pollRepository.save(poll);
    }

    /**
     * Get a poll by ID.
     */
    public Optional<Poll> getPollById(Long id) {
        return pollRepository.findById(id);
    }

    /**
     * Get all polls.
     */
    public List<Poll> getAllPolls() {
        return pollRepository.findAll();
    }

    /**
     * Increment yes votes for a poll.
     */
    @Transactional
    public Optional<Poll> voteYes(Long pollId) {
        return pollRepository.findById(pollId).map(poll -> {
            poll.yes();
            Poll saved = pollRepository.save(poll);
            messagingTemplate.convertAndSend("/topic/poll/" + pollId, PollDto.fromEntity(saved));
            return saved;
        });
    }

    /**
     * Increment no votes for a poll.
     */
    @Transactional
    public Optional<Poll> voteNo(Long pollId) {
        return pollRepository.findById(pollId).map(poll -> {
            poll.no();
            Poll saved = pollRepository.save(poll);
            messagingTemplate.convertAndSend("/topic/poll/" + pollId, PollDto.fromEntity(saved));
            return saved;
        });
    }

    /**
     * Delete a poll by id.
     */
    public void deletePoll(Long pollId) {
        pollRepository.deleteById(pollId);
    }

    /**
     * Delete all polls.
     */
    public void deletePolls() {
        pollRepository.deleteAll();
    }
}
