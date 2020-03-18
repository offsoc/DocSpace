import { api, constants, history } from "asc-web-common";
import axios from "axios";
import {
  AUTHOR_TYPE,
  FILTER_TYPE,
  PAGE_COUNT,
  PAGE,
  SEARCH_TYPE,
  SEARCH,
  SORT_BY,
  SORT_ORDER
} from "../../helpers/constants";
import config from "../../../package.json";

const { FilterType, FileType } = constants;
const { files, FilesFilter } = api;

export const SET_FOLDER = "SET_FOLDER";
export const SET_FOLDERS = "SET_FOLDERS";
export const SET_FILE = "SET_FILE";
export const SET_FILES = "SET_FILES";
export const SET_SELECTION = "SET_SELECTION";
export const SET_SELECTED = "SET_SELECTED";
export const SET_SELECTED_FOLDER = "SET_SELECTED_FOLDER";
export const SET_ROOT_FOLDERS = "SET_ROOT_FOLDERS";
export const SET_FILES_FILTER = "SET_FILES_FILTER";
export const SET_FILTER = "SET_FILTER";
export const SELECT_FILE = "SELECT_FILE";
export const DESELECT_FILE = "DESELECT_FILE";
export const SET_ACTION = "SET_ACTION";

export function setFile(file) {
  return {
    type: SET_FILE,
    file
  };
}

export function setFiles(files) {
  return {
    type: SET_FILES,
    files
  };
}

export function setFolder(folder) {
  return {
    type: SET_FOLDER,
    folder
  };
}

export function setFolders(folders) {
  return {
    type: SET_FOLDERS,
    folders
  };
}

export function setSelection(selection) {
  return {
    type: SET_SELECTION,
    selection
  };
}

export function setSelected(selected) {
  return {
    type: SET_SELECTED,
    selected
  };
}

export function setAction(fileAction) {
  return {
    type: SET_ACTION,
    fileAction
  };
}

export function setSelectedFolder(selectedFolder) {
  return {
    type: SET_SELECTED_FOLDER,
    selectedFolder
  };
}

export function setRootFolders(rootFolders) {
  return {
    type: SET_ROOT_FOLDERS,
    rootFolders
  };
}

export function setFilesFilter(filter, folderId) {
  setFilterUrl(filter, folderId);
  return {
    type: SET_FILES_FILTER,
    filter
  };
}
export function setFilter(filter) {
  return {
    type: SET_FILTER,
    filter
  };
};

export function selectFile(file) {
  return {
    type: SELECT_FILE,
    file
  };
}

export function deselectFile(file) {
  return {
    type: DESELECT_FILE,
    file
  };
}

export function setFilterUrl(filter, folderId) {
  const defaultFilter = FilesFilter.getDefault();
  const params = [];

  if (filter.filterType) {
    params.push(`${FILTER_TYPE}=${filter.filterType}`);
  }

  if (filter.withSubfolders) {
    params.push(`${SEARCH_TYPE}=${filter.withSubfolders}`);
  }

  if (filter.search) {
    params.push(`${SEARCH}=${filter.search.trim()}`);
  }
  if (filter.authorType) {
    params.push(`${AUTHOR_TYPE}=${filter.authorType}`);
  }

  if (filter.pageCount !== defaultFilter.pageCount) {
    params.push(`${PAGE_COUNT}=${filter.pageCount}`);
  }

  params.push(`${PAGE}=${filter.page + 1}`);
  params.push(`${SORT_BY}=${filter.sortBy}`);
  params.push(`${SORT_ORDER}=${filter.sortOrder}`);

  const hash = folderId === "@my" ? "" : `#${folderId}`;
  history.push(`${config.homepage}/filter?${params.join("&")}${hash}`);
}

// TODO: similar to fetchFolder, remove one
export function fetchFiles(folderId, filter, dispatch) {
  const filterData = filter ? filter.clone() : FilesFilter.getDefault();
  return files.getFolder(folderId, filter).then(data => {
    let treeFolders = [];
    if(data.pathParts.length > 0) {
      for(let item of data.pathParts) {
        treeFolders.push(item.toString());
      }
    }
    if(treeFolders.length > 0) {
      treeFolders = treeFolders.concat(filter.treeFolders.filter(x => !treeFolders.includes(x)));
    }
    filterData.treeFolders = treeFolders;
    filterData.total = data.total;
    dispatch(setFilesFilter(filterData, folderId));
    dispatch(setFolders(data.folders));
    dispatch(setFiles(data.files));
    return dispatch(setSelectedFolder({ folders: data.folders, ...data.current }));
  })
}

export function fetchFolders() {
  return Promise.resolve([]);
}

export function selectFolder() {
  return Promise.resolve([]);
}

export function fetchFolder(folderId, dispatch) {
  return files.getFolder(folderId).then(data => {
    dispatch(setFolders(data.folders));
    dispatch(setFiles(data.files));
    return dispatch(setSelectedFolder({ folders: data.folders, ...data.current }));
  })
}

export function fetchMyFolder(dispatch) {
  return files.getMyFolderList().then(data => {
    dispatch(setFolders(data.folders));
    dispatch(setFiles(data.files));
    return dispatch(setSelectedFolder(data.current));
  });
}

export function getFolder(folderId) {
  return dispatch => {
    return files.getFolder(folderId);
  };
};

export function fetchTrashFolder(dispatch) {
  return files.getTrashFolderList().then(data => {
    dispatch(setFiles(data.files));
    return dispatch(setSelectedFolder(data.current));
  });
}

export function fetchCommonFolder(dispatch) {
  return files.getCommonFolderList().then(data => {
    dispatch(setFolders(data.folders));
    dispatch(setFiles(data.files));
    return dispatch(setSelectedFolder(data.current));
  });
}

export function fetchProjectsFolder(dispatch) {
  return files.getProjectsFolderList().then(data => {
    dispatch(setFolders(data.folders));
    dispatch(setFiles(data.files));
    return dispatch(setSelectedFolder(data.current));
  });
}

export function fetchSharedFolder(dispatch) {
  return files.getSharedFolderList().then(data => {
    dispatch(setFolders(data.folders));
    dispatch(setFiles(data.files));
    return dispatch(setSelectedFolder(data.current));
  });
}

export function fetchRootFolders(dispatch) {

  let root = {
    my: null,
    share: null,
    common: null,
    project: null,
    trash: null
  };

  return axios.all([
    files.getMyFolderList(),
    files.getSharedFolderList(),
    files.getCommonFolderList(),
    files.getProjectsFolderList(),
    files.getTrashFolderList()
  ])
    .then(axios.spread((my, share, common, project, trash) => {
      root.my = { folders: my.folders, ...my.current }
      root.share = { folders: share.folders, ...share.current }
      root.common = { folders: common.folders, ...common.current }
      root.project = { folders: project.folders, ...project.current }
      root.trash = { folders: trash.folders, ...trash.current }
    }))
    .then(() => dispatch(setRootFolders(root)));;
}

export function testUpdateMyFolder(folders) {
  return (dispatch, getState) => {
    const { files } = getState();
    const { rootFolders } = files;

    console.log("folders", folders);

    const newRoot = rootFolders;
    newRoot.my.folders = folders;
    console.log("newRoot.my.folders", newRoot.my.folders);
    console.log("folders", folders);
    console.log("newRoot", newRoot);
    //dispatch(setRootFolders(null));
    dispatch(setRootFolders(newRoot));

  }
  //setRootFolders
}

export function createFile(folderId, title) {
  return dispatch => {
    return files.createFile(folderId, title)
      .then(folder => {
        fetchFolder(folderId, dispatch);
      });
  };
}

export function createFolder(parentFolderId, title) {
  return dispatch => {
    return files.createFolder(parentFolderId, title)
      .then(folder => {
        fetchFolder(parentFolderId, dispatch);
      });
  };
}

export function updateFile(fileId, title) {
  return dispatch => {
    return files.updateFile(fileId, title)
      .then(file => {
        dispatch(setFile(file));
      });
  };
}

export function renameFolder(folderId, title) {
  return dispatch => {
    return files.renameFolder(folderId, title)
      .then(folder => {
        dispatch(setFolder(folder));
      });
  };
}

export function deleteFile(fileId, deleteAfter, immediately) {
  return dispatch => {
    return files.deleteFile(fileId, deleteAfter, immediately)
  }
}

export function deleteFolder(folderId, deleteAfter, immediately) {
  return (dispatch, getState) => {
    const { files } = getState();
    const { folders } = files;

    return api.files.deleteFolder(folderId, deleteAfter, immediately)
      .then(res => {
        return dispatch(setFolder(folders.filter(f => f.id !== folderId)));
      })
  }
}

/*export function deleteGroup(id) {
  return (dispatch, getState) => {
    const { people } = getState();
    const { groups, filter } = people;

    return api.groups
      .deleteGroup(id)
      .then(res => {
        return dispatch(setGroups(groups.filter(g => g.id !== id)));
      })
      .then(() => {
        const newFilter = filter.clone(true);
        return fetchPeople(newFilter, dispatch);
      });
  };
}*/