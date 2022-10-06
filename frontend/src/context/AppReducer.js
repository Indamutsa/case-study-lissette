export const initialState = {
  id: 2,
  homeActive: true,
  surveyActive: false,
};

export const appReducer = (state, action) => {
  switch (action.type) {
    case "init_stored": {
      return action.value;
    }

    case "navigate": {
      // state.id = action.value;
      // state.homeActive = !state.homeActive;
      // state.surveyActive = !state.surveyActive;

      return {
        ...state,
        id: action.value,
        homeActive: !state.homeActive,
        surveyActive: !state.surveyActive,
      };

      
    }
    default: return initialState;
  } 
};
