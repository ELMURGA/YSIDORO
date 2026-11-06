export default function MegaMenu({ categories, onSelectCategory, onSelectSubcategory }) {
  return (
    <nav className="nav-menu">
      <div className="container" style={{ display: 'flex', width: '100%' }}>
        <ul className="nav-list">
          {categories.map((cat) => (
            <li className="nav-item" key={cat.key}>
              <a
                href="#"
                className="nav-link cat-trigger"
                onClick={(e) => {
                  e.preventDefault();
                  onSelectCategory(cat.key);
                }}
              >
                {cat.label} <i className="fa-solid fa-chevron-down" style={{ fontSize: 10, marginLeft: 4 }} />
              </a>
              <div
                className="mega-menu-panel"
                style={cat.columns.length <= 3 ? { gridTemplateColumns: 'repeat(3, 1fr)' } : undefined}
              >
                {cat.columns.map((col) => (
                  <div key={col.title}>
                    <h4 className="mega-menu-col-title">{col.title}</h4>
                    <ul className="mega-menu-list">
                      {col.items.map((item) => (
                        <li className="mega-menu-item" key={item.sub}>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              onSelectSubcategory(cat.key, item.sub);
                            }}
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </li>
          ))}

          <li className="nav-item nav-item-school">
            <a
              href="#"
              className="nav-link nav-link-school"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('material-finder')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <i className="fa-solid fa-book-open-reader" /> Libros &amp; Material<span className="nav-school-extra"> por Colegios</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
