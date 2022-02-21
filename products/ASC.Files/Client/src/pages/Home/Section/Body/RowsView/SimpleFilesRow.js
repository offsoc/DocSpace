import React from "react";
import styled, { css } from "styled-components";
import { withTranslation } from "react-i18next";
import DragAndDrop from "@appserver/components/drag-and-drop";
import Row from "@appserver/components/row";
import FilesRowContent from "./FilesRowContent";
import { withRouter } from "react-router-dom";

import withFileActions from "../../../../../HOCs/withFileActions";
import withContextOptions from "../../../../../HOCs/withContextOptions";
import SharedButton from "../../../../../components/SharedButton";
import ItemIcon from "../../../../../components/ItemIcon";
import marginStyles from "./CommonStyles";

const checkedStyle = css`
  background: #f3f4f4;
  ${marginStyles}
`;

const draggingStyle = css`
  background: #f8f7bf;
  &:hover {
    background: #efefb2;
  }
  ${marginStyles}
`;

const StyledWrapper = styled.div`
  .files-item {
    border-left: none;
    border-right: none;
    margin-left: 0;
  }
`;

const StyledSimpleFilesRow = styled(Row)`
  ${(props) => (props.checked || props.isActive) && checkedStyle};
  ${(props) => props.dragging && draggingStyle}
  position: unset;
  cursor: ${(props) =>
    !props.isThirdPartyFolder &&
    (props.checked || props.isActive) &&
    "url(/static/images/cursor.palm.react.svg), auto"};
  ${(props) =>
    props.inProgress &&
    css`
      pointer-events: none;
      /* cursor: wait; */
    `}

  margin-top: -2px;

  ${(props) =>
    !props.contextOptions &&
    `
    & > div:last-child {
        width: 0px;
      }
  `}

  .share-button-icon {
    margin-right: 7px;
  }

  .share-button:hover,
  .share-button-icon:hover {
    cursor: pointer;
    color: #657077;
    path {
      fill: #657077;
    }
  }
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  @media (max-width: 1312px) {
    .share-button {
      padding-top: 3px;
    }
  }

  .styled-element {
    height: 32px;
    /* width: ${(props) => (props.isEdit ? "52px" : "24px")}; */
    margin-right: 7px;
  }
`;

const SimpleFilesRow = (props) => {
  const {
    t,
    item,
    sectionWidth,
    dragging,
    onContentFileSelect,
    fileContextClick,
    onDrop,
    onMouseDown,
    className,
    isDragging,
    value,
    displayShareButton,
    isPrivacy,
    contextOptionsProps,
    checkedProps,
    onFilesClick,
    onMouseClick,
    isEdit,
    showShare,
    isActive,
    inProgress,
  } = props;

  const sharedButton =
    item.canShare && showShare ? (
      <SharedButton
        t={t}
        id={item.id}
        shared={item.shared}
        isFolder={item.isFolder}
      />
    ) : null;

  const element = (
    <ItemIcon id={item.id} icon={item.icon} fileExst={item.fileExst} />
  );

  return (
    <StyledWrapper
      className={`row-wrapper ${
        checkedProps || isActive ? "row-selected" : ""
      }`}
    >
      <DragAndDrop
        data-title={item.title}
        value={value}
        className={`files-item ${className}`}
        onDrop={onDrop}
        onMouseDown={onMouseDown}
        dragging={dragging && isDragging}
      >
        <StyledSimpleFilesRow
          key={item.id}
          data={item}
          isEdit={isEdit}
          element={element}
          sectionWidth={sectionWidth}
          contentElement={sharedButton}
          onSelect={onContentFileSelect}
          rowContextClick={fileContextClick}
          isPrivacy={isPrivacy}
          onClick={onMouseClick}
          onDoubleClick={onFilesClick}
          checked={checkedProps}
          {...contextOptionsProps}
          contextButtonSpacerWidth={displayShareButton}
          dragging={dragging && isDragging}
          isActive={isActive}
          inProgress={inProgress}
          isThirdPartyFolder={item.isThirdPartyFolder}
          className="files-row"
        >
          <FilesRowContent
            item={item}
            sectionWidth={sectionWidth}
            onFilesClick={onFilesClick}
          />
        </StyledSimpleFilesRow>
      </DragAndDrop>
    </StyledWrapper>
  );
};

export default withTranslation(["Home", "Translations"])(
  withFileActions(withRouter(withContextOptions(SimpleFilesRow)))
);