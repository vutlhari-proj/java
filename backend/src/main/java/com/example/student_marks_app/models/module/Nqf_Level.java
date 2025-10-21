/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Enum.java to edit this template
 */
package com.example.student_marks_app.models.module;

/**
 *
 * @author vutlh
 */
public enum Nqf_Level {
    FIVE(5),
    SIX(6),
    SEVEN(7),
    EIGHT(8),
    NINE(9),
    TEN(10);
    
    private final int value ;

    Nqf_Level(int value) {
        this.value = value;
    }
    
    public int getValue(){
        return this.value;
    }
    
    public static Nqf_Level fromValue(int value){
        for (Nqf_Level nqf : Nqf_Level.values()) {
            if(nqf.value == value) return nqf;
        }
        
        throw new IllegalArgumentException("Invalid nqf value: " + value);
    }
}
