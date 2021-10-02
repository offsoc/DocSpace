import React from "react";

import { withTranslation } from "react-i18next";

import Button from "@appserver/components/button";
import Loader from "@appserver/components/loader";
import Checkbox from "@appserver/components/checkbox";
import Text from "@appserver/components/text";
import RadioButton from "@appserver/components/radio-button";
import SelectFolderDialog from "files/SelectFolderDialog";
import { StyledRestoreBackup } from "./styled-backup";
import BackupListModalDialog from "./sub-components-restore-backup/backupListModalDialog";
import Documents from "./sub-components-restore-backup/documents";
import ThirdPartyResources from "./sub-components-restore-backup/thirdPartyResources";
import ThirdPartyStorages from "./sub-components-restore-backup/thirdPartyStorages";
import LocalFile from "./sub-components-restore-backup/localFile";
import toastr from "@appserver/components/toast/toastr";
import { startRestore } from "../../../../../../../../packages/asc-web-common/api/portal";

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
      formSettings: {},
      isErrors: {},
    };
  }

  componentDidMount() {
    this.setState(
      {
        isLoading: true,
      },
      function () {
        SelectFolderDialog.getCommonThirdPartyList()
          .then(
            (thirdPartyArray) => (this.commonThirdPartyList = thirdPartyArray)
          )
          .finally(() =>
            this.setState({
              isLoading: false,
            })
          );
      }
    );
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
    const {
      isCheckedTemporaryStorage,
      isCheckedDocuments,
      isCheckedThirdParty,
      isCheckedThirdPartyStorage,
      isCheckedLocalFile,
    } = this.state;
    const name = e.target.name;

    switch (+name) {
      case 0:
        if (isCheckedDocuments) {
          this.setState({
            isCheckedDocuments: false,
            isCheckedTemporaryStorage: true,
          });
        }
        if (isCheckedThirdParty) {
          this.setState({
            isCheckedThirdParty: false,
            isCheckedTemporaryStorage: true,
          });
        }
        if (isCheckedThirdPartyStorage) {
          this.setState({
            isCheckedThirdPartyStorage: false,
            isCheckedTemporaryStorage: true,
          });
        }
        if (isCheckedLocalFile) {
          this.setState({
            isCheckedLocalFile: false,
            isCheckedTemporaryStorage: true,
          });
        }
        break;
      case 1:
        if (isCheckedTemporaryStorage) {
          this.setState({
            isCheckedTemporaryStorage: false,
            isCheckedDocuments: true,
          });
        }
        if (isCheckedThirdParty) {
          this.setState({
            isCheckedThirdParty: false,
            isCheckedDocuments: true,
          });
        }
        if (isCheckedThirdPartyStorage) {
          this.setState({
            isCheckedThirdPartyStorage: false,
            isCheckedDocuments: true,
          });
        }
        if (isCheckedLocalFile) {
          this.setState({
            isCheckedLocalFile: false,
            isCheckedDocuments: true,
          });
        }
        break;

      case 2:
        if (isCheckedTemporaryStorage) {
          this.setState({
            isCheckedTemporaryStorage: false,
            isCheckedThirdParty: true,
          });
        }
        if (isCheckedDocuments) {
          this.setState({
            isCheckedDocuments: false,
            isCheckedThirdParty: true,
          });
        }
        if (isCheckedThirdPartyStorage) {
          this.setState({
            isCheckedThirdPartyStorage: false,
            isCheckedThirdParty: true,
          });
        }
        if (isCheckedLocalFile) {
          this.setState({
            isCheckedLocalFile: false,
            isCheckedThirdParty: true,
          });
        }
        break;

      case 3:
        if (isCheckedTemporaryStorage) {
          this.setState({
            isCheckedTemporaryStorage: false,
            isCheckedThirdPartyStorage: true,
          });
        }
        if (isCheckedDocuments) {
          this.setState({
            isCheckedDocuments: false,
            isCheckedThirdPartyStorage: true,
          });
        }
        if (isCheckedThirdParty) {
          this.setState({
            isCheckedThirdParty: false,
            isCheckedThirdPartyStorage: true,
          });
        }
        if (isCheckedLocalFile) {
          this.setState({
            isCheckedLocalFile: false,
            isCheckedThirdPartyStorage: true,
          });
        }
        break;
      default:
        if (isCheckedTemporaryStorage) {
          this.setState({
            isCheckedTemporaryStorage: false,
            isCheckedLocalFile: true,
          });
        }
        if (isCheckedDocuments) {
          this.setState({
            isCheckedDocuments: false,
            isCheckedLocalFile: true,
          });
        }
        if (isCheckedThirdParty) {
          this.setState({
            isCheckedThirdParty: false,
            isCheckedLocalFile: true,
          });
        }
        if (isCheckedThirdPartyStorage) {
          this.setState({
            isCheckedThirdPartyStorage: false,
            isCheckedLocalFile: true,
          });
        }
        break;
    }
  };

  onSelectFile = (id) => {
    this.setState({
      selectedFileId: id,
    });
  };

  onSelectLocalFile = (data) => {
    this.setState({
      selectedFile: data,
    });
  };

  onRestoreClick = () => {
    console.log("restore button");
    console.log("formSettings", this.state.formSettings);

    const {
      isNotify,
      isCheckedDocuments,
      isCheckedLocalFile,
      selectedFileId,
      selectedFile,
      isCheckedThirdPartyStorage,
    } = this.state;

    //if (!selectedFileId || !selectedFile) return;

    let backupId, storageType, storageParams;

    if (isCheckedDocuments) {
      backupId = "";
      storageType = "0";
      storageParams = [
        {
          key: "filePath",
          value: selectedFileId,
        },
      ];
    }
    if (isCheckedLocalFile) {
      backupId = "";
      storageType = "3";
      storageParams = [
        {
          key: "filePath",
          value: selectedFile,
        },
      ];
    }

    if (isCheckedThirdPartyStorage) {
      let errorObject = {};

      for (let key of this.formNames) {
        errorObject = {
          ...errorObject,
          [key]: this.state.formSettings[key]
            ? !this.state.formSettings[key].trim()
            : true,
        };
      }
      this.setState({
        isErrors: errorObject,
      });
    }

    // startRestore(
    //   backupId,
    //   storageType,
    //   storageParams,
    //   isNotify
    // ).catch((error) => toastr.error(error));

    //errorObject = {}
  };

  onSetFormNames = (namesArray) => {
    this.formNames = namesArray;
    console.log(" this.formNames", this.formNames);
  };

  onChange = (event) => {
    const { target } = event;
    const value = target.value;
    const name = target.name;
    const { formSettings } = this.state;

    this.setState({ formSettings: { ...formSettings, ...{ [name]: value } } });
  };

  onResetFormSettings = () => {
    this.setState({
      formSettings: {},
      isErrors: {},
    });
  };
  render() {
    const { t } = this.props;
    const {
      isChecked,
      isLoading,
      isNotify,
      isVisibleDialog,
      isPanelVisible,
      isCheckedDocuments,
      isCheckedThirdParty,
      isCheckedThirdPartyStorage,
      isCheckedLocalFile,
      isMountThirdPartyStorage,
      formSettings,
      isErrors,
    } = this.state;
    console.log(" this.setState", this.state);
    return isLoading ? (
      <Loader className="pageLoader" type="rombs" size="40px" />
    ) : (
      <StyledRestoreBackup>
        <div className="restore-description">
          <Text className="backup-description">
            {t("DataRestoreDescription")}
          </Text>
        </div>
        <RadioButton
          fontSize="13px"
          fontWeight="400"
          label={t("DocumentsModule")}
          name={"1"}
          key={1}
          onClick={this.onClickShowStorage}
          isChecked={isCheckedDocuments}
          isDisabled={false}
          value="value"
          className="backup_radio-button"
        />

        <RadioButton
          fontSize="13px"
          fontWeight="400"
          label={t("ThirdPartyResource")}
          name={"2"}
          key={2}
          onClick={this.onClickShowStorage}
          isChecked={isCheckedThirdParty}
          isDisabled={
            this.commonThirdPartyList && this.commonThirdPartyList.length === 0
          }
          value="value"
          className="backup_radio-button"
        />

        <RadioButton
          fontSize="13px"
          fontWeight="400"
          label={t("ThirdPartyStorage")}
          name={"3"}
          key={3}
          onClick={this.onClickShowStorage}
          isChecked={isCheckedThirdPartyStorage}
          isDisabled={false}
          value="value"
          className="backup_radio-button"
        />

        <RadioButton
          fontSize="13px"
          fontWeight="400"
          label={t("LocalFile")}
          name={"4"}
          key={4}
          onClick={this.onClickShowStorage}
          isChecked={isCheckedLocalFile}
          isDisabled={false}
          value="value"
          className="backup_radio-button"
        />

        {isCheckedDocuments && (
          <Documents
            isPanelVisible={isPanelVisible}
            onClose={this.onPanelClose}
            onClickInput={this.onClickInput}
            onSelectFile={this.onSelectFile}
          />
        )}
        {isCheckedThirdParty && (
          <ThirdPartyResources
            isPanelVisible={isPanelVisible}
            onClose={this.onPanelClose}
            onClickInput={this.onClickInput}
            onSelectFile={this.onSelectFile}
          />
        )}
        {isCheckedThirdPartyStorage && (
          <ThirdPartyStorages
            onSetStorageForm={this.onSetStorageForm}
            onSetFormNames={this.onSetFormNames}
            onChange={this.onChange}
            formSettings={formSettings}
            onResetFormSettings={this.onResetFormSettings}
            isErrors={isErrors}
          />
        )}
        {isCheckedLocalFile && (
          <LocalFile onSelectLocalFile={this.onSelectLocalFile} />
        )}
        <Text className="restore-backup_list" onClick={this.onClickBackupList}>
          {t("BackupList")}
        </Text>
        {isVisibleDialog && (
          <BackupListModalDialog
            t={t}
            isVisibleDialog={isVisibleDialog}
            isLoading={isLoading}
            onModalClose={this.onModalClose}
            isNotify={isNotify}
          />
        )}
        <Checkbox
          truncate
          className="restore-backup-checkbox_notification"
          onChange={this.onChangeCheckboxNotify}
          isChecked={isNotify}
          label={t("UserNotification")}
        />

        <Text className="backup-description restore-source restore-warning">
          {t("Common:Warning")}
          {"!"}
        </Text>
        <Text className="backup-description ">
          {t("RestoreSettingsWarning")}
        </Text>
        <Text className="backup-description restore-warning_link">
          {t("RestoreSettingsLink")}
        </Text>

        <Checkbox
          truncate
          className="restore-backup-checkbox"
          onChange={this.onChangeCheckbox}
          isChecked={isChecked}
          label={t("UserAgreement")}
        />

        <Button
          label={t("RestoreButton")}
          onClick={this.onRestoreClick}
          primary
          isDisabled={!isChecked}
          size="medium"
          tabIndex={10}
        />
      </StyledRestoreBackup>
    );
  }
}

export default withTranslation(["Settings", "Common"])(RestoreBackup);
