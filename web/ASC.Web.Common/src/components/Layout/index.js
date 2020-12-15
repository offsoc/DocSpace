import React, { useEffect } from "react";
import styled from "styled-components";
import MobileLayout from "./MobileLayout";
import { utils } from "asc-web-components";
import { isIOS, isFirefox, isChrome, isSafari } from "react-device-detect";

import { connect } from "react-redux";
import store from "../../store";

const { setIsTabletView } = store.auth.actions;
const { getIsTabletView } = store.auth.selectors;

const { size } = utils.device;

const StyledContainer = styled.div`
  width: 100%;
  height: ${(props) =>
    props.isTabletView && !isFirefox
      ? "calc(var(--vh, 1vh) * 100 + 57px)"
      : "100vh"};
`;

const Layout = (props) => {
  const { children, isTabletView, setIsTabletView } = props;
  useEffect(() => {
    const isTablet = window.innerWidth <= size.tablet;
    setIsTabletView(isTablet);

    let mediaQuery = window.matchMedia("(max-width: 1024px)");
    //mediaQuery.addEventListener("change", isViewChangeHandler);
    mediaQuery.addListener(isViewChangeHandler);
    //mediaQuery.removeEventListener("change", isViewChangeHandler);

    return () => mediaQuery.removeListener(isViewChangeHandler);
  }, []);

  useEffect(() => {
    if (isTabletView) {
      if (isIOS && isSafari)
        window.addEventListener("resize", orientationChangeHandler);
      else
        window.addEventListener("orientationchange", orientationChangeHandler);
    }

    return () => {
      if (isTabletView) {
        if (isIOS && isSafari)
          window.removeEventListener("resize", orientationChangeHandler);
        else
          window.removeEventListener(
            "orientationchange",
            orientationChangeHandler
          );
      }
    };
  }, [isTabletView]);

  const isViewChangeHandler = (e) => {
    const { matches } = e;
    setIsTabletView(matches);
  };

  const orientationChangeHandler = () => {
    const intervalTime = 100;
    const endTimeout = 300;

    let interval, timeout, lastInnerHeight, noChangeCount;

    const updateHeight = () => {
      clearInterval(interval);
      clearTimeout(timeout);

      interval = null;
      timeout = null;

      let vh = (window.innerHeight - 57) * 0.01;

      if (isChrome) {
        if (window.innerHeight < window.innerWidth) {
          vh = (window.innerHeight + 57) * 0.01;
        }
      }
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    interval = setInterval(() => {
      if (window.innerHeight === lastInnerHeight) {
        noChangeCount++;

        if (noChangeCount === intervalTime) {
          updateHeight();
        }
      } else {
        lastInnerHeight = window.innerHeight;
        noChangeCount = 0;
      }
    });

    timeout = setTimeout(() => {
      updateHeight();
    }, endTimeout);
  };

  return (
    <StyledContainer className="Layout" isTabletView={isTabletView}>
      {isTabletView ? <MobileLayout {...props} /> : children}
    </StyledContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    isTabletView: getIsTabletView(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setIsTabletView: (isTabletView) => dispatch(setIsTabletView(isTabletView)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
