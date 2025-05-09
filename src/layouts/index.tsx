import { Link, Outlet } from 'umi';
import styles from './index.less';

export default function Layout() {
  return (
    <div className={styles.navs}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <a target="_blank" href="https://github.com/baifuyou94/bus">Github</a>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}
