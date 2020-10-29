import React from 'react';
import { TextBox } from '../styles/Input';

export const RecipeSearch = ({ onChange }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <TextBox
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
