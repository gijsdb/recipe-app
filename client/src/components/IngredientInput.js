import React, { useState } from 'react';
import { TextBox, Select, TextBoxLabel } from '../styles/Input';
import styled from 'styled-components';

import { BtnBorder } from '../styles/Buttons';

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
        <InputContainer>
          <TextBoxLabel>Amount</TextBoxLabel>
          <TextBox
            type="number"
            value={amount}
            name="amount"
            placeholder="Amount"
            onChange={handleAmountChange}
          />
        </InputContainer>

        <InputContainer>
          <TextBoxLabel>Measurement</TextBoxLabel>
          <Select
            name="measurement"
            value={measurement}
            onChange={handleMeasurementChange}
          >
            <option value="">--Please select a measurement--</option>
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
        </InputContainer>

        <InputContainer>
          <TextBoxLabel>Ingredient</TextBoxLabel>
          <TextBox
            value={ingredient}
            placeholder="Ingredient"
            type="text"
            name="ingredient"
            onChange={handleIngredientChange}
          />
        </InputContainer>

        <BtnBorder
          color="white"
          borderColor="white"
          className="btnHomeHover"
          fontSize="1em"
          marginTop="0.5em"
          type="submit"
        >
          Add
        </BtnBorder>
      </form>
    </InputFormContainer>
  );
};

export const InputContainer = styled.div`
  margin: 1em 0em;
`;

export const InputFormContainer = styled.div`
  padding: 1em 0em;
  border-bottom: 1px #fff solid;
`;
