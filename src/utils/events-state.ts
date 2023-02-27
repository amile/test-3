import {Events} from '../types/events';

export const getDefaultStateFromLS = (lsKey: string): Events => {
    const lsValue = localStorage.getItem(lsKey);
    if (lsValue === null) {
        return {};
    }
    
    try {
        return JSON.parse(lsValue);
    } catch(e) {
        return {};
    }
};

export const getAndWriteNextState = (lsKey: string, nextState: Events): Events => {
    localStorage.setItem(lsKey, JSON.stringify(nextState));
    return nextState;
};
