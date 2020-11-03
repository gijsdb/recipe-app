import React, { useState } from 'react';
import { TextBox, Select, TextBoxLabel } from '../styles/Input';
import styled from 'styled-components';

import { Button } from '../styles/Input';

export const IngredientInput = ({ onSubmit }) => {
  const [amount, setAmount] = useState('');
  const [measurement, setMeasurement] = useState('');
  const [ingredient, setIngredient] = useState('');

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleMeasurementChange = (e) => {
    setMeasurement(e.target.value);
  };

  const handleIngredientChange = (e) => {
    setIngredient(e.target.value);
  };

  const handleAddIngredientClick = (e) => {
    e.preventDefault();
    if (!amount) {
      alert('Please enter an amount');
      return;
    } else if (measurement === undefined) {
      alert('Please enter a measurement');
      return;
    } else if (!ingredient) {
      alert('Please enter an ingredient');
      return;
    } else {
      const newIngredient = {
        amount,
        measurement,
        ingredient,
      };
      onSubmit(newIngredient);
    }
  };

  return (
    <InputFormContainer>
      <form onSubmit={handleAddIngredientClick}>
        <TextBox
          type="number"
          value={amount}
          name="amount"
          placeholder="Amount"
          width="24%"
          onChange={handleAmountChange}
        />

        <Select
          name="measurement"
          width="24%"
          value={measurement}
          onChange={handleMeasurementChange}
        >
          <option value="">-Measurement-</option>
          <option value="milligrams">Milligrams</option>
          <option value="grams">Grams</option>
          <option value="kilograms">Kilograms</option>
          <option value="pounds">Pounds</option>
          <option value="ounces">Ounces</option>
          <option value="cups">Cup</option>
          <option value="teaspoons">Tsp</option>
          <option value="tablespoons">Tbsp</option>
          <option value="">No measurement</option>
        </Select>

        <TextBox
          width="24%"
          value={ingredient}
          placeholder="Ingredient"
          type="text"
          name="ingredient"
          onChange={handleIngredientChange}
        />

        <div>
          <AddButton type="submit">Add</AddButton>
        </div>
      </form>
    </InputFormContainer>
  );
};

export const InputFormContainer = styled.div`
  width: 100vw;
  padding: 1em 1em;
`;

export const AddButton = styled(Button)`
  width: 10em;
  @media (max-width: 600px) {
    width: 90%;
  }
`;
