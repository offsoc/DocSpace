import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Scrollbar from "@appserver/components/scrollbar";
import { isMobileOnly, isDesktop } from "react-device-detect";

const backgroundColor = "#0F4071";

const StyledNav = styled.nav`
  background-color: ${backgroundColor};
  height: 100%;
  left: 0;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  top: 0;
  transition: width 0.3s ease-in-out;
  width: ${(props) => (props.opened ? "240px" : "0")};
  z-index: 200;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  .version-box {
    position: absolute;

    @media (orientation: landscape) {
      position: ${isMobileOnly && "relative"};
    }

    ${(props) =>
      props.numberOfModules &&
      `@media (max-height: ${props.numberOfModules * 52 + 64}px) {
      position: ${isDesktop && "relative"};
    }`}

    bottom: 8px;
    left: 16px;

    white-space: nowrap;
    a:focus {
      outline: 0;
    }
  }
`;

const StyledScrollbar = styled(Scrollbar)`
  width: ${(props) => (props.opened ? 240 : 56)};
`;

const Nav = React.memo((props) => {
  //console.log("Nav render");
  const {
    opened,
    onMouseEnter,
    onMouseLeave,
    children,
    numberOfModules,
  } = props;
  return (
    <StyledNav
      opened={opened}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      numberOfModules={numberOfModules}
    >
      <StyledScrollbar stype="smallWhite">{children}</StyledScrollbar>
    </StyledNav>
  );
});

Nav.displayName = "Nav";

Nav.propTypes = {
  opened: PropTypes.bool,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Nav;
