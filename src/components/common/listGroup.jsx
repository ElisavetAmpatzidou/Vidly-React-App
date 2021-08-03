import React from 'react';
import { genres } from '../../services/fakeGenreService';

const ListGroup = props => {
    const {items, textProp , valueProp , selectedItem, onGenreSelect} =props;
    return ( 
        <ul className="list-group">
            {items.map( item =>  <li key={item[valueProp]} onClick={() => onGenreSelect(item)} className={item === selectedItem ? "list-group-item active" : "list-group-item" }>{item[textProp]}</li>)}
        </ul>
     );
}

ListGroup.defaultProps = {
    textProp: 'name',
    valueProp: '_id'
}
export default ListGroup;