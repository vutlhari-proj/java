/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.student_marks_app.repositories;

import com.example.student_marks_app.dtos.ModuleSummary;
import com.example.student_marks_app.models.module.CourseModule;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author vutlh
 */
public interface CourseModuleRepository extends JpaRepository<CourseModule, String>{
    
    @Modifying
    @Transactional
    @Query(
            value = "DELETE FROM module_prerequisites WHERE prereq_code = :code",
            nativeQuery = true
    )
    void removeAsPrerequisite(@Param("code") String code); 
    
    @Transactional(readOnly = true)     
    @Query(
            value = """
                        SELECT * FROM course_module
                        WHERE LOWER(code) LIKE LOWER(CONCAT('%', :query, '%'))
                        OR LOWER(module_name) LIKE LOWER(CONCAT('%', :query, '%')) 
                    """,
            nativeQuery = true
    )
    List<CourseModule> search(@Param("query") String code);
    
    @Query("""
            SELECT DISTINCT m
            FROM CourseModule m
            JOIN CourseModuleMapping cmm ON cmm.module = m
            JOIN cmm.course c
            WHERE c.department.code = :deptCode
            AND (LOWER(m.code) LIKE LOWER(CONCAT('%', :query, '%'))
                OR LOWER(m.moduleName) LIKE LOWER(CONCAT('%', :query, '%')))
           """
    )
    List<CourseModule> searchModulesInDepartment(@Param("deptCode") long deptCode,
                                                 @Param("query") String query);
    
    Page<ModuleSummary> findAllBy(Pageable pageable);
}
