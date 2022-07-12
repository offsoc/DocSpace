import React from "react";
import { withTranslation } from "react-i18next";
import { inject, observer } from "mobx-react";
import { isMobileOnly } from "react-device-detect";
import Button from "@appserver/components/button";
import Loader from "@appserver/components/loader";
import Checkbox from "@appserver/components/checkbox";
import Text from "@appserver/components/text";
import RadioButton from "@appserver/components/radio-button";
import toastr from "@appserver/components/toast/toastr";
import { startRestore } from "@appserver/common/api/portal";
import { combineUrl } from "@appserver/common/utils";
import {
  AppServerConfig,
  BackupStorageType,
} from "@appserver/common/constants";
import { request } from "@appserver/common/api/client";
import { StyledRestoreBackup } from "./../StyledBackup";
import BackupListModalDialog from "./sub-components/backup-list";
import Documents from "./sub-components/DocumentsModule";
import ThirdPartyResources from "./sub-components/ThirdPartyResourcesModule";
import ThirdPartyStorages from "./sub-components/ThirdPartyStoragesModule";
import LocalFile from "./sub-components/LocalFileModule";
import config from "../../../../../../../../package.json";
import { getThirdPartyCommonFolderTree } from "@appserver/common/api/files";
import { getBackupStorage } from "@appserver/common/api/settings";

const {
  DocumentModuleType,
  ResourcesModuleType,
  StorageModuleType,
  LocalFileModuleType,
} = BackupStorageType;
class RestoreBackup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: false,
      isNotify: true,
      isVisibleDialog: false,
      isPanelVisible: false,
      isCheckedDocuments: true,
      isCheckedThirdParty: false,
      isCheckedThirdPartyStorage: false,
      isCheckedLocalFile: false,
      selectedFileId: "",
      selectedFile: "",

      isFileSelectedError: false,
      isInitialLoading: true,
      checkingRecoveryData: false,
    };

    this.switches = [
      "isCheckedLocalFile",
      "isCheckedDocuments",
      "isCheckedThirdParty",
      "isCheckedThirdPartyStorage",
    ];

    this.storageId = "";
  }

  setBasicSettings = async () => {
    const {
      getProgress,
      t,
      setCommonThirdPartyList,
      setThirdPartyStorage,
    } = this.props;

    try {
      getProgress(t);
      const [commonThirdPartyList, backupStorage] = await Promise.all([
        getThirdPartyCommonFolderTree(),
        getBackupStorage(),
      ]);

      setThirdPartyStorage(backupStorage);

      commonThirdPartyList && setCommonThirdPartyList(commonThirdPartyList);
    } catch (error) {
      toastr.error(error);
    }

    this.setState({
      isInitialLoading: false,
    });
  };

  componentDidMount() {
    this.setBasicSettings();
  }

  componentWillUnmount() {
    const { clearProgressInterval } = this.props;
    clearProgressInterval();
  }

  onChangeCheckbox = () => {
    this.setState({
      isChecked: !this.state.isChecked,
    });
  };
  onChangeCheckboxNotify = () => {
    this.setState({
      isNotify: !this.state.isNotify,
    });
  };
  onClickBackupList = () => {
    this.setState({
      isVisibleDialog: !this.state.isVisibleDialog,
    });
  };

  onModalClose = () => {
    this.setState({
      isVisibleDialog: false,
    });
  };

  onClickInput = () => {
    this.setState({
      isPanelVisible: true,
    });
  };

  onPanelClose = () => {
    this.setState({
      isPanelVisible: false,
    });
  };
  onClickShowStorage = (e) => {
    let newStateObj = {};
    const name = e.target.name;
    newStateObj[name] = true;

    const newState = this.switches.filter((el) => el !== name);
    newState.forEach((name) => (newStateObj[name] = false));

    this.setState({
      ...newStateObj,
    });
  };

  onSelectFile = (file) => {
    this.setState({
      selectedFileId: file.id,
    });
  };

  onSelectLocalFile = (data) => {
    this.setState({
      selectedFile: data,
    });
  };

  canRestore = () => {
    const {
      isCheckedDocuments,
      isCheckedLocalFile,
      selectedFileId,
      selectedFile,
      isCheckedThirdPartyStorage,
      isCheckedThirdParty,
    } = this.state;

    const { isFormReady } = this.props;

    if (isCheckedDocuments || isCheckedThirdParty) {
      if (!selectedFileId) return false;
      return true;
    }

    if (isCheckedLocalFile) {
      if (!selectedFile) return false;
      return true;
    }

    if (isCheckedThirdPartyStorage) {
      return isFormReady();
    }
  };
  onRestoreClick = async () => {
    const {
      isNotify,
      isCheckedDocuments,
      isCheckedLocalFile,
      selectedFileId,
      selectedFile,
      isCheckedThirdPartyStorage,
      isCheckedThirdParty,
    } = this.state;
    const { history, socketHelper, getStorageParams } = this.props;

    if (!this.canRestore()) {
      this.setState({
        isFileSelectedError: true,
      });
      return;
    }

    this.setState({
      checkingRecoveryData: true,
      isFileSelectedError: false,
    });

    let storageParams = [];
    let obj = {};

    const backupId = "";
    const storageType = isCheckedDocuments
      ? `${DocumentModuleType}`
      : isCheckedThirdParty
      ? `${ResourcesModuleType}`
      : isCheckedLocalFile
      ? `${LocalFileModuleType}`
      : `${StorageModuleType}`;

    if (isCheckedThirdPartyStorage) {
      storageParams = getStorageParams(true, null, this.storageId);
    } else {
      obj.key = "filePath";
      if (isCheckedDocuments || isCheckedThirdParty) {
        obj.value = selectedFileId;
      } else {
        obj.value = "";
      }
      storageParams.push(obj);
    }

    let checkedFile;
    try {
      if (isCheckedLocalFile) {
        checkedFile = await request({
          baseURL: combineUrl(AppServerConfig.proxyURL, config.homepage),
          method: "post",
          url: `/backupFileUpload.ashx`,
          responseType: "text",
          data: selectedFile,
        });
      }
    } catch (e) {
      toastr.error(e);
      this.setState({
        checkingRecoveryData: false,
      });
      return;
    }

    if (isCheckedLocalFile && checkedFile?.Message) {
      toastr.error(checkedFile.Message);
      this.setState({
        checkingRecoveryData: false,
      });
      return;
    }

    console.log(
      "backupId",
      backupId,
      "storageType",
      storageType,
      "storageParams",
      storageParams
    );
    return;
    startRestore(backupId, storageType, storageParams, isNotify)
      .then(() => {
        socketHelper.emit({
          command: "restore-backup",
        });
      })
      .then(() => this.setState({ checkingRecoveryData: false }))
      .then(() =>
        history.push(
          combineUrl(
            AppServerConfig.proxyURL,
            config.homepage,
            "/preparation-portal"
          )
        )
      )
      .catch((error) => {
        toastr.error(error);
        this.setState({
          checkingRecoveryData: false,
        });
      });
  };

  onSetStorageId = (storageId) => {
    this.storageId = storageId;
  };

  render() {
    const {
      t,
      history,
      downloadingProgress,
      commonThirdPartyList,
      buttonSize,
      theme,
    } = this.props;
    const {
      isChecked,
      isInitialLoading,
      isNotify,
      isVisibleDialog,
      isPanelVisible,
      isCheckedDocuments,
      isCheckedThirdParty,
      isCheckedThirdPartyStorage,
      isCheckedLocalFile,
      isStorageFillingError,
      checkingRecoveryData,
      isFileSelectedError,
    } = this.state;

    const commonRadioButtonProps = {
      fontSize: "13px",
      fontWeight: "400",
      value: "value",
      className: "backup_radio-button",
      onClick: this.onClickShowStorage,
    };

    const isDisabledThirdParty = commonThirdPartyList?.length === 0;

    const isMaxProgress = downloadingProgress === 100;

    return isInitialLoading ? (
      <Loader className="pageLoader" type="rombs" size="40px" />
    ) : (
      <StyledRestoreBackup theme={theme}>
        <div className="restore-description">
          <Text className="restore-description">
            {t("RestoreBackupDescription")}
          </Text>
        </div>
        <RadioButton
          label={t("DocumentsModule")}
          name={"isCheckedDocuments"}
          key={1}
          isChecked={isCheckedDocuments}
          isDisabled={false}
          {...commonRadioButtonProps}
        />

        <RadioButton
          label={t("ThirdPartyResource")}
          name={"isCheckedThirdParty"}
          key={2}
          isChecked={isCheckedThirdParty}
          isDisabled={isDisabledThirdParty}
          {...commonRadioButtonProps}
        />

        <RadioButton
          label={t("ThirdPartyStorage")}
          name={"isCheckedThirdPartyStorage"}
          key={3}
          isChecked={isCheckedThirdPartyStorage}
          isDisabled={false}
          {...commonRadioButtonProps}
        />

        <RadioButton
          label={t("LocalFile")}
          name={"isCheckedLocalFile"}
          key={4}
          isChecked={isCheckedLocalFile}
          isDisabled={false}
          {...commonRadioButtonProps}
        />

        <div className="restore-backup_modules">
          {isCheckedDocuments && (
            <Documents
              t={t}
              isPanelVisible={isPanelVisible}
              onClose={this.onPanelClose}
              onClickInput={this.onClickInput}
              onSelectFile={this.onSelectFile}
              isError={isFileSelectedError}
            />
          )}
          {isCheckedThirdParty && (
            <ThirdPartyResources
              t={t}
              isPanelVisible={isPanelVisible}
              onClose={this.onPanelClose}
              onClickInput={this.onClickInput}
              onSelectFile={this.onSelectFile}
              isError={isFileSelectedError}
            />
          )}
          {isCheckedThirdPartyStorage && (
            <ThirdPartyStorages
              onResetFormSettings={this.onResetFormSettings}
              onSetStorageId={this.onSetStorageId}
            />
          )}
          {isCheckedLocalFile && (
            <LocalFile
              hasError={isFileSelectedError}
              onSelectLocalFile={this.onSelectLocalFile}
            />
          )}
        </div>

        <Text className="restore-backup_list" onClick={this.onClickBackupList}>
          {t("BackupList")}
        </Text>

        {isVisibleDialog && (
          <BackupListModalDialog
            isVisibleDialog={isVisibleDialog}
            onModalClose={this.onModalClose}
            isNotify={isNotify}
            isCopyingToLocal={!isMaxProgress}
            history={history}
          />
        )}
        <Checkbox
          truncate
          className="restore-backup-checkbox_notification"
          onChange={this.onChangeCheckboxNotify}
          isChecked={isNotify}
          label={t("SendNotificationAboutRestoring")}
        />

        <Text className="restore-backup_warning">
          {t("Common:Warning")}
          {"!"}
        </Text>
        <Text className="restore-backup_warning-description">
          {t("RestoreBackupWarningText")}
        </Text>
        <Text className="restore-backup_warning-link">
          {t("RestoreBackupResetInfoWarningText")}
        </Text>

        <Checkbox
          truncate
          className="restore-backup-checkbox"
          onChange={this.onChangeCheckbox}
          isChecked={isChecked}
          label={t("UserAgreement")}
        />

        <Button
          className="restore-backup_button"
          label={t("Common:Restore")}
          onClick={this.onRestoreClick}
          primary
          isDisabled={checkingRecoveryData || !isMaxProgress || !isChecked}
          isLoading={checkingRecoveryData}
          size={buttonSize}
          tabIndex={10}
        />
      </StyledRestoreBackup>
    );
  }
}

export default inject(({ auth, backup }) => {
  const { settingsStore } = auth;
  const { socketHelper, theme } = settingsStore;
  const {
    downloadingProgress,
    getProgress,
    clearProgressInterval,
    commonThirdPartyList,
    setCommonThirdPartyList,
    setThirdPartyStorage,
    isFormReady,
    getStorageParams,
  } = backup;

  return {
    setThirdPartyStorage,
    theme,
    clearProgressInterval,
    commonThirdPartyList,
    downloadingProgress,
    socketHelper,
    setCommonThirdPartyList,
    getProgress,
    isFormReady,
    getStorageParams,
  };
})(withTranslation(["Settings", "Common"])(observer(RestoreBackup)));
