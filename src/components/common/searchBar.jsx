import React from 'react';

const SearchBar = ({value, onChange}) => {
    return ( 
        <div className="input-group rounded">
            <input name="query" type="search" value={value} onChange={e => onChange(e.currentTarget.value)} className="form-control rounded my-3" placeholder="Search" aria-label="Search"
                aria-describedby="search-addon" />
        </div>
     );
}
 
export default SearchBar;