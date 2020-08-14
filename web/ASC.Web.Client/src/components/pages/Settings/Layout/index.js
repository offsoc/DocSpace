import React, { useEffect } from "react";
import { connect } from "react-redux";
import { PageLayout } from "asc-web-common";
import { I18nextProvider } from "react-i18next";
import { ArticleHeaderContent, ArticleBodyContent } from "./Article";
import { SectionHeaderContent } from "./Section";
import { store } from "asc-web-common";

import { createI18N } from "../../../../helpers/i18n";

const i18n = createI18N({
  page: "Settings",
  localesPath: "pages/Settings"
});

const { setCurrentProductId } = store.auth.actions;

const Layout = ({
  currentProductId,
  setCurrentProductId,
  language,
  children
}) => {
  useEffect(() => {
    currentProductId !== "settings" && setCurrentProductId("settings");
    i18n.changeLanguage(language);
  }, [language, currentProductId, setCurrentProductId]);

  return (
    <I18nextProvider i18n={i18n}>
      <PageLayout withBodyScroll={true}>
        <PageLayout.ArticleHeader>
          <ArticleHeaderContent />
        </PageLayout.ArticleHeader>

        <PageLayout.ArticleBody>
          <ArticleBodyContent />
        </PageLayout.ArticleBody>

        <PageLayout.SectionHeader>
          <SectionHeaderContent />
        </PageLayout.SectionHeader>

        <PageLayout.SectionBody>{children}</PageLayout.SectionBody>
      </PageLayout>
    </I18nextProvider>
  );
};

function mapStateToProps(state) {
  return {
    language: state.auth.user.cultureName || state.auth.settings.culture
  };
}

export default connect(
  mapStateToProps,
  { setCurrentProductId }
)(Layout);
