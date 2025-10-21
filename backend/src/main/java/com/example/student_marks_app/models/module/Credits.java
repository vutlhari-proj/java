/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Enum.java to edit this template
 */
package com.example.student_marks_app.models.module;

/**
 *
 * @author vutlh
 */
public enum Credits {
    TWO(2),
    THREE(3),
    TEN(10),
    FIFTEEN(15),
    TWENTY(20),
    TWENTY_FOUR(24),
    THIRTY(30),
    SIXTY(60),
    ONE_HUNDRED_EIGHTY(180),
    THREE_HUNDRED_SIXTY(360);
    
    private final int value;
    
    Credits(int value){
        this.value = value;
    }

    public int getValue() {
        return value;
    }
    
    public static Credits fromValue(int value){
        for (Credits c : Credits.values()) {
            if(c.value == value) return c;
        }
        
        throw new IllegalArgumentException("Invalid credit value: " + value);
    }
}
