import React from "react";
import { inject, observer } from "mobx-react";
import styled, { css } from "styled-components";

const StyledIcon = styled.img`
  /* width: 24px;
  height: 24px;
  margin-top: 4px; */

  ${(props) =>
    props.isRoom &&
    css`
      border-radius: 6px;
    `}
`;

const EncryptedFileIcon = styled.div`
  background: url("images/security.svg") no-repeat 0 0 / 16px 16px transparent;
  height: 16px;
  position: absolute;
  width: 16px;
  margin-top: 14px;
  margin-left: 12px;
`;

const ItemIcon = ({ icon, fileExst, isPrivacy, isRoom }) => {
  return (
    <>
      <StyledIcon className={`react-svg-icon`} isRoom={isRoom} src={icon} />
      {isPrivacy && fileExst && <EncryptedFileIcon isEdit={false} />}
    </>
  );
};

export default inject(({ treeFoldersStore }) => {
  return {
    isPrivacy: treeFoldersStore.isPrivacyFolder,
  };
})(observer(ItemIcon));
