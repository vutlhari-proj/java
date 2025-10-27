/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.student_marks_app.repositories;

import com.example.student_marks_app.dtos.CourseSummaryDTO;
import com.example.student_marks_app.models.course.Course;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author vutlh
 */
public interface CourseRepository extends JpaRepository<Course, String>{
    
    List<Course> findByCourseNameContainingIgnoreCase(String courseNamePart);
    
    @Transactional(readOnly = true)     
    @Query(
            value = """
                        SELECT * FROM course
                        WHERE LOWER(code) LIKE LOWER(CONCAT('%', :query, '%'))
                        OR LOWER(course_name) LIKE LOWER(CONCAT('%', :query, '%')) 
                    """,
            nativeQuery = true
    )
    List<Course> search(@Param("query") String code);
    
    @Query(
            value = """
                        SELECT DISTINCT c
                        FROM course
                        WHERE dept_code = :deptCode
                        AND (LOWER(code) LIKE LOWER(CONCAT('%', :query, '%'))
                            OR LOWER(course_name) LIKE LOWER(CONCAT('%', :query, '%')))
                    """,
            nativeQuery = true
    )
    List<Course> searchModulesInDepartment(@Param("deptCode") long deptCode,
                                                 @Param("query") String query);
    
    Page<CourseSummaryDTO> findAllBy(Pageable pageable);
}
