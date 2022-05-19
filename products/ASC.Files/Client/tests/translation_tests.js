const Endpoints = require("./mocking/endpoints.js");
const changeCulture = require("./helpers/changeCulture.js");
const config = require("../../../../config/appsettings.json");
const ignoringCultures = require("./ignoringCultures.json");

const isModel = !!process.env.MODEL;

const cultures = isModel ? ["en"] : config.web.cultures.split(",");

const isPersonal = !!process.env.PERSONAL;

const settingsFile = isPersonal ? `settingsPersonal` : `settings`;

const settingsTranslationFile = isPersonal
  ? `settingsTranslationPersonal`
  : `settingsTranslation`;

const featureName = isModel
  ? `Files translation(model) `
  : `Files translation tests`;

Feature(featureName, { timeout: 90 });

Before(async ({ I }) => {
  I.mockData();
  if (isPersonal) {
    I.mockEndpoint(Endpoints.settings, settingsFile);
    I.mockEndpoint(Endpoints.root, "personal");
  }
});

for (const culture of cultures) {
  Scenario(`Main page test ${culture}`, { timeout: 30 }, ({ I }) => {
    changeCulture(culture);

    const isException = ignoringCultures.mainPage.indexOf(culture) != -1;

    I.mockEndpoint(Endpoints.my, "default");

    if (!isException) {
      I.mockEndpoint(Endpoints.self, `selfTranslation`);
      I.mockEndpoint(Endpoints.settings, settingsTranslationFile);
    }

    I.amOnPage("/products/files");
    I.wait(3);

    I.see("My documents");

    I.saveScreenshot(`${culture}-main-page.png`);
    I.seeVisualDiff(`${culture}-main-page.png`, {
      tolerance: 0.025,
      prepareBaseImage: false,
      // ignoredBox: { top: 0, left: 0, bottom: 0, right: 1720 },
    });
  });

  Scenario(`Profile menu test ${culture}`, { timeout: 30 }, ({ I }) => {
    changeCulture(culture);
    const isException = ignoringCultures.profileMenu.indexOf(culture) != -1;

    I.mockEndpoint(Endpoints.my, "default");

    if (!isException) {
      I.mockEndpoint(Endpoints.self, `selfTranslation`);
      I.mockEndpoint(Endpoints.settings, settingsTranslationFile);
    }

    I.amOnPage("/products/files");
    I.wait(3);

    I.openProfileMenu();

    I.wait(3);

    I.saveScreenshot(`${culture}-profile-menu.png`);
    I.seeVisualDiff(`${culture}-profile-menu.png`, {
      tolerance: 0.05,
      prepareBaseImage: false,
    });
  });

  Scenario(`Main button test ${culture}`, { timeout: 30 }, ({ I }) => {
    changeCulture(culture);
    const isException = ignoringCultures.mainButton.indexOf(culture) != -1;

    I.mockEndpoint(Endpoints.my, "default");

    if (!isException) {
      I.mockEndpoint(Endpoints.self, `selfTranslation`);
      I.mockEndpoint(Endpoints.settings, settingsTranslationFile);
    }

    I.amOnPage("/products/files");
    I.wait(3);

    I.seeElement({ react: "MainButton" });
    I.click({ react: "MainButton" });

    I.wait(3);

    I.saveScreenshot(`${culture}-main-button.png`);
    I.seeVisualDiff(`${culture}-main-button.png`, {
      tolerance: 0.01,
      prepareBaseImage: false,
      ignoredBox: { top: 0, left: 256, bottom: 0, right: 0 },
    });
  });

  Scenario(`Table settings test ${culture}`, { timeout: 30 }, ({ I }) => {
    const isException = ignoringCultures.tableSettings.indexOf(culture) != -1;

    I.mockEndpoint(Endpoints.my, "default");

    if (!isException) {
      I.mockEndpoint(Endpoints.self, `selfTranslation`);
      I.mockEndpoint(Endpoints.settings, settingsTranslationFile);
    }

    I.amOnPage("/products/files");
    I.wait(3);

    I.seeElement({ react: "TableSettings" });
    I.click({ react: "TableSettings" });

    I.wait(3);

    I.saveScreenshot(`${culture}-table-settings.png`);
    I.seeVisualDiff(`${culture}-table-settings.png`, {
      tolerance: 0.07,
      prepareBaseImage: false,
      ignoredBox: { top: 0, left: 0, bottom: 0, right: 1770 },
    });
  });
}
