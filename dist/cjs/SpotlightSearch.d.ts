import { FC } from 'react';
import { SearchProvider } from "./SearchProvider";
import "./SpotlightSearch.module.css";
interface IProps {
    searchProviders: SearchProvider[];
}
declare const SpotlightSearch: FC<IProps>;
export default SpotlightSearch;
