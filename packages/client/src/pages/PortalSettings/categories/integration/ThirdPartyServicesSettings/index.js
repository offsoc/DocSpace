import React from "react";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import styled from "styled-components";
import Box from "@docspace/components/box";
import Text from "@docspace/components/text";
import Link from "@docspace/components/link";
import toastr from "@docspace/components/toast/toastr";
import { showLoader, hideLoader } from "@docspace/common/utils";
import ConsumerItem from "./sub-components/consumerItem";
import ConsumerModalDialog from "./sub-components/consumerModalDialog";
import { inject, observer } from "mobx-react";
import { mobile } from "@docspace/components/utils/device";

const RootContainer = styled(Box)`
  max-width: 700px;
  width: 100%;

  .third-party-description {
    color: ${(props) => props.theme.client.settings.common.descriptionColor};
  }

  @media ${mobile} {
    width: calc(100% - 8px);
  }

  .consumers-list-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(293px, 1fr));
    gap: 20px;
  }

  .consumer-item-wrapper {
    border: ${(props) =>
      props.theme.client.settings.integration.separatorBorder};

    border-radius: 6px;
    min-height: 116px;
    padding: 12px 12px 8px 20px;
  }
`;

class ThirdPartyServices extends React.Component {
  constructor(props) {
    super(props);
    const { t, setDocumentTitle } = props;

    setDocumentTitle(`${t("ThirdPartyAuthorization")}`);

    this.state = {
      dialogVisible: false,
      isLoading: false,
    };
  }

  componentDidMount() {
    const { getConsumers } = this.props;
    showLoader();
    getConsumers().finally(() => hideLoader());
  }

  onChangeLoading = (status) => {
    this.setState({
      isLoading: status,
    });
  };

  onModalOpen = () => {
    this.setState({
      dialogVisible: true,
    });
  };

  onModalClose = () => {
    this.setState({
      dialogVisible: false,
    });
    this.props.setSelectedConsumer();
  };

  setConsumer = (e) => {
    this.props.setSelectedConsumer(e.currentTarget.dataset.consumer);
  };

  updateConsumerValues = (obj, isFill) => {
    isFill && this.onChangeLoading(true);

    const prop = [];
    let i = 0;
    let objLength = Object.keys(isFill ? obj : obj.props).length;

    for (i = 0; i < objLength; i++) {
      prop.push({
        name: isFill ? Object.keys(obj)[i] : obj.props[i].name,
        value: isFill ? Object.values(obj)[i] : "",
      });
    }

    const data = {
      name: isFill ? this.state.selectedConsumer : obj.name,
      props: prop,
    };

    this.props
      .updateConsumerProps(data)
      .then(() => {
        isFill && this.onChangeLoading(false);
        isFill
          ? toastr.success(this.props.t("ThirdPartyPropsActivated"))
          : toastr.success(this.props.t("ThirdPartyPropsDeactivated"));
      })
      .catch((error) => {
        isFill && this.onChangeLoading(false);
        toastr.error(error);
      })

      .finally(isFill && this.onModalClose());
  };

  render() {
    const {
      t,
      i18n,
      consumers,
      updateConsumerProps,
      integrationSettingsUrl,
      theme,
      currentColorScheme,
    } = this.props;
    const { dialogVisible, isLoading } = this.state;
    const { onModalClose, onModalOpen, setConsumer, onChangeLoading } = this;

    return (
      <>
        <RootContainer className="RootContainer">
          <Text className="third-party-description">
            {t("ThirdPartyTitleDescription")}
          </Text>
          <Box marginProp="8px 0 24px 0">
            <Link
              color={currentColorScheme.main.accent}
              isHovered
              target="_blank"
              href={integrationSettingsUrl}
            >
              {t("Common:LearnMore")}
            </Link>
          </Box>

          <div className="consumers-list-container">
            {consumers
              .filter((consumer) => consumer.title !== "Bitly")
              .map((consumer) => (
                <Box className="consumer-item-wrapper" key={consumer.name}>
                  <ConsumerItem
                    consumer={consumer}
                    dialogVisible={dialogVisible}
                    isLoading={isLoading}
                    onChangeLoading={onChangeLoading}
                    onModalClose={onModalClose}
                    onModalOpen={onModalOpen}
                    setConsumer={setConsumer}
                    updateConsumerProps={updateConsumerProps}
                    t={t}
                  />
                </Box>
              ))}
          </div>
        </RootContainer>
        {dialogVisible && (
          <ConsumerModalDialog
            t={t}
            i18n={i18n}
            dialogVisible={dialogVisible}
            isLoading={isLoading}
            onModalClose={onModalClose}
            onChangeLoading={onChangeLoading}
            updateConsumerProps={updateConsumerProps}
          />
        )}
      </>
    );
  }
}

ThirdPartyServices.propTypes = {
  t: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired,
  consumers: PropTypes.arrayOf(PropTypes.object).isRequired,
  integrationSettingsUrl: PropTypes.string,
  getConsumers: PropTypes.func.isRequired,
  updateConsumerProps: PropTypes.func.isRequired,
  setSelectedConsumer: PropTypes.func.isRequired,
};

export default inject(({ setup, auth }) => {
  const { settingsStore, setDocumentTitle } = auth;
  const { integrationSettingsUrl, theme, currentColorScheme } = settingsStore;
  const {
    getConsumers,
    integration,
    updateConsumerProps,
    setSelectedConsumer,
  } = setup;
  const { consumers } = integration;

  return {
    theme,
    consumers,
    integrationSettingsUrl,
    getConsumers,
    updateConsumerProps,
    setSelectedConsumer,
    setDocumentTitle,
    currentColorScheme,
  };
})(withTranslation(["Settings", "Common"])(observer(ThirdPartyServices)));
