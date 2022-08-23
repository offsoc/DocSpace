import React from "react";
import { useSSR } from "react-i18next";
import { fonts } from "@docspace/common/fonts";
import GlobalStyle from "./components/GlobalStyle";
import { inject, observer, Provider as MobxProvider } from "mobx-react";
import ThemeProvider from "@docspace/components/theme-provider";
import store from "client/store";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import Login from "./components/Login";

const ThemeProviderWrapper = inject(({ auth }) => {
  const { settingsStore } = auth;
  return { theme: settingsStore.theme };
})(observer(ThemeProvider));

interface ILoginProps extends IInitialState {
  initialLanguage: string;
  initialI18nStoreASC: any;
  isDesktopEditor: boolean;
}
const App: React.FC<ILoginProps> = ({
  initialLanguage,
  initialI18nStoreASC,
  isDesktopEditor,
  ...rest
}) => {
  useSSR(initialI18nStoreASC, initialLanguage);

  return (
    <MobxProvider {...store}>
      <I18nextProvider i18n={i18n}>
        <ThemeProviderWrapper>
          <GlobalStyle fonts={fonts} />
          <Login {...rest} isDesktopEditor={isDesktopEditor} />
        </ThemeProviderWrapper>
      </I18nextProvider>
    </MobxProvider>
  );
};

export default App;
