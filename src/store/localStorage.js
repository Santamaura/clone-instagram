import initialState from  '../reducers/index';

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('comments');
        if(serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    }
    catch(error) {
        console.log('Error occurred during loading from local storage');
        return undefined;
    }
}

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('comments', serializedState);
    }
    catch(error) {
        console.log('Error occurred while updating local storage');
    }
}