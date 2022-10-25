import { FC } from 'react';

declare type SearchResult = {
    name: string;
    metadata: string[];
    icon: string;
};

interface SearchProvider {
    getName(): string;
    runSearch(term: string): Promise<SearchResult[]>;
}

interface IProps {
    searchProviders: SearchProvider[];
}
declare const SpotlightSearch: FC<IProps>;

export { SearchProvider, SearchResult, SpotlightSearch };
