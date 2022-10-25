import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import {SearchProvider} from "./SearchProvider";
import "./SpotlightSearch.module.css"
import debounce from 'lodash.debounce';
import {useEventListener} from "./useEventListener";
import {SearchResult} from "./SearchResult";
import {SearchResultList} from "./SearchResultList";
import {SearchResultKeyed} from "./SearchResultKeyed";

interface IProps {
    searchProviders: SearchProvider[];
}

const SpotlightSearch: FC<IProps> = (props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isVisible, setVisible] = useState(true);
    const [searchResults, setSearchResults] = useState<SearchResultKeyed[]>([]);

    const searchProviders = props.searchProviders || [];

    const keyup = (ev: KeyboardEvent) => {
        if (ev.code === "Space" && ev.ctrlKey) {
            setVisible(!isVisible);
            window.setTimeout(() => {
                inputRef.current?.focus();
                inputRef.current?.setSelectionRange(0, searchTerm.length);
            }, 0);
        }
        if (ev.code === "Escape") {
            if (searchTerm === "") {
                setVisible(false);
            } else {
                setSearchTerm("");
            }
            setSearchResults([]);
        }
    };
    useEventListener('keyup', keyup)

    const runSearchDebounced = useMemo(() =>
        debounce(async (value) => {
            const promise = await Promise.allSettled(searchProviders
                .map(p => p.runSearch(value)));

            const successfulSearches = promise
                .filter(pr => pr.status === "fulfilled") as PromiseFulfilledResult<SearchResult[]>[];

            const searchResults = successfulSearches
                .map((sr: PromiseFulfilledResult<SearchResult[]>, idx: number) => {
                    return {
                        name: searchProviders[idx].getName(),
                        results: sr.value
                    } as SearchResultKeyed;
                })

            setSearchResults(searchResults);
        }, 300), []);

    useEffect(() => () => runSearchDebounced.cancel(), []);

    return (
        <div className='sls-overlay' style={{display: isVisible ? 'flex' : 'none'}}>
            <div className='sls-container'>
                <div className='sls-searchbar'>
                    <figure className='sls-search-icon'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44.36 44.36">
                            <path
                                d="M43.5,38.94l-10.25-10.25s0,0-.01-.01c2.06-2.96,3.28-6.54,3.28-10.42C36.52,8.17,28.34,0,18.26,0S0,8.17,0,18.26s8.17,18.26,18.26,18.26c3.88,0,7.47-1.22,10.42-3.28,0,0,0,0,.01,.01l10.25,10.25c1.15,1.15,3.02,1.15,4.17,0l.39-.39c1.15-1.15,1.15-3.02,0-4.17Zm-25.24-7.41c-7.33,0-13.27-5.94-13.27-13.27S10.93,4.99,18.26,4.99s13.27,5.94,13.27,13.27-5.94,13.27-13.27,13.27Z"/>
                        </svg>
                    </figure>
                    <input className="sls-input" type="text" placeholder="Spotlight-Suche" value={searchTerm}
                           autoFocus={true}
                           ref={inputRef}
                           onChange={(e) => {
                               setSearchTerm(e.target.value);
                               return runSearchDebounced(e.target.value);
                           }}/>
                    <div className='sls-result-icon-container'>
                        <div className='sls-result-icon'></div>
                    </div>
                </div>
                {searchResults.length > 0 ? (
                    <div className='sls-results-container'>
                        <SearchResultList searchResults={searchResults}/>
                    </div>
                ) : ''}
            </div>
        </div>
    );
};

export default SpotlightSearch;
