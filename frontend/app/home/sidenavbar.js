"use client";

import { useRouter } from "next/navigation";
import styled from "styled-components";

const Navbar = styled.div`
  background-color: #82c2ff;
  height: 100vh;
  width: 250px;
  position: inherit;
`;

const NavItem = styled.div`
  padding: 10px 20px;
  background-color: ${(props) => (props.active ? "#6AA8D9" : "transparent")};
  transition: background-color 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #6aa8d9;
  }
`;

function SideNavbar() {
  const router = useRouter();

  return (
    <Navbar>
      <NavItem
        active={router.pathname === "/profile"}
        onClick={() => router.push("/profile")}
      >
        Profile
      </NavItem>
      <NavItem
        active={router.pathname === "/overview"}
        onClick={() => router.push("/overview")}
      >
        Overview
      </NavItem>
      <NavItem
        active={router.pathname === "/annotate"}
        onClick={() => router.push("/annotate")}
      >
        Annotate
      </NavItem>
      <NavItem
        active={router.pathname === "/insights"}
        onClick={() => router.push("/insights")}
      >
        Insights
      </NavItem>
      <NavItem
        active={router.pathname === "/notifications"}
        onClick={() => router.push("/notifications")}
      >
        Notifications
      </NavItem>
    </Navbar>
  );
}

export default SideNavbar;
