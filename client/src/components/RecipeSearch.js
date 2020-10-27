import React from 'react';
import TextField from '@material-ui/core/TextField';

export const RecipeSearch = ({ onChange }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <TextField
      type="text"
      placeholder="Search by title"
      name="searchTerm"
      autoComplete="off"
      label="Search by title"
      variant="outlined"
      onChange={handleChange}
    />
  );
};
