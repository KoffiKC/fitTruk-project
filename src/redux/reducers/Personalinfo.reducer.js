const PersonalinfoReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_USER_INFO':
        return action.payload;
        
    
      default:
        return state;
    }
  };

  export default PersonalinfoReducer;