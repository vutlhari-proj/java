/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.student_marks_app.converters;

import com.example.student_marks_app.models.module.Credits;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
/**
 *
 * @author vutlh
 */
@Converter(autoApply = true)
public class CreditsConverter implements AttributeConverter<Credits, Integer>{
    
    @Override
    public Integer convertToDatabaseColumn(Credits attribute){
        return (attribute != null) ? attribute.getValue() : null;
    }
    
    @Override
    public Credits convertToEntityAttribute(Integer attribute){
        return (attribute != null) ? Credits.fromValue(attribute) : null;
    }
}
