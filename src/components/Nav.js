import { useEffect, useState } from "react";
import styled from "styled-components";

const Nav = () => {
  const [showBackgroundNav, setShowBackgroundNav] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        setShowBackgroundNav(true);
      } else {
        setShowBackgroundNav(false);
      }
    });

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <NavWrapper showBackgroundNav={showBackgroundNav}>
      <Logo>
        <img
          src="/images/logo.svg"
          alt="Disney+"
          onClick={() => (window.location.href = "/")}
        />
      </Logo>
    </NavWrapper>
  );
};

export default Nav;

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: ${(props) =>
    props.showBackgroundNav ? "#090b13" : "transparent"};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;
const Logo = styled.a`
  padding: 0;
  width: 80px;
  height: 70px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;
  width: 80px;
  img {
    display: block;
    width: 100%;
  }
`;
