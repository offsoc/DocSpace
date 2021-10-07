import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import Filter from "@appserver/common/api/people/filter";
import PageLayout from "@appserver/common/components/PageLayout";
import { showLoader, hideLoader } from "@appserver/common/utils";
import {
  ArticleHeaderContent,
  ArticleBodyContent,
  ArticleMainButtonContent,
} from "../../components/Article";
import {
  SectionHeaderContent,
  SectionBodyContent,
  SectionFilterContent,
  SectionPagingContent,
} from "./Section";
import { inject, observer } from "mobx-react";
import { isMobile } from "react-device-detect";
import { withTranslation } from "react-i18next";
import Dialogs from "./Section/Body/Dialogs"; //TODO: Move dialogs to another folder

const PureHome = ({
  isLoading,
  history,
  getUsersList,
  setIsLoading,
  setIsRefresh,
  selectedGroup,
  tReady,
}) => {
  const { location } = history;
  const { pathname } = location;
  //console.log("People Home render");

  useEffect(() => {
    if (pathname.indexOf("/people/filter") > -1) {
      setIsLoading(true);
      setIsRefresh(true);
      const newFilter = Filter.getFilter(location);
      //console.log("PEOPLE URL changed", pathname, newFilter);
      getUsersList(newFilter).finally(() => {
        setIsLoading(false);
        setIsRefresh(false);
      });
    }
  }, [pathname, location]);
  useEffect(() => {
    if (isMobile) {
      const customScrollElm = document.querySelector(
        "#customScrollBar > .scroll-body"
      );
      customScrollElm && customScrollElm.scrollTo(0, 0);
    }
  }, [selectedGroup]);

  useEffect(() => {
    isLoading ? showLoader() : hideLoader();
  }, [isLoading]);

  return (
    <>
      <PageLayout
        withBodyScroll
        withBodyAutoFocus={!isMobile}
        isLoading={isLoading}
      >
        <PageLayout.ArticleHeader>
          <ArticleHeaderContent />
        </PageLayout.ArticleHeader>

        <PageLayout.ArticleMainButton>
          <ArticleMainButtonContent />
        </PageLayout.ArticleMainButton>

        <PageLayout.ArticleBody>
          <ArticleBodyContent />
        </PageLayout.ArticleBody>

        <PageLayout.SectionHeader>
          <SectionHeaderContent />
        </PageLayout.SectionHeader>

        <PageLayout.SectionFilter>
          <SectionFilterContent />
        </PageLayout.SectionFilter>

        <PageLayout.SectionBody>
          <SectionBodyContent />
        </PageLayout.SectionBody>

        <PageLayout.SectionPaging>
          <SectionPagingContent tReady={tReady} />
        </PageLayout.SectionPaging>
      </PageLayout>

      <Dialogs />
    </>
  );
};

PureHome.propTypes = {
  isLoading: PropTypes.bool,
};

const Home = withTranslation("Home")(PureHome);

export default inject(({ peopleStore }) => {
  const { usersStore, selectedGroupStore, loadingStore } = peopleStore;
  const { getUsersList } = usersStore;
  const { selectedGroup } = selectedGroupStore;
  const { isLoading, setIsLoading, setIsRefresh } = loadingStore;

  return {
    isLoading,
    getUsersList,
    setIsLoading,
    setIsRefresh,
    selectedGroup,
  };
})(observer(withRouter(Home)));
