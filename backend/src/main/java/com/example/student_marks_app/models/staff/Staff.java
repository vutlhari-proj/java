package com.example.student_marks_app.models.staff;

import com.example.student_marks_app.dtos.StaffDTO;
import com.example.student_marks_app.models.person.Person;
import com.example.student_marks_app.models.user.Role;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;

@Entity
public class Staff extends Person {
  
  @Id
  private String staffNum;

  @Enumerated(EnumType.STRING)
  private Role position;

  public Staff() {
    super("", "", "", "", "");
  }

  public Staff(String name, String surname,String id, String cellphone, String email, String staffNum, Role position) {
    super(name, surname, id, cellphone, email);
    this.staffNum = staffNum;
    this.position = position;
  }

  public String getStaffNum() {
    return staffNum;
  }

  public Role getPosition() {
    return position;
  }

  public void setPosition(Role position) {
    this.position = position;
  }
  
  
  public StaffDTO toDTO() {
      return new StaffDTO(
          this.staffNum,
          this.name,
          this.surname,
          this.idNum,
          this.cellphone,
          this.email,
          this.position.name()
      );
  }
}
