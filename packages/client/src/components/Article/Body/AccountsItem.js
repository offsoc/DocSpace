import React from "react";
import { withRouter } from "react-router";
import CatalogItem from "@docspace/components/catalog-item";
import { inject, observer } from "mobx-react";
import { withTranslation } from "react-i18next";
import { combineUrl } from "@docspace/common/utils";
import { AppServerConfig } from "@docspace/common/constants";
import withLoader from "../../../HOCs/withLoader";
import config from "../../../../package.json";

const iconUrl = "/static/images/catalog.accounts.react.svg";

const PureAccountsItem = ({
  showText,
  setSelectedFolder,
  setSelectedNode,
  history,
  t,
}) => {
  const onClick = React.useCallback(() => {
    setSelectedFolder(null);

    setSelectedNode(["accounts"]);

    history.push(
      combineUrl(AppServerConfig.proxyURL, config.homepage, "/accounts")
    );
  }, [setSelectedFolder, setSelectedNode, history]);

  return (
    <CatalogItem
      id="accounts"
      key="accounts"
      text={t("Accounts")}
      icon={iconUrl}
      showText={showText}
      onClick={onClick}
    />
  );
};

const AccountsItem = withTranslation(["FilesSettings", "Common"])(
  withRouter(withLoader(PureAccountsItem)(<></>))
);

export default inject(({ auth, treeFoldersStore, selectedFolderStore }) => {
  const { setSelectedFolder } = selectedFolderStore;
  const { setSelectedNode } = treeFoldersStore;
  return {
    showText: auth.settingsStore.showText,
    setSelectedFolder,
    setSelectedNode,
  };
})(observer(AccountsItem));
