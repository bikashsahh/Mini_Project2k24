// Dummy student data for demonstration
const students = {
    BCA: ['xyz', 'abc', 'def'],
    CIT: ['yyy', 'zzz', 'vvv'],
    MCA_NEW: ['hhh', 'jjj', 'kkk'],
    PGDCA_NEW: ['lll', 'mmm', 'nnn']
};

function showStudents(courseCode) {
    const studentList = document.getElementById('studentList');
    studentList.innerHTML = ''; // Clear previous student list

    const studentsEnrolled = students[courseCode];
    if (studentsEnrolled) {
        studentsEnrolled.forEach(student => {
            const listItem = document.createElement('li');
            listItem.textContent = student;
            studentList.appendChild(listItem);
        });
    }

    // Display the students container
    document.getElementById('students').style.display = 'block';
}
