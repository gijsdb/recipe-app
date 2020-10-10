import React from 'react';

export const RecipeSearch = () => {

    
    return(
      <p>Search component</p>
    )
}

function mapStateToProps(state) { //redux mapping part
    return { 
      isAuthenticated: state.authReducer.isAuthenticated,
      user: state.authReducer.user,
      error: state.errorReducer,  
    }
  }
  
export default connect(mapStateToProps)(RecipeSearch) //redux connecting
