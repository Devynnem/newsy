import React, { useState } from "react";
import './Search.css'

const Search = (props) => {
  const [query, setQuery] = useState('');
  const handleSubmit = (query, event) => {
    event.preventDefault();
    props.search(query);
    clearInputs();
  }
  const clearInputs = () => {
    setQuery('')
  }

  return (
    <div className='search-container'>
      <form className="search-bar">
        <input
          type="text"
          placeholder="Search"
          name="query"
          id="searchQueryInput"
          className="search-field"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button className="search-query-button" onClick={(event) => handleSubmit(query, event)}>🔎</button>
      </form>
      <button className="back-to-all-button" id="backToAll" onClick={(event) => props.reset(event)}>Back to All Articles</button>
    </div>
  )

}


export default Search;