import styled from "styled-components";

export const MonthsContainer = styled.div`
  display: grid;
  row-gap: 26.7px;
  column-gap: ${(props) => (props.isMobile ? "8%" : "41.3px")};
  grid-template-columns: repeat(4, 1fr);
  box-sizing: border-box;
  padding: 14px 6px 6px 6px;
`;
