import React, { useRef } from "react";
import PropTypes from "prop-types";
import { WindowScroller } from "react-virtualized";
import { isMobileOnly } from "react-device-detect";
import ListComponent from "./List";
import GridComponent from "./Grid";

const InfiniteLoaderComponent = (props) => {
  const ref = useRef(null);

  const scroll = isMobileOnly
    ? document.querySelector("#customScrollBar > .scroll-body")
    : document.querySelector("#sectionScroll > .scroll-body");

  const onScroll = ({ scrollTop }) => {
    ref.current.scrollTo(scrollTop);
  };

  return (
    <>
      <WindowScroller scrollElement={scroll} onScroll={onScroll}>
        {() => <div />}
      </WindowScroller>

      {props.viewAs === "tile" ? (
        <GridComponent listRef={ref} {...props} />
      ) : (
        <ListComponent listRef={ref} {...props} />
      )}
    </>
  );
};
InfiniteLoaderComponent.propTypes = {
  viewAs: PropTypes.string.isRequired,
  hasMoreFiles: PropTypes.bool.isRequired,
  filesLength: PropTypes.number.isRequired,
  itemCount: PropTypes.number.isRequired,
  loadMoreItems: PropTypes.func.isRequired,
  itemSize: PropTypes.number,
  children: PropTypes.any.isRequired,
  /** Called when the list scroll positions changes */
  onScroll: PropTypes.func,
};

export default InfiniteLoaderComponent;
