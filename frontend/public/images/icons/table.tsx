import type { CoursesProp, ShortCourseProp } from "@/types";
import { Table as TableBs } from "react-bootstrap";

export function Table({ courses }: CoursesProp) {
  console.log("Table received courses:", courses);
  console.log("courses type:", typeof courses);
  console.log("is array:", Array.isArray(courses));
  
  return (
    <main className="container table-container">
      <div className="table-wrapper">
        {/* Static header table */}
        <TableBs bordered hover responsive className="info-table mb-0">
          <caption>Courses</caption>
          <thead>
            <tr>
              <th>Course Code</th>
              <th>Course Name</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <td colSpan={2} className="img-container">
                <div className="d-flex justify-content-end gap-3">
                  <div className="position-relative search-container">
                    <img
                      src="/images/search.svg"
                      alt="search"
                      className="search-img"
                    />
                    <span className="tooltip search-tooltip">
                      search course
                    </span>
                  </div>
                  <div className="position-relative add-container">
                    <img src="/images/add.svg" alt="add" className="add-img" />
                    <span className="tooltip search-tooltip">add course</span>
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </TableBs>

        {/* Scrollable body */}
        <div className="table-scroll">
          <TableBs bordered hover responsive className="info-table">
            <tbody>
              {/* Example data rows */}
              <tr>
                <td>IT101</td>
                <td>Introduction to Programming</td>
              </tr>
              <tr>
                <td>IT202</td>
                <td>Data Structures and Algorithms</td>
              </tr>
            </tbody>
          </TableBs>
        </div>
      </div>
    </main>
  );
}