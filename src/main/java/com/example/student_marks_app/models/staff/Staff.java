package com.example.student_marks_app.models.staff;

import com.example.student_marks_app.models.person.Person;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Staff extends Person {
  
  @Id
  private String staffNum;

  private String position;

  public Staff() {
    super("", "", "", "", "");
  }

  public Staff(String name, String surname,String id, String cellphone,String staffNum, String position) {
    super(name, surname, id, cellphone, staffNum);
    this.staffNum = staffNum;
    this.position = position;
  }

  public String getStaffNum() {
    return staffNum;
  }

  public String getPosition() {
    return position;
  }

  public void setPosition(String position) {
    this.position = position;
  }
  
  
}
