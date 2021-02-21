import FilterProperty from "../enums/FilterPropery";
export default interface ParamsToPush {
  search: string | undefined;
  searchBy: FilterProperty;
}
