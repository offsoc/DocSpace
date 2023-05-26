import React from "react";
import { inject, observer } from "mobx-react";

import Checkbox from "@docspace/components/checkbox";
import Text from "@docspace/components/text";
import { StyledInterfaceDirection } from "./StyledInterfaceDirection";

const InterfaceDirection = ({ interfaceDirection, setInterfaceDirection }) => {
  const onChangeDirection = (e) => {
    const isChecked = e.currentTarget.checked;

    if (isChecked) {
      setInterfaceDirection("RTL");
    } else {
      setInterfaceDirection("LTR");
    }
  };

  return (
    <StyledInterfaceDirection>
      <Text className="title" fontSize="16px" fontWeight={700}>
        Interface direction
      </Text>
      <Checkbox
        value={interfaceDirection}
        isChecked={interfaceDirection === "RTL"}
        onChange={onChangeDirection}
        label={"Enable right-to-left mode"}
      />
    </StyledInterfaceDirection>
  );
};

export default inject(({ auth }) => {
  const { settingsStore } = auth;
  const { interfaceDirection, setInterfaceDirection } = settingsStore;

  return {
    interfaceDirection,
    setInterfaceDirection,
  };
})(observer(InterfaceDirection));
