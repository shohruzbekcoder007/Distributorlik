import React from 'react';

import Select from 'react-select';




export default function ReactSelectMulti(props){
    return (
        <Select
            defaultValue={[]}
            isMulti
            name="colors"
            className="basic-multi-select"
            classNamePrefix="select"
            options={props.options}
            onChange={(value) => {
                props.func(value);
            }}
            placeholder={props.placeholder}
        />)
};
