package com.example.student_marks_app.sequences.global_sequence;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class GlobalSequence {
  
  @Id
  private String yearKey;
  private long lastValue;

  public GlobalSequence() {
  }


  public String getYearKey() {
    return yearKey;
  }

  public long getLastValue() {
    return lastValue;
  }

  public void setLastValue(long lastValue) {
    this.lastValue = lastValue;
  }

  public void setYearKey(String yearKey) {
    this.yearKey = yearKey;
  }
}
