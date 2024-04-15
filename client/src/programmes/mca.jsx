import React from 'react';
import './styles.css'; // Import your CSS file here

function Header() {
  return (
    <header>
      <div className="container">
        <div className="logo">
          <img src="MNNIT (logo)png.png" alt="MNNIT Study Centre Logo" />
          <h1>MNNIT Study Centre</h1>
        </div>
        <nav>
          <ul>
            <li><a href="#">Home</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="hero-section">
      <img src="mnnit_adm_building.jpeg" alt="MCA Image" />
      <div className="hero-text">Master of Computer Applications</div>
    </section>
  );
}

function SemesterButton({ semester }) {
  return (
    <div className="semester">{semester}</div>
  );
}

function SemestersSection() {
  return (
    <section className="semesters-section">
      <div className="grid">
        <SemesterButton semester="Semester 1" />
        <SemesterButton semester="Semester 2" />
        <SemesterButton semester="Semester 3" />
        <SemesterButton semester="Semester 4" />
      </div>
    </section>
  );
}

function EnrolledStudentsSection() {
  return (
    <section className="enrolled-students-section">
      {/* Enrolled students text will be displayed here dynamically on hover */}
    </section>
  );
}

function Footer() {
  return (
    <footer>
      {/* Footer content goes here */}
    </footer>
  );
}

function MCA() {
  return (
    <div>
      <Header />
      <main>
        <HeroSection />
        <SemestersSection />
        <EnrolledStudentsSection />
      </main>
      <Footer />
    </div>
  );
}

export default MCA;
