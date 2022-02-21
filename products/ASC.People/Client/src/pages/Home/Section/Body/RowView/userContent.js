import React from "react";
import { withRouter } from "react-router";
import styled from "styled-components";

import RowContent from "@appserver/components/row-content";
import Link from "@appserver/components/link";
import Text from "@appserver/components/text";
import Box from "@appserver/components/box";
import Badges from "../../../../../components/Badges";

const UserContent = ({
  item,
  sectionWidth,
  onPhoneClick,
  onEmailClick,
  onUserNameClick,
  groups,
}) => {
  const { userName, displayName, title, mobilePhone, email, statusType } = item;

  const nameColor = statusType === "pending" ? "#A3A9AE" : "#333333";
  const sideInfoColor = statusType === "pending" ? "#D0D5DA" : "#A3A9AE";

  return (
    <RowContent
      sideColor={sideInfoColor}
      sectionWidth={sectionWidth}
      nameColor={nameColor}
      sideInfoColor={sideInfoColor}
    >
      <Link
        containerWidth="28%"
        type="page"
        href={`/products/people/view/${userName}`}
        title={displayName}
        fontWeight={600}
        onClick={onUserNameClick}
        fontSize="15px"
        color={nameColor}
        isTextOverflow={true}
      >
        {displayName}
      </Link>
      <Badges statusType={statusType} />
      {title ? (
        <Text
          containerMinWidth="120px"
          containerWidth="20%"
          as="div"
          color={sideInfoColor}
          fontSize="12px"
          fontWeight={600}
          title={title}
          truncate={true}
        >
          {title}
        </Text>
      ) : (
        <Box containerMinWidth="120px" containerWidth="20%"></Box>
      )}
      {groups}
      <Link
        containerMinWidth="60px"
        containerWidth="15%"
        type="page"
        title={mobilePhone}
        fontSize="12px"
        fontWeight={400}
        color={sideInfoColor}
        onClick={onPhoneClick}
        isTextOverflow={true}
      >
        {mobilePhone}
      </Link>
      <Link
        containerMinWidth="140px"
        containerWidth="17%"
        type="page"
        title={email}
        fontSize="12px"
        fontWeight={400}
        color={sideInfoColor}
        onClick={onEmailClick}
        isTextOverflow={true}
      >
        {email}
      </Link>
    </RowContent>
  );
};

export default withRouter(UserContent);