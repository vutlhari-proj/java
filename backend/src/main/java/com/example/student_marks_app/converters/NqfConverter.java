/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.student_marks_app.converters;

import com.example.student_marks_app.models.module.Nqf_Level;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

/**
 *
 * @author vutlh
 */
@Converter(autoApply = true)
public class NqfConverter implements AttributeConverter<Nqf_Level, Integer>{
    @Override
    public Integer convertToDatabaseColumn(Nqf_Level attribute){
        return (attribute != null) ? attribute.getValue() : null;
    }
    
    @Override
    public Nqf_Level convertToEntityAttribute(Integer attribute){
        return (attribute != null) ? Nqf_Level.fromValue(attribute) : null;
    }
}
