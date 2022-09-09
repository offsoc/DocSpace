import { makeAutoObservable } from "mobx";

class DialogStore {
  changeName = false;
  changeEmail = false;
  changePassword = false;
  changeOwner = false;
  deleteSelfProfile = false;
  deleteProfileEver = false;
  data = {};

  employeeDialogVisible = false;
  guestDialogVisible = false;
  activeDialogVisible = false;
  disableDialogVisible = false;
  sendInviteDialogVisible = false;
  invitationDialogVisible = false;
  deleteDialogVisible = false;

  constructor() {
    makeAutoObservable(this);
  }

  setChangeNameDialogVisible = (visible) => {
    this.changeName = visible;
  };

  setChangeEmailDialogVisible = (visible) => {
    this.changeEmail = visible;
  };

  setChangePasswordDialogVisible = (visible) => {
    this.changePassword = visible;
  };

  setChangeOwnerDialogVisible = (visible) => {
    this.changeOwner = visible;
  };

  setDeleteSelfProfileDialogVisible = (visible) => {
    this.deleteSelfProfile = visible;
  };

  setDeleteProfileDialogVisible = (visible) => {
    this.deleteProfileEver = visible;
  };

  setDialogData = (data) => {
    this.data = data;
  };

  setEmployeeDialogVisible = (visible) => {
    this.employeeDialogVisible = visible;
  };

  setGuestDialogVisible = (visible) => {
    this.guestDialogVisible = visible;
  };

  setActiveDialogVisible = (visible) => {
    this.activeDialogVisible = visible;
  };

  setDisableDialogVisible = (visible) => {
    this.disableDialogVisible = visible;
  };

  setSendInviteDialogVisible = (visible) => {
    this.sendInviteDialogVisible = visible;
  };

  setDeleteDialogVisible = (visible) => {
    this.deleteDialogVisible = visible;
  };

  setInvitationDialogVisible = (visible) => {
    this.invitationDialogVisible = visible;
  };

  closeDialogs = () => {
    this.setChangeEmailDialogVisible(false);
    this.setChangePasswordDialogVisible(false);
    this.setChangeOwnerDialogVisible(false);
    this.setDeleteSelfProfileDialogVisible(false);
    this.setDeleteProfileDialogVisible(false);
    this.setDialogData({});

    this.setEmployeeDialogVisible(false);
    this.setGuestDialogVisible(false);
    this.setActiveDialogVisible(false);
    this.setDisableDialogVisible(false);
    this.setSendInviteDialogVisible(false);
    this.setDeleteDialogVisible(false);
    this.setInvitationDialogVisible(false);
  };
}

export default DialogStore;
