package com.example.student_marks_app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.student_marks_app.sequences.global_sequence.GlobalSequence;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.Lock;



@Repository
public interface GlobalSequenceRepository extends JpaRepository<GlobalSequence, String> {
  
  @Lock(LockModeType.PESSIMISTIC_WRITE)
  GlobalSequence findByYearKey(String yearKey);
}
