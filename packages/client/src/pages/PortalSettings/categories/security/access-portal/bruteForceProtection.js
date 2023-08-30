import { useState, useEffect } from "react";

import { withTranslation } from "react-i18next";
import { inject, observer } from "mobx-react";
import {
  LearnMoreWrapper,
  StyledBruteForceProtection,
} from "../StyledSecurity";
import isEqual from "lodash/isEqual";
import FieldContainer from "@docspace/components/field-container";
import toastr from "@docspace/components/toast/toastr";
import TextInput from "@docspace/components/text-input";
import SaveCancelButtons from "@docspace/components/save-cancel-buttons";
import Text from "@docspace/components/text";
import { size } from "@docspace/components/utils/device";
import { useNavigate, useLocation } from "react-router-dom";
import { saveToSessionStorage, getFromSessionStorage } from "../../../utils";

const BruteForceProtection = (props) => {
  const {
    t,
    numberAttempt,
    blockingTime,
    checkPeriod,
    setBruteForceProtection,
    getBruteForceProtection,
    initSettings,
    isInit,
  } = props;

  const defaultNumberAttempt = numberAttempt.toString();
  const defaultBlockingTime = blockingTime.toString();
  const defaultCheckPeriod = checkPeriod.toString();

  const [currentNumberAttempt, setCurrentNumberAttempt] =
    useState(defaultNumberAttempt);

  const [currentBlockingTime, setCurrentBlockingTime] =
    useState(defaultBlockingTime);
  const [currentCheckPeriod, setCurrentCheckPeriod] =
    useState(defaultCheckPeriod);

  const [showReminder, setShowReminder] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [hasErrorNumberAttempt, setHasErrorNumberAttempt] = useState(false);
  const [hasErrorCheckPeriod, setHasErrorCheckPeriod] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (parseInt(currentNumberAttempt) === 0 || !currentNumberAttempt.trim())
      setHasErrorNumberAttempt(true);
    else if (hasErrorNumberAttempt) setHasErrorNumberAttempt(false);

    if (parseInt(currentCheckPeriod) === 0 || !currentCheckPeriod.trim())
      setHasErrorCheckPeriod(true);
    else if (hasErrorCheckPeriod) setHasErrorCheckPeriod(false);
  }, [
    currentNumberAttempt,
    currentCheckPeriod,
    hasErrorNumberAttempt,
    hasErrorCheckPeriod,
  ]);

  useEffect(() => {
    if (!isInit) return;
    getSettings();
  }, [isLoading]);

  useEffect(() => {
    checkWidth();
    window.addEventListener("resize", checkWidth);

    if (!isInit) initSettings().then(() => setIsLoading(true));
    else setIsLoading(true);

    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  useEffect(() => {
    if (!isLoading) return;

    const defaultSettings = getFromSessionStorage(
      "defaultBruteForceProtection"
    );

    let finishBlockingTime = currentBlockingTime;

    if (
      finishBlockingTime === "" ||
      finishBlockingTime.toString().replace(/^0+/, "") === ""
    )
      finishBlockingTime = "0";
    else finishBlockingTime = finishBlockingTime.toString().replace(/^0+/, "");

    const newSettings = {
      numberAttempt: currentNumberAttempt.replace(/^0+/, ""),
      blockingTime: finishBlockingTime,
      checkPeriod: currentCheckPeriod.replace(/^0+/, ""),
    };

    saveToSessionStorage("currentBruteForceProtection", newSettings);

    if (isEqual(defaultSettings, newSettings)) {
      setShowReminder(false);
    } else {
      setShowReminder(true);
    }
  }, [currentNumberAttempt, currentBlockingTime, currentCheckPeriod]);

  const checkWidth = () => {
    window.innerWidth > size.smallTablet &&
      location.pathname.includes("brute-force-protection") &&
      navigate("/portal-settings/security/access-portal");
  };

  const getSettings = () => {
    const currentSettings = getFromSessionStorage(
      "currentBruteForceProtection"
    );

    let finishBlockingTime = defaultBlockingTime;

    if (
      finishBlockingTime === "" ||
      finishBlockingTime.replace(/^0+/, "") === ""
    )
      finishBlockingTime = "0";
    else finishBlockingTime = finishBlockingTime.replace(/^0+/, "");

    const defaultData = {
      numberAttempt: defaultNumberAttempt.replace(/^0+/, ""),
      blockingTime: finishBlockingTime,
      checkPeriod: defaultCheckPeriod.replace(/^0+/, ""),
    };
    saveToSessionStorage("defaultBruteForceProtection", defaultData);

    if (currentSettings) {
      setCurrentNumberAttempt(currentSettings.numberAttempt);
      setCurrentBlockingTime(currentSettings.blockingTime);
      setCurrentCheckPeriod(currentSettings.checkPeriod);
    } else {
      setCurrentNumberAttempt(defaultNumberAttempt);
      setCurrentBlockingTime(defaultBlockingTime);
      setCurrentCheckPeriod(defaultCheckPeriod);
    }
  };

  const onChangeNumberAttempt = (e) => {
    const inputValue = e.target.value;
    const isPositiveOrZeroNumber =
      Math.sign(inputValue) === 1 || Math.sign(inputValue) === 0;

    if (
      !isPositiveOrZeroNumber ||
      inputValue.indexOf(".") !== -1 ||
      inputValue.length > 4
    )
      return;

    setCurrentNumberAttempt(inputValue.trim());
    setShowReminder(true);
  };

  const onChangeBlockingTime = (e) => {
    const inputValue = e.target.value;
    const isPositiveOrZeroNumber =
      Math.sign(inputValue) === 1 || Math.sign(inputValue) === 0;

    if (
      !isPositiveOrZeroNumber ||
      inputValue.indexOf(".") !== -1 ||
      inputValue.length > 4
    )
      return;

    setCurrentBlockingTime(inputValue.trim());
  };

  const onChangeCheckPeriod = (e) => {
    const inputValue = e.target.value;
    const isPositiveOrZeroNumber =
      Math.sign(inputValue) === 1 || Math.sign(inputValue) === 0;

    if (
      !isPositiveOrZeroNumber ||
      inputValue.indexOf(".") !== -1 ||
      inputValue.length > 4
    )
      return;

    setCurrentCheckPeriod(inputValue.trim());
    setShowReminder(true);
  };

  const onSaveClick = () => {
    if (hasErrorNumberAttempt || hasErrorCheckPeriod) return;

    const numberCurrentNumberAttempt = parseInt(currentNumberAttempt);
    const numberCurrentBlockingTime = parseInt(currentBlockingTime);
    const numberCurrentCheckPeriod = parseInt(currentCheckPeriod);

    let finishBlockingTime = numberCurrentBlockingTime;
    if (currentBlockingTime === "") finishBlockingTime = 0;

    setBruteForceProtection(
      numberCurrentNumberAttempt,
      finishBlockingTime,
      numberCurrentCheckPeriod
    )
      .then(() => {
        saveToSessionStorage("defaultBruteForceProtection", {
          numberAttempt: currentNumberAttempt.replace(/^0+/, ""),
          blockingTime: finishBlockingTime,
          checkPeriod: currentCheckPeriod.replace(/^0+/, ""),
        });

        getBruteForceProtection();
        setShowReminder(false);
        toastr.success(t("SuccessfullySaveSettingsMessage"));
      })
      .catch((error) => {
        toastr.error(error);
      });
  };

  const onCancelClick = () => {
    const defaultSettings = getFromSessionStorage(
      "defaultBruteForceProtection"
    );
    setCurrentNumberAttempt(defaultSettings.numberAttempt);
    setCurrentBlockingTime(defaultSettings.blockingTime);
    setCurrentCheckPeriod(defaultSettings.checkPeriod);
    setShowReminder(false);
  };

  return (
    <StyledBruteForceProtection>
      <LearnMoreWrapper>
        <Text className="page-subtitle">
          When the specified limit is reached, attempts coming from the
          associated IP address will be banned (or, if captcha is configured,
          captcha will be requested) for the chosen period of time.
        </Text>
      </LearnMoreWrapper>

      <FieldContainer labelText={`Number of attempts:`} isVertical={true}>
        <TextInput
          className="brute-force-protection-input"
          tabIndex={5}
          // scale={true}
          value={currentNumberAttempt}
          onChange={onChangeNumberAttempt}
          // isDisabled={
          //   state.isLoadingGreetingSave || state.isLoadingGreetingRestore
          // }
          placeholder="Enter number"
          hasError={hasErrorNumberAttempt}
        />
        {hasErrorNumberAttempt && (
          <div className="errorText">
            Specified argument was out of the range of valid values.
          </div>
        )}
      </FieldContainer>

      <FieldContainer labelText={`Blocking time (sec):`} isVertical={true}>
        <TextInput
          className="brute-force-protection-input"
          tabIndex={5}
          // scale={true}
          value={currentBlockingTime}
          onChange={onChangeBlockingTime}
          // isDisabled={
          //   state.isLoadingGreetingSave || state.isLoadingGreetingRestore
          // }
          placeholder="Enter time"
        />
      </FieldContainer>

      <FieldContainer labelText={`Check period (sec):`} isVertical={true}>
        <TextInput
          className="brute-force-protection-input"
          tabIndex={5}
          // scale={true}
          value={currentCheckPeriod}
          onChange={onChangeCheckPeriod}
          // isDisabled={
          //   state.isLoadingGreetingSave || state.isLoadingGreetingRestore
          // }
          placeholder="Enter time"
          style={{ marginBottom: `24px` }}
          hasError={hasErrorCheckPeriod}
        />
        {hasErrorCheckPeriod && (
          <div className="errorText">
            Specified argument was out of the range of valid values.
          </div>
        )}

        <SaveCancelButtons
          className="save-cancel-buttons"
          onSaveClick={onSaveClick}
          onCancelClick={onCancelClick}
          showReminder={showReminder}
          reminderTest={t("YouHaveUnsavedChanges")}
          saveButtonLabel={t("Common:SaveButton")}
          cancelButtonLabel={t("Common:CancelButton")}
          displaySettings={true}
          hasScroll={false}
          additionalClassSaveButton="session-lifetime-save"
          additionalClassCancelButton="session-lifetime-cancel"
        />
      </FieldContainer>
    </StyledBruteForceProtection>
  );
};

export default inject(({ auth, setup }) => {
  const {
    numberAttempt,
    blockingTime,
    checkPeriod,
    setBruteForceProtection,
    getBruteForceProtection,
  } = auth.settingsStore;

  const { initSettings, isInit } = setup;

  return {
    numberAttempt,
    blockingTime,
    checkPeriod,
    setBruteForceProtection,
    getBruteForceProtection,
    initSettings,
    isInit,
  };
})(withTranslation(["Settings", "Common"])(observer(BruteForceProtection)));
