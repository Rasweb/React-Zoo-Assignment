import { Link, Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <div>
        <header>
          <nav>
            <ul>
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/animals/"}>Animals</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Outlet></Outlet>
        </main>
        <footer>My animal assignment</footer>
      </div>
    </>
  );
};
