import React from "react";
import { inject, observer } from "mobx-react";

import {
  ChangeEmailDialog,
  ChangePasswordDialog,
  ChangePortalOwnerDialog,
  DeleteSelfProfileDialog,
  DeleteProfileEverDialog,
  ChangeUserTypeDialog,
  ChangeUserStatusDialog,
  SendInviteDialog,
  ChangeNameDialog,
  ResetApplicationDialog,
  DataReassignmentDialog,
} from "SRC_DIR/components/dialogs";

const Dialogs = ({
  changeEmail,
  changePassword,
  changeOwner,
  deleteSelfProfile,
  deleteProfileEver,
  data,
  closeDialogs,
  changeUserTypeDialogVisible,
  guestDialogVisible,
  changeUserStatusDialogVisible,
  disableDialogVisible,
  sendInviteDialogVisible,
  resetAuthDialogVisible,

  changeNameVisible,
  setChangeNameVisible,
  profile,
  resetTfaApp,
  dataReassignmentDialogVisible,
}) => {
  return (
    <>
      {changeEmail && (
        <ChangeEmailDialog
          visible={changeEmail}
          onClose={closeDialogs}
          user={data}
          fromList
        />
      )}
      {changePassword && (
        <ChangePasswordDialog
          visible={changePassword}
          onClose={closeDialogs}
          email={data.email}
        />
      )}
      {changeOwner && (
        <ChangePortalOwnerDialog visible={changeOwner} onClose={closeDialogs} />
      )}
      {deleteSelfProfile && (
        <DeleteSelfProfileDialog
          visible={deleteSelfProfile}
          onClose={closeDialogs}
          email={data.email}
        />
      )}
      {deleteProfileEver && (
        <DeleteProfileEverDialog
          visible={deleteProfileEver}
          onClose={closeDialogs}
          users={data}
        />
      )}
      {changeUserTypeDialogVisible && (
        <ChangeUserTypeDialog
          visible={changeUserTypeDialogVisible}
          onClose={closeDialogs}
          {...data}
        />
      )}
      {changeUserStatusDialogVisible && (
        <ChangeUserStatusDialog
          visible={changeUserStatusDialogVisible}
          onClose={closeDialogs}
          {...data}
        />
      )}
      {sendInviteDialogVisible && (
        <SendInviteDialog
          visible={sendInviteDialogVisible}
          onClose={closeDialogs}
        />
      )}

      {changeNameVisible && (
        <ChangeNameDialog
          visible={changeNameVisible}
          onClose={() => setChangeNameVisible(false)}
          profile={profile}
          fromList
        />
      )}

      {resetAuthDialogVisible && (
        <ResetApplicationDialog
          visible={resetAuthDialogVisible}
          onClose={closeDialogs}
          resetTfaApp={resetTfaApp}
          id={data}
        />
      )}

      {dataReassignmentDialogVisible && (
        <DataReassignmentDialog
          visible={dataReassignmentDialogVisible}
          users={data}
        />
      )}
    </>
  );
};

export default inject(({ auth, peopleStore }) => {
  const {
    changeEmail,
    changePassword,
    changeOwner,
    deleteSelfProfile,
    deleteProfileEver,
    data,
    closeDialogs,

    changeUserTypeDialogVisible,
    guestDialogVisible,
    changeUserStatusDialogVisible,
    disableDialogVisible,
    sendInviteDialogVisible,
    resetAuthDialogVisible,
    dataReassignmentDialogVisible,
  } = peopleStore.dialogStore;

  const { user: profile } = auth.userStore;

  const { changeNameVisible, setChangeNameVisible } =
    peopleStore.targetUserStore;

  const { tfaStore } = auth;

  const { unlinkApp: resetTfaApp } = tfaStore;

  return {
    changeEmail,
    changePassword,
    changeOwner,
    deleteSelfProfile,
    deleteProfileEver,
    data,
    closeDialogs,

    changeUserTypeDialogVisible,
    guestDialogVisible,
    changeUserStatusDialogVisible,
    disableDialogVisible,
    sendInviteDialogVisible,
    resetAuthDialogVisible,

    changeNameVisible,
    setChangeNameVisible,
    profile,

    resetTfaApp,
    dataReassignmentDialogVisible,
  };
})(observer(Dialogs));
