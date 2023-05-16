import React, { useRef, useEffect } from "react";

import styled, { css } from "styled-components";

import { isMobile } from "react-device-detect";

import TableContainer from "@docspace/components/table-container/TableContainer";
import TableBody from "@docspace/components/table-container/TableBody";
import HistoryTableHeader from "./HistoryTableHeader";
import HistoryTableRow from "./HistoryTableRow";

import { useParams } from "react-router-dom";

import { inject, observer } from "mobx-react";

const TableWrapper = styled(TableContainer)`
  margin-top: 5px;

  .noPadding {
    padding: 0;
  }

  .table-list-item {
    cursor: pointer;
    &:hover {
      background-color: #f3f4f4;
    }
  }

  .table-list-item:has(.selected-table-row) {
    background-color: #f3f4f4;
  }
  .div1 > .div2 {
    background-color: red;
    width: 50%;
  }
`;

const HistoryTableView = (props) => {
  const {
    sectionWidth,
    historyItems,
    viewAs,
    setViewAs,
    hasMoreItems,
    totalItems,
    fetchMoreItems,
    formatFilters,
    historyFilters,
  } = props;

  const tableRef = useRef(null);

  const { id } = useParams();

  useEffect(() => {
    if (!sectionWidth) return;
    if (sectionWidth < 1025 || isMobile) {
      viewAs !== "row" && setViewAs("row");
    } else {
      viewAs !== "table" && setViewAs("table");
    }
  }, [sectionWidth]);

  const fetchMoreFiles = () => {
    const params = historyFilters === null ? {} : formatFilters(historyFilters);
    fetchMoreItems({ ...params, configId: id, count: 10 });
  };

  return (
    <TableWrapper
      forwardedRef={tableRef}
      style={{
        gridTemplateColumns: "300px 100px 400px 24px",
      }}
      useReactWindow>
      <HistoryTableHeader sectionWidth={sectionWidth} tableRef={tableRef} />
      <TableBody
        itemHeight={49}
        useReactWindow
        filesLength={historyItems.length}
        fetchMoreFiles={fetchMoreFiles}
        hasMoreFiles={hasMoreItems}
        itemCount={totalItems}>
        {historyItems.map((item) => (
          <HistoryTableRow key={item.id} item={{ ...item, title: item.id }} />
        ))}
      </TableBody>
    </TableWrapper>
  );
};

export default inject(({ setup, webhooksStore }) => {
  const { viewAs, setViewAs } = setup;
  const { historyItems, fetchMoreItems, hasMoreItems, totalItems, formatFilters, historyFilters } =
    webhooksStore;
  return {
    viewAs,
    setViewAs,
    historyItems,
    fetchMoreItems,
    hasMoreItems,
    totalItems,
    formatFilters,
    historyFilters,
  };
})(observer(HistoryTableView));
