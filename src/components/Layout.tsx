import { Link, Outlet } from "react-router-dom";
import { StyledNavList } from "./styledComponents/StyledLists";
import { StyledNavUl } from "./styledComponents/StyledUls";

export const Layout = () => {
  return (
    <>
      <div>
        <header>
          <nav>
            <StyledNavUl>
              <StyledNavList>
                <Link to={"/"}>Hem</Link>
              </StyledNavList>
              <StyledNavList>
                <Link to={"/animals/"}>Djur</Link>
              </StyledNavList>
            </StyledNavUl>
          </nav>
        </header>
        <main>
          <Outlet></Outlet>
        </main>
      </div>
    </>
  );
};
