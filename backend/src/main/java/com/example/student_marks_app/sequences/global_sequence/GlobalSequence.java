package com.example.student_marks_app.sequences.global_sequence;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class GlobalSequence {
  
  @Id
  private String yearKey;
  // Change from 'lastValue' to 'sequenceValue'
  private long sequenceValue;

  public GlobalSequence() {
  }


  public String getYearKey() {
    return yearKey;
  }

  public long getSequenceValue() {
    return sequenceValue;
  }

  public void setSequenceValue(long sequenceValue) {
    this.sequenceValue = sequenceValue;
  }

  public void setYearKey(String yearKey) {
    this.yearKey = yearKey;
  }
}
