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

    public Person(String name, String surname, String idNum, String cellphone, String email) {
        this.name = name;
        this.surname = surname;
        this.idNum = idNum;
        this.cellphone = cellphone;
        this.email = email; 
        
        setDob(idNum);
    }

    private void setDob(String id) {
        if (id == null || id.length() < 6) {
            this.dob = null;
            return;
        }
        int year = Integer.parseInt(id.substring(0, 2));
        int month = Integer.parseInt(id.substring(2, 4));
        int day = Integer.parseInt(id.substring(4, 6));
        year += (year >= 50) ? 1900 : 2000;
        this.dob = LocalDate.of(year, month, day);
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

}
