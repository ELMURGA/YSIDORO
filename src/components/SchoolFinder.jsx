import { useState } from 'react';
import { SCHOOLS_DATA } from '../data/schools.js';

export default function SchoolFinder({ onSubmit }) {
  const [town, setTown] = useState('');
  const [school, setSchool] = useState('');
  const [course, setCourse] = useState('');

  const schools = town ? SCHOOLS_DATA[town].schools : [];
  const courses = town && school ? SCHOOLS_DATA[town].courses[school] || [] : [];

  return (
    <section className="school-finder-section" id="material-finder">
      <div className="section-header-finder">
        <i className="fa-solid fa-school-flag" />
        <div>
          <h3>Buscador de Libros y Materiales de tu Colegio</h3>
          <p style={{ color: 'var(--neutral-body)', fontSize: 14 }}>
            Elige tu municipio, colegio y curso para ver y comprar la lista que han pedido los profesores.
          </p>
        </div>
      </div>

      <div className="finder-wizard">
        <div className="form-group">
          <label htmlFor="finder-town">1. Municipio</label>
          <select
            id="finder-town"
            className="custom-select"
            value={town}
            onChange={(e) => {
              setTown(e.target.value);
              setSchool('');
              setCourse('');
            }}
          >
            <option value="">Selecciona Municipio</option>
            {Object.entries(SCHOOLS_DATA).map(([key, val]) => (
              <option key={key} value={key}>
                {val.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="finder-school">2. Colegio</label>
          <select
            id="finder-school"
            className="custom-select"
            disabled={!town}
            value={school}
            onChange={(e) => {
              setSchool(e.target.value);
              setCourse('');
            }}
          >
            <option value="">Selecciona Colegio</option>
            {schools.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="finder-course">3. Curso Escolar</label>
          <select
            id="finder-course"
            className="custom-select"
            disabled={!school}
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          >
            <option value="">Selecciona Curso</option>
            {courses.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <button
          className="finder-btn"
          disabled={!course}
          onClick={() => onSubmit({ town, school, course })}
        >
          <i className="fa-solid fa-list-check" /> Buscar Material
        </button>
      </div>
    </section>
  );
}
