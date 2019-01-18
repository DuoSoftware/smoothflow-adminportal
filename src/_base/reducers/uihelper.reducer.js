const uihelper = {
    _preload_shell_ : false,
    _preload_body_ : false,
    candidate_item : {}
}

const UIHelperReducer = (state = uihelper, action) => {
    switch(action.type) {
        case 'PRELOAD_BODY' :
            return {
                ...state,
                _preload_body_ : action.loader
            }
        
        case 'PRELOAD_SHELL' :
            return {
                ...state,
                _preload_shell_ : action.loader
            }
        
        case 'CANDIDATE_INT' :
            return {
                ...state,
                candidate_int : action.item
            }
        
        default :
            return state;
    }
};

export default UIHelperReducer;