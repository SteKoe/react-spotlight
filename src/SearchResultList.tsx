import React, {Fragment} from "react";
import "./SearchResultList.css"
import {SearchResultKeyed} from "./SearchResultKeyed";
import {SearchResult} from "./SearchResult";

const hasMetadata = (searchResult: SearchResult) => {
    return searchResult.metadata.filter((m) => m && m.trim().length > 0).length > 0
}

export class SearchResultList extends React.Component<{ searchResults: SearchResultKeyed[] }> {

    render() {
        return (
            <ul className="sls-results-list">
                {this.props.searchResults.map((l, idx) => (
                    <React.Fragment key={`${l.name}-${idx}`}>
                        {idx > 0 ? (
                            <li className="sls-results-list-caption">
                                <hr/>
                                <div className="sls-results-list-caption-title">{l.name}</div>
                            </li>
                        ) : ''}
                        {l.results.map((result) => (
                            <li className="sls-results-list-item" key={`${result.name}-${idx}`}>
                                <span className="sls-results-list-item__icon" style={{backgroundImage: `url("${result.icon}")`}}></span>
                                <span className="sls-results-list-item__name">{result.name}</span>
                                <span className="sls-results-list-item__metadata">
                                    {hasMetadata(result) ? (
                                        <span>&nbsp;&mdash;&nbsp;</span>
                                    ) : ''}
                                    {result.metadata?.map((metadata, idx) => (
                                        <Fragment key={`${metadata}${idx}`}>
                                            {metadata}
                                            {idx < result.metadata.length - 1 && <span> &middot; </span>}
                                        </Fragment>
                                    ))}
                                </span>
                            </li>
                        ))}
                    </React.Fragment>
                ))}
            </ul>);
    }
}

