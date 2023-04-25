import React, { useMemo } from "react";
import moment from "moment";
import styled from "styled-components";

import { Text } from "@docspace/components";
import { StatusBadge } from "../../sub-components/StatusBadge";

const BarWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  min-width: 600px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 24px;

  background: #f8f9f9;
  border-radius: 3px;
`;

const BarItem = styled.div`
  box-sizing: border-box;
  width: 257.25px;
  height: 76px;
  padding: 16px;
`;

const BarItemHeader = ({ children }) => (
  <Text as="h3" color="#A3A9AE" fontSize="12px" fontWeight={600} style={{ marginBottom: "8px" }}>
    {children}
  </Text>
);

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const DetailsBar = ({ webhookDetails }) => {
  const formattedDelivery = useMemo(
    () => moment(webhookDetails.delivery).format("MMM D, YYYY, h:mm:ss A") + " UTC",
    [webhookDetails],
  );
  const formattedCreationTime = useMemo(
    () => moment(webhookDetails.creationTime).format("MMM D, YYYY, h:mm:ss A") + " UTC",
    [webhookDetails],
  );

  return (
    <BarWrapper>
      <BarItem>
        <BarItemHeader>Status</BarItemHeader>
        <FlexWrapper>
          <StatusBadge status={webhookDetails.status} />
        </FlexWrapper>
      </BarItem>
      <BarItem>
        <BarItemHeader>Event ID</BarItemHeader>
        <Text isInline fontWeight={600}>
          {webhookDetails.id}
        </Text>
      </BarItem>
      <BarItem>
        <BarItemHeader>Event time</BarItemHeader>
        <Text isInline fontWeight={600}>
          {formattedCreationTime}
        </Text>
      </BarItem>
      <BarItem>
        <BarItemHeader>Delivery time</BarItemHeader>
        <Text isInline fontWeight={600}>
          {formattedDelivery}
        </Text>
      </BarItem>
    </BarWrapper>
  );
};
