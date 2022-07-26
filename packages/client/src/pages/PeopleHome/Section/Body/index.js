import React from "react";
import { inject, observer } from "mobx-react";
import Loaders from "@docspace/common/components/Loaders";
import { withTranslation } from "react-i18next";
import withLoader from "../../../../HOCs/withLoader";
import PeopleRowContainer from "./RowView/PeopleRowContainer";
import TableView from "./TableView/TableContainer";
import { Consumer } from "@docspace/components/utils/context";

class SectionBodyContent extends React.Component {
  render() {
    const { tReady, viewAs } = this.props;

    return (
      <Consumer>
        {(context) =>
          viewAs === "table" ? (
            <>
              <TableView sectionWidth={context.sectionWidth} tReady={tReady} />
            </>
          ) : (
            <>
              <PeopleRowContainer
                sectionWidth={context.sectionWidth}
                tReady={tReady}
              />
            </>
          )
        }
      </Consumer>
    );
  }
}

export default inject(({ peopleStore }) => {
  const { viewAs } = peopleStore;

  return { viewAs };
})(
  withTranslation(["People", "Common", "PeopleTranslations"])(
    withLoader(observer(SectionBodyContent))(
      <Loaders.Rows isRectangle={false} />
    )
  )
);
