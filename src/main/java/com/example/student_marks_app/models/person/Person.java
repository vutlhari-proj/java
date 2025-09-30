package com.example.student_marks_app.models.person;

public abstract class Person {
  
  String name;
  String surname;
  String cellphone;
  String email;

  public Person(String name, String surname, String cellphone, String email) {
    this.name = name;
    this.surname = surname;
    this.cellphone = cellphone;
    this.email = email;
  }

  public String getName() {
    return name;
  }
  
  public String getSurname() {
    return surname;
  }

  public String getCellphone() {
    return cellphone;
  }

  public String getEmail() {
    return email;
  }

  public void setCellphone(String cellphone) {
    this.cellphone = cellphone;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setSurname(String surname) {
    this.surname = surname;
  }
}
