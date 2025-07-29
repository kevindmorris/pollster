package com.example.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.api.model.Poll;

public interface PollRepository extends JpaRepository<Poll, Long> {
}
