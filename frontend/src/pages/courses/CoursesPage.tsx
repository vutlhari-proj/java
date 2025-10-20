import axios from "axios";
import { Navbar, Table } from "@/components";
import type { ShortCourseProp } from "@/types/course";
import { useEffect, useState } from "react";
import type { TableData } from "@/types";

export function CoursesPage() {
  const [courses, setCourses] = useState<ShortCourseProp[]>([]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get<ShortCourseProp[]>("/api/courses");
      console.log("API Response:", response.data);
      console.log("Is array:", Array.isArray(response.data));
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setCourses([]); // Set empty array on error
    }
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  const courseColumns = [
    { key: 'code', header: 'Course Code' },
    { key: 'courseName', header: 'Course Name' }
  ];

  return (
    <>
      <title>Courses</title>
      <Navbar />
      <div className="spacer" style={{ height: '80px' }}></div>
      <div className="d-flex flex-column align-items-center gap-4">
        <h1>Courses</h1>
        <Table 
          data={courses as unknown as TableData[]}
          columns={courseColumns}
          entityName="course"
          idKey="code"
        />
      </div>
    </>
  );
}