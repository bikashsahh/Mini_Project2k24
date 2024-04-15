import React from 'react';

function Courses() {
    // Array of bachelor courses
    const bachelorCourses = [
        { id: 1, name: 'Bachelor of Science in Computer Science' },
        { id: 2, name: 'Bachelor of Arts in Psychology' },
        { id: 3, name: 'Bachelor of Business Administration' },
        // Add more courses as needed
    ];

    return (
        <div>
            <h2>Bachelor Courses</h2>
            <ul>
                {bachelorCourses.map(course => (
                    <li key={course.id}>{course.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default Courses;
