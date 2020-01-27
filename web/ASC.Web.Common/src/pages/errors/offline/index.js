import React, { useEffect } from 'react';
import { connect } from "react-redux";
import ErrorContainer from '../../../components/ErrorContainer';
import { useTranslation } from 'react-i18next';
import i18n from './i18n';

const ErrorOfflineContainer = ({language}) => {
  const { t } = useTranslation('translation', { i18n });

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return <ErrorContainer headerText={t("ErrorOfflineText")} />;
};

function mapStateToProps(state) {
  return {
      language: state.auth.user.cultureName || state.auth.settings.culture,
  };
}

const Offline = connect(mapStateToProps)(ErrorOfflineContainer);

export default Offline;
