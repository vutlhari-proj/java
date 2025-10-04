package com.example.student_marks_app.dtos;

public class StaffDTO {
    private String staffNum;
    private String name;
    private String surname;
    private String id;
    private String cellphone;
    private String email;
    private String position;

    public StaffDTO() {}

    public StaffDTO(String staffNum, String name, String surname, String id, String cellphone, String email, String position) {
        this.staffNum = staffNum;
        this.name = name;
        this.surname = surname;
        this.id = id;
        this.cellphone = cellphone;
        this.email = email;
        this.position = position;
    }

    public String getStaffNum() {
        return staffNum;
    }
    public void setStaffNum(String staffNum) {
        this.staffNum = staffNum;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getSurname() {
        return surname;
    }
    public void setSurname(String surname) {
        this.surname = surname;
    }
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getCellphone() {
        return cellphone;
    }
    public void setCellphone(String cellphone) {
        this.cellphone = cellphone;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPosition() {
        return position;
    }
    public void setPosition(String position) {
        this.position = position;
    }
}
