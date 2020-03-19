import { toUrlParams } from "../../utils";
import { FilterType } from '../../constants';

const DEFAULT_PAGE = 0;
const DEFAULT_PAGE_COUNT = 25;
const DEFAULT_TOTAL = 0;
const DEFAULT_SORT_BY = "lastModifiedDate";
const DEFAULT_SORT_ORDER = "ascending";
const DEFAULT_FILTER_TYPE = FilterType.None;
const DEFAULT_SEARCH_TYPE = null; //withSubfolders
const DEFAULT_SEARCH = null;
const DEFAULT_FOLDER_PATH = [];
const DEFAULT_AUTHOR_TYPE = null;
const DEFAULT_SELECTED_ITEM = {};

// TODO: add next params
// subjectGroup bool
// subjectID
// searchInContent bool

class FilesFilter {
  static getDefault(total = DEFAULT_TOTAL) {
    return new FilesFilter(DEFAULT_PAGE, DEFAULT_PAGE_COUNT, total);
  }

  constructor(
    page = DEFAULT_PAGE,
    pageCount = DEFAULT_PAGE_COUNT,
    total = DEFAULT_TOTAL,
    sortBy = DEFAULT_SORT_BY,
    sortOrder = DEFAULT_SORT_ORDER,
    filterType = DEFAULT_FILTER_TYPE,
    withSubfolders = DEFAULT_SEARCH_TYPE,
    search = DEFAULT_SEARCH,
    authorType = DEFAULT_AUTHOR_TYPE,
    treeFolders = DEFAULT_FOLDER_PATH,
    selectedItem = DEFAULT_SELECTED_ITEM,
  ) {
    this.page = page;
    this.pageCount = pageCount;
    this.sortBy = sortBy;
    this.sortOrder = sortOrder;
    this.filterType = filterType;
    this.withSubfolders = withSubfolders;
    this.search = search;
    this.total = total;
    this.authorType = authorType;
    this.treeFolders = treeFolders;
    this.selectedItem = selectedItem;
  }

  getStartIndex = () => {
    return this.page * this.pageCount;
  };

  hasNext = () => {
    return this.total - this.getStartIndex() > this.pageCount;
  };

  hasPrev = () => {
    return this.page > 0;
  };

  toDto = () => {
    const {
      pageCount,
      sortBy,
      sortOrder,
      filterType,
      withSubfolders,
      search,
      authorType
    } = this;

    let dtoFilter = {
      startIndex: this.getStartIndex(),
      count: pageCount,
      sortby: sortBy,
      sortOrder: sortOrder,
      filterType: filterType,
      filterValue: (search ?? "").trim(),
      // withSubfolders,
      userIdOrGroupId: authorType && authorType.includes('_') ? authorType.slice(authorType.indexOf('_') + 1) : null //TODO: replace with FilterInput refactoring
    };



    return dtoFilter;
  };

  toUrlParams = () => {
    const dtoFilter = this.toDto();
    const str = toUrlParams(dtoFilter, true);
    return str;
  };

  clone() {
    return new FilesFilter(
      this.page,
      this.pageCount,
      this.total,
      this.sortBy,
      this.sortOrder,
      this.filterType,
      this.withSubfolders,
      this.search,
      this.authorType,
      this.treeFolders,
      this.selectedItem
    );
  }

  equals(filter) {
    const equals =
      this.filterType === filter.filterType &&
      this.authorType === filter.authorType &&
      this.withSubfolders === filter.withSubfolders &&
      this.search === filter.search &&
      this.sortBy === filter.sortBy &&
      this.sortOrder === filter.sortOrder &&
      this.page === filter.page &&
      this.selectedItem.key === filter.selectedItem.key &&
      this.pageCount === filter.pageCount;

    return equals;
  }
}

export default FilesFilter;
