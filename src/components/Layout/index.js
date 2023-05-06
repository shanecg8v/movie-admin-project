import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import Sidebar from './Sidebar';

function Layout() {
  const { pathname } = useLocation();
  const noPdTopListArr = ['/home']; //首頁header有蓋住內容，所以有蓋住內容的樣式統一這邊設定

  return (
    <div className="wrapper d-flex align-items-stretch">
      <Sidebar />
      <div
        className={clsx('content', {
          noPdTop: noPdTopListArr.includes(pathname),
        })}
      >
        <Outlet />
      </div>
    </div>
  );
}
export default Layout;
