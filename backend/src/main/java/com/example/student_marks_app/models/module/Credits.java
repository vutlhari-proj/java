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
    ZERO(0),
    TWO(2),
    THREE(3),
    SIX(6),
    NINE(9),
    TEN(10),
    THIRTEEN(13),
    TWELVE(12),
    FOURTEEN(14),
    FIFTEEN(15),
    SIXTEEN(16),
    EIGHTEEN(18),
    TWENTY(20),
    TWENTY_ONE(21),
    TWENTY_TWO(22),
    TWENTY_FOUR(24),
    TWENTY_FIVE(25),
    TWENTY_SIX(26),
    TWENTY_SEVEN(27),
    TWENTY_NINE(29),
    THIRTY(30),
    THIRTY_ONE(31),
    THIRTY_TWO(32),
    THIRTY_FOUR(34),
    THIRTY_SIX(36),
    THIRTY_SEVEN(37),
    THIRTY_EIGHT(38),
    THIRTY_NINE(39),
    FORTY(40),
    FORTY_TWO(42),
    FORTY_EIGHT(48),
    SIXTY(60),
    SEVENTY_TWO(72),
    NINETY(90),
    ONE_HUNDRED_TWENTY(120),
    ONE_HUNDRED_THIRTY_TWO(132),
    ONE_HUNDRED_EIGHTY(180),
    THREE_HUNDRED_SIXTY(360),
    THREE_HUNDRED_SEVENTY_TWO(372),
    FOUR_HUNDRED_EIGHTY(480),
    FOUR_HUNDRED_NINETY_SIX(496),
    FOUR_HUNDRED_NINETY_NINE(499),
    FIVE_HUNDRED_TWO(502),
    FIVE_HUNDRED_THIRTY_EIGHT(538),
    FIVE_HUNDRED_FIFTY(550),
    FIVE_HUNDRED_FIFTY_ONE(551);
    
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
