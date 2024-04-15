import React from 'react';
import './styles.css'; // Import your CSS file


function PGDCA() {
  return (
    <div>
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
      <main>
        <section className="hero-section">
          <img src="mnnit_adm_building.jpeg" alt="MCA Image" />
          <div className="hero-text">Post Graduate Diploma(Computer Applications)</div>
        </section>
        <section className="semesters-section">
          <div className="grid">
            <div className="semester">Semester 1</div>
            <div className="semester">Semester 2</div>
          </div>
        </section>
        <section className="enrolled-students-section">
          <div className="enrolled-students-text">
            Enrolled Students <a href="#"></a>
          </div>
        </section>
      </main>
      <footer>
        {/* Footer content goes here */}
      </footer>
    </div>
  );
}

export default PGDCA;
