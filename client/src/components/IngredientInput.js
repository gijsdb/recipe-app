import React, {useState} from 'react';

import { BtnBorder } from '../styles/Buttons'


export const IngredientInput = ({onSubmit}) => {
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
    if(!amount) {
      alert('Please enter an amount')
      return
    } else if(measurement === undefined) {
      alert('Please enter a measurement')
      return
    } else if(!ingredient) {
      alert('Please enter an ingredient')
      return
    } else {
      const newIngredient = {
        amount,
        measurement,
        ingredient,
      }
      onSubmit(newIngredient);
    }
  }



  return (
    <div>
        <form onSubmit={handleAddIngredientClick}>
          <label htmlFor="amount">Amount</label>
          <input type="number" value={amount} name="amount" onChange={handleAmountChange}/>

          <label htmlFor="measurement">Measurement</label>
          <select name="measurement" value={measurement} onChange={handleMeasurementChange}>
              <option value="">--Please choose an option--</option>
              <option value="milligrams">Milligrams</option>
              <option value="grams">Grams</option>
              <option value="kilograms">Kilograms</option>
              <option value="pounds">Pounds</option>
              <option value="ounces">Ounces</option>
              <option value="cups">Cup</option>
              <option value="teaspoons">Tsp</option>
              <option value="tablespoons">Tbsp</option>
              <option value="">No measurement</option>
          </select>

          <label htmlFor="ingredient">Ingredient</label>
          <input value={ingredient} type="text" name="ingredient" onChange={handleIngredientChange}/>
          <BtnBorder
          color="white"
          borderColor="white"
          className="btnHomeHover"
          fontSize="1em"
          marginTop="0.5em"
          type="submit"
          >Add
          </BtnBorder>
        </form>
    </div>      
  );
}
