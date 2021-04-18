import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { withTranslation } from "react-i18next";
import styled from "styled-components";
import Button from "@appserver/components/button";
import TextInput from "@appserver/components/text-input";
import Text from "@appserver/components/text";
import PageLayout from "@appserver/common/components/PageLayout";
import { inject, observer } from "mobx-react";
import Box from "@appserver/components/box";
import Link from "@appserver/components/link";

const StyledForm = styled(Box)`
  margin: 63px auto auto 216px;
  width: 570px;
  display: flex;
  flex: 1fr 1fr;
  gap: 50px;
  flex-direction: row;
  .set-app-text {
    margin-bottom: 14px;
  }
`;

const TfaActivationForm = (props) => {
  const { t } = props;

  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {
    console.log(`Received code: ${code}`);
  };

  const onKeyPress = (target) => {
    if (target.code === "Enter") onSubmit();
  };

  return (
    <StyledForm className="set-app-container">
      <div>
        <Box className="set-app-description" marginProp="0 0 32px 0">
          <Text isBold fontSize="14px" className="set-app-text">
            {t("SetAppTitle")}
          </Text>
          <Text className="set-app-text">{t("SetAppDescription")}</Text>
          <Text>{t("SetAppInstallDescription")}</Text>
        </Box>
        <Box displayProp="flex">
          <Box className="app-code-input">
            <TextInput
              id="code"
              name="code"
              type="text"
              size="base"
              scale
              isAutoFocussed
              tabIndex={1}
              placeholder={t("EnterCodePlaceholder")}
              isDisabled={isLoading}
              onChange={(e) => setCode(e.target.value)}
              value={code}
            />
          </Box>
          <Box className="app-code-continue-btn" marginProp="0 0 0 8px">
            <Button
              primary
              size="medium"
              tabIndex={3}
              label={isLoading ? t("LoadingProcessing") : t("SetAppButton")}
              isDisabled={!code.length || isLoading}
              isLoading={isLoading}
              onClick={onSubmit}
            />
          </Box>
        </Box>
      </div>
      <div>QR-code</div>
    </StyledForm>
  );
};

const TfaActivationFormWrapper = (props) => {
  return (
    <PageLayout>
      <PageLayout.SectionBody>
        <TfaActivationForm {...props} />
      </PageLayout.SectionBody>
    </PageLayout>
  );
};

export default inject(({ auth }) => ({
  isLoaded: auth.isLoaded,
}))(withRouter(withTranslation("Confirm")(observer(TfaActivationFormWrapper))));
