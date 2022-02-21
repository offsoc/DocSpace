import React from "react";
import { withRouter } from "react-router";
import TableRow from "@appserver/components/table-container/TableRow";
import TableCell from "@appserver/components/table-container/TableCell";
import withContextOptions from "../../../../../HOCs/withContextOptions";
import withContent from "../../../../../HOCs/withContent";
import Link from "@appserver/components/link";
import Text from "@appserver/components/text";
import styled from "styled-components";
import Badges from "../../../../../components/Badges";

const StyledPeopleRow = styled(TableRow)`
  .table-container_cell {
    height: 46px;
    max-height: 46px;
  }

  .table-container_row-checkbox-wrapper {
    padding-left: 4px;

    .table-container_row-checkbox {
      margin-left: -4px;
    }
  }

  .link-with-dropdown-group {
    margin-right: 12px;
  }

  .table-cell_username {
    margin-right: 12px;
  }
`;

const PeopleTableRow = (props) => {
  const {
    t,
    item,
    contextOptionsProps,
    element,
    checkedProps,
    onContentRowSelect,
    groups,
    onEmailClick,
    onUserNameClick,
    isAdmin,
  } = props;
  const { displayName, email, statusType, userName, position } = item;

  const nameColor = statusType === "pending" ? "#A3A9AE" : "#333333";
  const sideInfoColor = statusType === "pending" ? "#D0D5DA" : "#A3A9AE";

  return (
    <StyledPeopleRow
      key={item.id}
      item={item}
      element={element}
      onContentSelect={onContentRowSelect}
      hasAccess={isAdmin}
      {...contextOptionsProps}
      {...checkedProps}
    >
      <TableCell>
        <Link
          type="page"
          title={displayName}
          fontWeight="600"
          fontSize="15px"
          color={nameColor}
          isTextOverflow
          href={`/products/people/view/${userName}`}
          onClick={onUserNameClick}
          className="table-cell_username"
        >
          {displayName}
        </Link>
        <Badges statusType={statusType} />
      </TableCell>
      <TableCell>{groups}</TableCell>
      <TableCell>
        <Text
          type="page"
          title={position}
          fontSize="12px"
          fontWeight={400}
          color={sideInfoColor}
          truncate
        >
          {position}
        </Text>
      </TableCell>
      <TableCell>
        <Text
          style={{ display: "none" }} //TODO:
          type="page"
          //title={userRole}
          fontSize="12px"
          fontWeight={400}
          color={sideInfoColor}
          truncate
        >
          Phone
        </Text>
      </TableCell>
      <TableCell>
        <Link
          type="page"
          title={email}
          fontSize="12px"
          fontWeight={400}
          color={sideInfoColor}
          onClick={onEmailClick}
          isTextOverflow
        >
          {email}
        </Link>
      </TableCell>
    </StyledPeopleRow>
  );
};

export default withRouter(withContextOptions(withContent(PeopleTableRow)));