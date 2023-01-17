import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  StyledViewer,
  StyledViewerContainer,
  StyledSwitchToolbar,
  StyledButtonScroll,
  StyledMobileDetails,
} from "./styled-viewer";
import ControlBtn from "./sub-components/control-btn";
import Text from "@docspace/components/text";
import IconButton from "@docspace/components/icon-button";

import { isMobileOnly } from "react-device-detect";

import MediaNextIcon from "../../../public/images/viewer.next.react.svg";
import MediaPrevIcon from "../../../public/images/viewer.prew.react.svg";
import ViewerPlayer from "./sub-components/viewer-player";

import MediaContextMenu from "../../../public/images/vertical-dots.react.svg";
import ContextMenu from "@docspace/components/context-menu";
import BackArrow from "../../../public/images/viewer.media.back.react.svg";

export const Viewer = (props) => {
  const {
    visible,
    onMaskClick,
    title,
    onNextClick,
    onPrevClick,
    playlistPos,
    playlist,
    isImage,
    isAudio,
    audioIcon,
    contextModel,
    generateContextMenu,
    headerIcon,
    onSetSelectionFile,
  } = props;

  let timer;

  const defaultContainer = React.useRef(
    typeof document !== "undefined" ? document.createElement("div") : null
  );
  const [container, setContainer] = React.useState(props.container);
  const [panelVisible, setPanelVisible] = React.useState(true);
  const [isOpenContextMenu, setIsOpenContextMenu] = React.useState(false);
  const [isPlay, setIsPlay] = React.useState(null);
  const [globalTimer, setGlobalTimer] = React.useState(null);
  const [init, setInit] = React.useState(false);

  const detailsContainerRef = React.useRef(null);
  const videoControls = React.useRef(null);
  const videoElement = React.useRef(null);
  const cm = React.useRef(null);

  const [isFullscreen, setIsFullScreen] = React.useState(false);
  React.useEffect(() => {
    document.body.appendChild(defaultContainer.current);
  }, []);

  React.useEffect(() => {
    if ((!isPlay || isOpenContextMenu) && !isImage) return clearTimeout(timer);
    document.addEventListener("touchstart", onTouch);
    if (!isMobileOnly) {
      document.addEventListener("mousemove", resetTimer);

      return () => {
        document.removeEventListener("mousemove", resetTimer);
        clearTimeout(timer);
        setPanelVisible(true);
      };
    }
    return () => document.removeEventListener("touchstart", onTouch);
  }, [isPlay, isOpenContextMenu]);

  function resetTimer() {
    setPanelVisible(true);
    clearTimeout(timer);
    timer = setTimeout(() => setPanelVisible(false), 5000);
  }

  const onTouch = (e) => {
    if (e.target === videoElement.current) {
      setPanelVisible((visible) => !visible);
    }
  };

  React.useEffect(() => {
    if (props.visible && !init) {
      setInit(true);
    }
  }, [props.visible, init]);

  React.useEffect(() => {
    if (props.container) {
      setContainer(props.container);
    } else {
      setContainer(defaultContainer.current);
    }
  }, [props.container]);

  if (!init) {
    return null;
  }
  const onContextMenu = (e) => {
    setIsOpenContextMenu((open) => !open);
    onSetSelectionFile();
    cm.current.show(e);
  };

  const contextMenuHeader = {
    icon: headerIcon,
    title: title,
  };

  const mobileDetails = (
    <StyledMobileDetails>
      <BackArrow className="mobile-close" onClick={onMaskClick} />
      <Text fontSize="14px" color={"#fff"} className="title">
        {title}
      </Text>
      {!props.isPreviewFile && (
        <div className="details-context">
          <MediaContextMenu
            className="mobile-context"
            onClick={onContextMenu}
          />
          <ContextMenu
            getContextModel={contextModel}
            ref={cm}
            withBackdrop={true}
            header={contextMenuHeader}
            onHide={() => setIsOpenContextMenu(false)}
          />
        </div>
      )}
    </StyledMobileDetails>
  );

  const displayUI = (isMobileOnly && isAudio) || panelVisible;

  const viewerPortal = ReactDOM.createPortal(
    <StyledViewer
      {...props}
      displayUI={displayUI}
      mobileDetails={mobileDetails}
      container={container}
      onMaskClick={onMaskClick}
      setPanelVisible={setPanelVisible}
      generateContextMenu={generateContextMenu}
    />,
    container
  );

  const videoPortal = ReactDOM.createPortal(
    <ViewerPlayer
      {...props}
      onNextClick={onNextClick}
      onPrevClick={onPrevClick}
      isAudio={isAudio}
      audioIcon={audioIcon}
      contextModel={contextModel}
      mobileDetails={mobileDetails}
      displayUI={displayUI}
      isOpenContextMenu={isOpenContextMenu}
      globalTimer={globalTimer}
      setGlobalTimer={setGlobalTimer}
      videoControls={videoControls}
      onTouch={onTouch}
      title={title}
      setIsPlay={setIsPlay}
      setIsOpenContextMenu={setIsOpenContextMenu}
      isPlay={isPlay}
      onMaskClick={onMaskClick}
      setPanelVisible={setPanelVisible}
      generateContextMenu={generateContextMenu}
      setIsFullScreen={setIsFullScreen}
      videoRef={videoElement}
      video={playlist[playlistPos]}
      activeIndex={playlistPos}
    />,
    container
  );

  return (
    <StyledViewerContainer visible={visible}>
      {!isFullscreen && !isMobileOnly && displayUI && (
        <div>
          <div className="details" ref={detailsContainerRef}>
            <Text isBold fontSize="14px" className="title">
              {title}
            </Text>
            <ControlBtn
              onClick={onMaskClick && onMaskClick}
              className="mediaPlayerClose"
            >
              <IconButton
                color={"#fff"}
                iconName="/static/images/viewer.media.close.svg"
                size={28}
                isClickable
              />
            </ControlBtn>
          </div>
        </div>
      )}

      {playlist.length > 1 && !isFullscreen && displayUI && (
        <>
          {playlistPos !== 0 && (
            <StyledSwitchToolbar left onClick={onPrevClick}>
              <StyledButtonScroll orientation="left">
                <MediaPrevIcon />
              </StyledButtonScroll>
            </StyledSwitchToolbar>
          )}
          {playlistPos < playlist.length - 1 && (
            <>
              <StyledSwitchToolbar onClick={onNextClick}>
                <StyledButtonScroll orientation="right">
                  <MediaNextIcon />
                </StyledButtonScroll>
              </StyledSwitchToolbar>
            </>
          )}
        </>
      )}

      {isImage ? <>{viewerPortal}</> : <>{videoPortal}</>}
    </StyledViewerContainer>
  );
};
