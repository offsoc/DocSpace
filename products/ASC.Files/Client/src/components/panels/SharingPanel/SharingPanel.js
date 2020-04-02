import React from "react";
import PropTypes from "prop-types";
import {
  Backdrop,
  Heading,
  Aside,
  IconButton,
  Checkbox,
  Button,
  DropDown,
  DropDownItem,
  ComboBox,
  Row,
  Text,
  Icons,
  utils
} from "asc-web-components";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { withTranslation } from "react-i18next";
import { utils as commonUtils } from "asc-web-common";
import i18n from "./i18n";
import {
  getShareUsersAndGroups,
  setShareData
} from "../../../store/files/actions";
import {
  StyledPanel,
  StyledContent,
  StyledFooter,
  StyledSharingHeaderContent,
  StyledSharingBody
} from "../StyledPanels";

const { changeLanguage } = commonUtils;

class SharingPanelComponent extends React.Component {
  constructor(props) {
    super(props);

    changeLanguage(i18n);

    this.state = {
      showActionPanel: false,
      isNotifyUsers: false,
      shareData: props.shareData
    };

    this.ref = React.createRef();
  }

  onPlusClick = () =>
    this.setState({ showActionPanel: !this.state.showActionPanel });

  onCloseActionPanel = e => {
    if (this.ref.current.contains(e.target)) return;
    this.setState({ showActionPanel: !this.state.showActionPanel });
  };

  onKeyClick = () => console.log("onKeyClick");

  onSaveClick = () => {
    console.log("onSaveClick");
    this.props.onClose();
  };

  onNotifyUsersChange = () =>
    this.setState({ isNotifyUsers: !this.state.isNotifyUsers });

  showAddUserPanel = () => {
    this.props.onShowUsersPanel();
  };
  showAddGroupPanel = () => {
    this.props.onShowGroupsPanel();
  };

  onFullAccessClick = item => {
    const newUsers = this.state.shareData;
    const elementIndex = newUsers.findIndex(x => x.id === item.id);
    if (newUsers[elementIndex].rights.rights !== "FullAccess") {
      newUsers[elementIndex].rights = {
        icon: "AccessEditIcon",
        rights: "FullAccess"
      };
      this.props.onSetUsers(newUsers);
    }
  };
  onReadOnlyClick = item => {
    const newUsers = this.state.shareData;
    const elementIndex = newUsers.findIndex(x => x.id === item.id);
    if (newUsers[elementIndex].rights.rights !== "ReadOnly") {
      newUsers[elementIndex].rights = { icon: "EyeIcon", rights: "ReadOnly" };
      this.props.onSetUsers(newUsers);
    }
  };
  onReviewClick = item => {
    const newUsers = this.state.shareData;
    const elementIndex = newUsers.findIndex(x => x.id === item.id);
    if (newUsers[elementIndex].rights.rights !== "Review") {
      newUsers[elementIndex].rights = {
        icon: "AccessReviewIcon",
        rights: "Review"
      };
      this.props.onSetUsers(newUsers);
    }
  };
  onCommentClick = item => {
    const newUsers = this.state.shareData;
    const elementIndex = newUsers.findIndex(x => x.id === item.id);
    if (newUsers[elementIndex].rights.rights !== "Comment") {
      newUsers[elementIndex].rights = {
        icon: "AccessCommentIcon",
        rights: "Comment"
      };
      this.props.onSetUsers(newUsers);
    }
  };
  onFormFillingClick = item => {
    const newUsers = this.state.shareData;
    const elementIndex = newUsers.findIndex(x => x.id === item.id);
    if (newUsers[elementIndex].rights.rights !== "FormFilling") {
      newUsers[elementIndex].rights = {
        icon: "AccessFormIcon",
        rights: "FormFilling"
      };
      this.props.onSetUsers(newUsers);
    }
  };
  onDenyAccessClick = item => {
    const newUsers = this.state.shareData;
    const elementIndex = newUsers.findIndex(x => x.id === item.id);
    if (newUsers[elementIndex].rights.rights !== "DenyAccess") {
      newUsers[elementIndex].rights = {
        icon: "AccessNoneIcon",
        rights: "DenyAccess"
      };
      this.props.onSetUsers(newUsers);
    }
  };

  onRemoveUserClick = item => {
    const shareData = this.state.shareData;

    const index = shareData.findIndex(x => x.id === item.id);
    if (index !== -1) {
      shareData.splice(index, 1);

      this.setState({ shareData });
      this.props.setShareData(shareData);
      this.forceUpdate();
    }
  };

  getShareData() {
    const foldersIds = [];
    const filesIds = [];

    for (let item of this.props.selection) {
      if (item.fileExst) {
        filesIds.push(item.id);
      } else {
        foldersIds.push(item.id);
      }
    }
    const shareData = [];
    getShareUsersAndGroups(foldersIds, filesIds)
      .then(res => {
        for (let item of res) {
          if (item.isOwner) {
            const rights = {
              icon: "AccessEditIcon",
              rights: "FullAccess",
              isOwner: true
            };
            item.sharedTo = { ...item.sharedTo, ...{ rights } };
          } else {
            //TODO: item.access
            const rights = {
              icon: "EyeIcon",
              rights: "ReadOnly",
              isOwner: false
            };
            item.sharedTo = { ...item.sharedTo, ...{ rights } };
          }
          shareData.push(item.sharedTo);
          this.props.setShareData([item.sharedTo]);
        }
      })
      .then(() => this.setState({ shareData }));
  }

  componentDidUpdate(prevProps, prevState) {
    const { selection, shareData } = this.props;

    if (selection.length !== 0) {
      if (
        !utils.array.isArrayEqual(prevProps.selection, selection) ||
        selection.length !== prevProps.selection.length
      ) {
        this.getShareData(selection);
      }
    }

    if (
      !utils.array.isArrayEqual(this.state.shareData, shareData) ||
      this.state.shareData.length !== shareData.length
    ) {
      this.setState({ shareData });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { showActionPanel, isNotifyUsers } = this.state;
    const { visible, accessOptions, shareData } = this.props;

    if (showActionPanel !== nextState.showActionPanel) {
      return true;
    }

    if (isNotifyUsers !== nextState.isNotifyUsers) {
      return true;
    }

    if (
      !utils.array.isArrayEqual(nextProps.accessOptions, accessOptions) ||
      accessOptions.length !== nextProps.accessOptions.length
    ) {
      return true;
    }

    if (
      !utils.array.isArrayEqual(this.state.shareData, shareData) ||
      this.state.shareData.length !== shareData.length
    ) {
      return true;
    }

    if (
      !utils.array.isArrayEqual(this.state.shareData, nextState.shareData) ||
      this.state.shareData.length !== nextState.shareData.length
    ) {
      return true;
    }

    if (visible !== nextProps.visible) {
      return true;
    }

    return false;
  }

  render() {
    const { onClose, visible, t, accessOptions } = this.props;
    const { showActionPanel, isNotifyUsers, shareData } = this.state;

    const zIndex = 310;

    //console.log("Sharing panel render");

    return (
      <StyledPanel visible={visible}>
        <Backdrop onClick={onClose} visible={visible} zIndex={zIndex} />
        <Aside className="header_aside-panel" visible={visible}>
          <StyledContent>
            <StyledSharingHeaderContent>
              <Heading className="sharing_panel-header" size="medium" truncate>
                {t("SharingSettingsTitle")}
              </Heading>
              <div className="sharing_panel-icons-container">
                <div ref={this.ref} className="sharing_panel-drop-down-wrapper">
                  <IconButton
                    size="16"
                    iconName="PlusIcon"
                    className="sharing_panel-plus-icon"
                    onClick={this.onPlusClick}
                  />

                  <DropDown
                    directionX="right"
                    className="sharing_panel-drop-down"
                    open={showActionPanel}
                    manualY="30px"
                    clickOutsideAction={this.onCloseActionPanel}
                  >
                    <DropDownItem
                      label={t("LinkText")}
                      onClick={this.showAddUserPanel}
                    />
                    <DropDownItem
                      label={t("AddGroupsForSharingButton")}
                      onClick={this.showAddGroupPanel}
                    />
                  </DropDown>
                </div>

                <IconButton
                  size="16"
                  iconName="KeyIcon"
                  onClick={this.onKeyClick}
                />
              </div>
            </StyledSharingHeaderContent>
            <StyledSharingBody>
              {shareData.map((item, index) => {
                const advancedOptions = (
                  <>
                    {accessOptions.includes("FullAccess") && (
                      <DropDownItem
                        label="Full access"
                        icon="AccessEditIcon"
                        onClick={this.onFullAccessClick.bind(this, item)}
                      />
                    )}

                    {accessOptions.includes("ReadOnly") && (
                      <DropDownItem
                        label="Read only"
                        icon="EyeIcon"
                        onClick={this.onReadOnlyClick.bind(this, item)}
                      />
                    )}

                    {accessOptions.includes("Review") && (
                      <DropDownItem
                        label="Review"
                        icon="AccessReviewIcon"
                        onClick={this.onReviewClick.bind(this, item)}
                      />
                    )}

                    {accessOptions.includes("Comment") && (
                      <DropDownItem
                        label="Comment"
                        icon="AccessCommentIcon"
                        onClick={this.onCommentClick.bind(this, item)}
                      />
                    )}

                    {accessOptions.includes("FormFilling") && (
                      <DropDownItem
                        label="Form filling"
                        icon="AccessFormIcon"
                        onClick={this.onFormFillingClick.bind(this, item)}
                      />
                    )}
                    {accessOptions.includes("DenyAccess") && (
                      <DropDownItem
                        label="Deny access"
                        icon="AccessNoneIcon"
                        onClick={this.onDenyAccessClick.bind(this, item)}
                      />
                    )}
                  </>
                );

                const embeddedComponent = (
                  <ComboBox
                    advancedOptions={advancedOptions}
                    options={[]}
                    selectedOption={{ key: 0 }}
                    size="content"
                    className="panel_combo-box"
                    scaled={false}
                    directionX="left"
                    //isDisabled={isDisabled}
                  >
                    {React.createElement(Icons[item.rights.icon], {
                      size: "medium",
                      className: "sharing-access-combo-box-icon"
                    })}
                  </ComboBox>
                );

                return (
                  <Row
                    key={index}
                    element={
                      item.isOwner ? (
                        <Icons.AccessEditIcon
                          size="medium"
                          className="sharing_panel-owner-icon"
                        />
                      ) : (
                        embeddedComponent
                      )
                    }
                    contextButtonSpacerWidth="0px"
                  >
                    <Text truncate>
                      {item.label
                        ? item.label
                        : item.name
                        ? item.name
                        : item.displayName}
                    </Text>
                    {item.isOwner ? (
                      <Text
                        className="sharing_panel-remove-icon"
                        //color="#A3A9AE"
                      >
                        {t("Owner")}
                      </Text>
                    ) : (
                      <IconButton
                        iconName="RemoveIcon"
                        onClick={this.onRemoveUserClick.bind(this, item)}
                        className="sharing_panel-remove-icon"
                        size="medium"
                      />
                    )}
                  </Row>
                );
              })}
            </StyledSharingBody>
            <StyledFooter>
              <Checkbox
                isChecked={isNotifyUsers}
                label={t("Notify users")}
                onChange={this.onNotifyUsersChange}
              />
              <Button
                className="sharing_panel-button"
                label={t("AddButton")}
                size="big"
                primary
                onClick={this.onSaveClick}
              />
            </StyledFooter>
          </StyledContent>
        </Aside>
      </StyledPanel>
    );
  }
}

SharingPanelComponent.propTypes = {
  onClose: PropTypes.func,
  visible: PropTypes.bool,
  onShowUsersPanel: PropTypes.func,
  onShowGroupsPanel: PropTypes.func
};

const SharingPanelContainerTranslated = withTranslation()(
  SharingPanelComponent
);

const SharingPanel = props => (
  <SharingPanelContainerTranslated i18n={i18n} {...props} />
);

const mapStateToProps = state => {
  const { shareData, selection } = state.files;

  return { shareData, selection };
};

export default connect(mapStateToProps, { setShareData })(
  withRouter(SharingPanel)
);
