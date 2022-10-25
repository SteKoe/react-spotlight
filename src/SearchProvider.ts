import {SearchResult} from "./SearchResult";

export interface SearchProvider {
    getName(): string;
    runSearch(term: string): Promise<SearchResult[]>;
}