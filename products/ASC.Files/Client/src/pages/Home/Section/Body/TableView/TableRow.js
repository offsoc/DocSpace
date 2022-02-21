import React, { useState } from "react";
import { withRouter } from "react-router";
import withContent from "../../../../../HOCs/withContent";
import withBadges from "../../../../../HOCs/withBadges";
import withFileActions from "../../../../../HOCs/withFileActions";
import withContextOptions from "../../../../../HOCs/withContextOptions";
import ItemIcon from "../../../../../components/ItemIcon";
import SharedButton from "../../../../../components/SharedButton";
import { withTranslation } from "react-i18next";
import TableRow from "@appserver/components/table-container/TableRow";
import TableCell from "@appserver/components/table-container/TableCell";
import DragAndDrop from "@appserver/components/drag-and-drop";
import FileNameCell from "./sub-components/FileNameCell";
import SizeCell from "./sub-components/SizeCell";
import AuthorCell from "./sub-components/AuthorCell";
import DateCell from "./sub-components/DateCell";
import TypeCell from "./sub-components/TypeCell";
import globalColors from "@appserver/components/utils/globalColors";
import styled, { css } from "styled-components";
import Base from "@appserver/components/themes/base";
import { isSafari } from "react-device-detect";
const sideColor = globalColors.gray;
const { acceptBackground, background } = Base.dragAndDrop;

const rowCheckboxDraggingStyle = css`
  border-image-source: linear-gradient(to right, #f8f7bf 24px, #eceef1 24px);
`;

const contextMenuWrapperDraggingStyle = css`
  border-image-source: linear-gradient(to left, #f8f7bf 24px, #eceef1 24px);
`;

const rowCheckboxDraggingHoverStyle = css`
  border-image-source: linear-gradient(
    to right,
    rgb(239, 239, 178) 24px,
    #eceef1 24px
  );
`;
const contextMenuWrapperDraggingHoverStyle = css`
  border-image-source: linear-gradient(
    to left,
    rgb(239, 239, 178) 24px,
    #eceef1 24px
  );
`;

const StyledTableRow = styled(TableRow)`
  .table-container_cell {
    /* ${isSafari && `border-image-slice: 0 !important`}; */
    background: ${(props) =>
      (props.checked || props.isActive) && "#F3F4F4 !important"};
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
  }

  .table-container_element {
    margin-left: ${(props) => (props.item.isFolder ? "-3px" : "-4px")};
  }

  &:hover {
    .table-container_row-checkbox-wrapper {
      ${(props) => props.dragging && rowCheckboxDraggingHoverStyle}
    }
    .table-container_row-context-menu-wrapper {
      ${(props) => props.dragging && contextMenuWrapperDraggingHoverStyle}
    }
  }

  .table-container_row-checkbox-wrapper {
    width: 50px;
    margin-left: -24px;
    padding-left: 24px;

    ${(props) =>
      !props.isActive &&
      !props.checked &&
      css`
        border-image-slice: 1;
        border-bottom: 1px solid;
        border-image-source: linear-gradient(
          to right,
          #ffffff 17px,
          #eceef1 31px
        );
      `};

    border-top: 0;
    border-right: 0;
    border-left: 0;

    ${(props) => props.dragging && rowCheckboxDraggingStyle};
  }

  .table-container_row-context-menu-wrapper {
    margin-right: -20x;
    width: 28px;
    padding-right: 18px;

    ${(props) =>
      !props.isActive &&
      !props.checked &&
      css`
        border-bottom: 1px solid;
        border-image-slice: 1;
        border-image-source: linear-gradient(
          to left,
          #ffffff 17px,
          #eceef1 31px
        );
      `};

    border-top: 0;
    border-left: 0;

    ${(props) => props.dragging && contextMenuWrapperDraggingStyle};
  }

  .edit {
    svg:not(:root) {
      width: 12px;
      height: 12px;
    }
  }
`;

const StyledDragAndDrop = styled(DragAndDrop)`
  display: contents;
`;

const StyledShare = styled.div`
  cursor: pointer;
  margin: 0 auto;

  .share-button {
    padding: 4px;
    border: 1px solid transparent;
    border-radius: 3px;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    :hover {
      border: 1px solid #a3a9ae;
      svg {
        cursor: pointer;
      }
    }

    .share-button-icon {
      margin-right: 4px;
      padding-top: 3px;
    }
  }
`;

const StyledBadgesContainer = styled.div`
  display: flex;
  align-items: center;
  height: 19px;
  margin-left: 8px;

  .badges {
    display: flex;
    align-items: center;
    height: 19px;
    margin-right: 12px;
  }

  .badge {
    cursor: pointer;
    height: 14px;
    width: 14px;
    margin-right: 6px;
  }
`;

const FilesTableRow = (props) => {
  const {
    t,
    contextOptionsProps,
    fileContextClick,
    item,
    onContentFileSelect,
    checkedProps,
    className,
    value,
    onMouseClick,
    badgesComponent,
    dragging,
    isDragging,
    onDrop,
    onMouseDown,
    showShare,
    personal,
    isActive,
    onHideContextMenu,
    onFilesClick,
    inProgress,
    index,
    setFirsElemChecked,
  } = props;

  const sharedButton =
    item.canShare && showShare ? (
      <SharedButton
        t={t}
        id={item.id}
        shared={item.shared}
        isFolder={item.isFolder}
        isSmallIcon={true}
      />
    ) : null;

  const element = (
    <ItemIcon id={item.id} icon={item.icon} fileExst={item.fileExst} />
  );

  const selectionProp = {
    className: `files-item ${className} ${value}`,
    value,
  };

  const [isDragActive, setIsDragActive] = useState(false);

  const dragStyles = {
    style: {
      background:
        dragging && isDragging
          ? isDragActive
            ? acceptBackground
            : background
          : "none",
    },
  };

  const onDragOver = (dragActive) => {
    if (dragActive !== isDragActive) {
      setIsDragActive(dragActive);
    }
  };

  const onDragLeave = () => {
    setIsDragActive(false);
  };

  React.useEffect(() => {
    if (index === 0 && (checkedProps || isActive)) {
      setFirsElemChecked(true);
    } else {
      index === 0 && setFirsElemChecked(false);
    }
  }, [checkedProps, isActive]);

  return (
    <StyledDragAndDrop
      data-title={item.title}
      value={value}
      className={`files-item ${className} ${
        checkedProps || isActive ? "table-row-selected" : ""
      }`}
      onDrop={onDrop}
      onMouseDown={onMouseDown}
      dragging={dragging && isDragging}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
    >
      <StyledTableRow
        className="table-row"
        {...dragStyles}
        dragging={dragging && isDragging}
        selectionProp={selectionProp}
        key={item.id}
        item={item}
        element={element}
        fileContextClick={fileContextClick}
        onContentSelect={onContentFileSelect}
        onClick={onMouseClick}
        {...contextOptionsProps}
        checked={checkedProps}
        isActive={isActive}
        inProgress={inProgress}
        onHideContextMenu={onHideContextMenu}
        isThirdPartyFolder={item.isThirdPartyFolder}
        onDoubleClick={onFilesClick}
      >
        <TableCell {...dragStyles} {...selectionProp}>
          <FileNameCell {...props} />
          <StyledBadgesContainer>{badgesComponent}</StyledBadgesContainer>
        </TableCell>
        {!personal && (
          <TableCell {...dragStyles} {...selectionProp}>
            <AuthorCell sideColor={sideColor} {...props} />
          </TableCell>
        )}
        <TableCell {...dragStyles} {...selectionProp}>
          <DateCell create sideColor={sideColor} {...props} />
        </TableCell>
        <TableCell {...dragStyles} {...selectionProp}>
          <DateCell sideColor={sideColor} {...props} />
        </TableCell>
        <TableCell {...dragStyles} {...selectionProp}>
          <SizeCell sideColor={sideColor} {...props} />
        </TableCell>

        <TableCell {...dragStyles} {...selectionProp}>
          <TypeCell sideColor={sideColor} {...props} />
        </TableCell>

        <TableCell {...dragStyles} {...selectionProp}>
          <StyledShare>{sharedButton}</StyledShare>
        </TableCell>
      </StyledTableRow>
    </StyledDragAndDrop>
  );
};

export default withTranslation("Home")(
  withFileActions(
    withRouter(withContextOptions(withContent(withBadges(FilesTableRow))))
  )
);