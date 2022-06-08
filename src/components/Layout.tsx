import { Link, Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <div>
        <header>
          <nav>
            <ul>
              <li>
                <Link to={"/"}>Hem</Link>
              </li>
              <li>
                <Link to={"/animals/"}>Djur</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Outlet></Outlet>
        </main>
        <footer>Min djur inlämningsuppgift</footer>
      </div>
    </>
  );
};
