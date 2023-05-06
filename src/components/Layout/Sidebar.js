import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <div className="mb-4">
        <div className="sidebar__logo"></div>
      </div>
      <ul className="list-unstyled">
        <li>
          <Link to="/member">會員管理</Link>
        </li>
        <li>
          <Link to="/movie">新增電影</Link>
        </li>
        <li>
          <Link to="/movieShelf">電影上架</Link>
        </li>
        <li>
          <p>影城管理</p>
          <ul className="list-unstyled">
            <li>
              <Link to="/theater">影城調整</Link>
            </li>
            <li>
              <Link to="/room">影聽管理</Link>
            </li>
            <li>
              <Link to="/seat">座位管理</Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
