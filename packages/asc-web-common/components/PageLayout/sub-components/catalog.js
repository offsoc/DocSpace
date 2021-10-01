import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { Resizable } from 're-resizable';
import { isMobile, isMobileOnly, isTablet } from 'react-device-detect';
import {
  mobile,
  tablet,
  isMobile as isMobileUtils,
  isTablet as isTabletUtils,
  isDesktop as isDesktopUtils,
} from '@appserver/components/utils/device';

const StyledCatalog = styled.div`
  position: relative;
  @media ${mobile} {
    top: 8px;
  }
  top: ${(props) => isMobileOnly && (props.showText ? '64px' : '56px')} !important;

  z-index: ${(props) => (props.showText && (isMobileOnly || isMobileUtils()) ? '201' : '100')};
  .resizable-block {
    display: flex;
    flex-direction: column;
    min-width: ${(props) => (props.showText ? '256px' : '52px')};
    width: ${(props) => (props.showText ? '256px' : '52px')};
    height: 100% !important;
    background: #f8f9f9;
    overflow-y: auto;
    overflow-x: hidden;
    .resizable-border {
      div {
        cursor: ew-resize !important;
      }
    }
    @media ${tablet} {
      min-width: ${(props) => (props.showText ? '240px' : '52px')};
      max-width: ${(props) => (props.showText ? '240px' : '52px')};
      .resizable-border {
        display: none;
      }
    }

    @media ${mobile} {
      display: ${(props) => (props.showText ? 'flex' : 'none')};
      min-width: 100vw;
      width: 100%;
      margin: 0;
      padding: 0;
    }

    ${isTablet &&
    css`
      min-width: ${(props) => (props.showText ? '240px' : '52px')};
      max-width: ${(props) => (props.showText ? '240px' : '52px')};
      .resizable-border {
        display: none;
      }
    `}

    ${isMobileOnly &&
    css`
      display: ${(props) => (props.showText ? 'flex' : 'none')};
      min-width: 100vw !important;
      width: 100%;
      margin: 0;
      padding: 0;
    `}
  }
`;

const Catalog = (props) => {
  const { showText, setShowText, children, ...rest } = props;
  const refTimer = React.useRef(null);

  const enable = {
    top: false,
    right: !isMobile,
    bottom: false,
    left: false,
  };

  const hideText = React.useCallback((event) => {
    event.preventDefault;
    setShowText(false);
  }, []);

  React.useEffect(() => {
    if (isMobileOnly) {
      window.addEventListener('popstate', hideText);
      return () => window.removeEventListener('popstate', hideText);
    }
  }, [hideText]);
  React.useEffect(() => {
    window.addEventListener('resize', sizeChangeHandler);
    return () => window.removeEventListener('resize', sizeChangeHandler);
  });

  const sizeChangeHandler = () => {
    clearTimeout(refTimer.current);

    refTimer.current = setTimeout(() => {
      console.log('handler');
      if (isMobile && !props.userShowText && props.showText) props.setShowText(false);
      if (isMobileUtils() && !isMobile && !props.userShowText && props.showText)
        props.setShowText(false);
      if (isTabletUtils() && !isMobile && !props.userShowText && props.showText)
        props.setShowText(false);
      if (isDesktopUtils() && !isMobile) props.setShowText(true);
    }, 200);
  };

  return (
    <StyledCatalog showText={showText} {...rest}>
      <Resizable
        enable={enable}
        className="resizable-block"
        handleWrapperClass="resizable-border not-selectable">
        {children}
      </Resizable>
    </StyledCatalog>
  );
};

Catalog.propTypes = {
  showText: PropTypes.bool,
  setShowText: PropTypes.func,
  children: PropTypes.any,
};

export default Catalog;
