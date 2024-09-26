import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './styles/App.less';

const App: React.FC = () => {
  return (
    <div className="app">
      <nav>
        <ul>
          <li>
            <Link to="/">首页</Link>
          </li>
          <li>
            <Link to="/about">关于</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </div>
  );
};

export default App;