import React from 'react'

const FilterComponent = ({ filterText, onFilter, onClear }) => (
   <>
      <input
         id="search"
         type="text"
         className='w-25 form-control'
         placeholder="Search here..."
         aria-label="Search Input"
         value={filterText}
         onChange={onFilter}
      />
      <button type="button" className='btn btn-primary' onClick={onClear}>Clear</button>
   </>
);

export default FilterComponent