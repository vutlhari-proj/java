package com.example.student_marks_app.models.person;

import java.time.LocalDate;

import jakarta.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class Person {

    protected String name;
    protected String surname;
    protected String idNum;
    protected String cellphone;

    protected LocalDate dob;
    protected String email;

    public Person(String name, String surname, String idNum, String cellphone, String seq) {
        this.name = name;
        this.surname = surname;
        this.cellphone = cellphone;

        setEmail(seq);
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

    public String getIdNum() {
        return idNum;
    }

    public void setIdNum(String idNum) {
        this.idNum = idNum;
    }

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public void setCellphone(String cellphone) {
        this.cellphone = cellphone;
    }

    public void setEmail(String seq) {
        this.email = seq + "@tut4life.ac.za";
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public void setDob(String id) {
        this.dob = LocalDate.of(Integer.parseInt(id.substring(0, 1)),
                Integer.parseInt(id.substring(2, 3)),
                Integer.parseInt(id.substring(4, 5)));
    }
}
