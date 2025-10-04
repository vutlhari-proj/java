package com.example.student_marks_app.sequences.global_sequence;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.example.student_marks_app.repositories.GlobalSequenceRepository;

@Component
public class GlobalIdGenerator {
  
  private final GlobalSequenceRepository globalSequenceRepository;

  public GlobalIdGenerator(GlobalSequenceRepository globalSequenceRepository) {
    this.globalSequenceRepository = globalSequenceRepository;
  }

  @Transactional
  public String generateId(){
    String year = String.valueOf(java.time.Year.now().getValue()).substring(2);
    String yearKey = year;

    GlobalSequence globalSequence = globalSequenceRepository.findByYearKey(yearKey);
    if (globalSequence == null) {
        globalSequence = new GlobalSequence();
        globalSequence.setYearKey(yearKey);
        globalSequence.setSequenceValue(0L);
    }

    long newValue = globalSequence.getSequenceValue() + 1;
    globalSequence.setSequenceValue(newValue);
    globalSequenceRepository.save(globalSequence);

    return year + String.format("%07d", newValue);
  }
}
