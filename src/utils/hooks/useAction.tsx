import { useInput } from "./useInput";

export const useAction = () => {
    const keys = useInput();
    const actions = [];
    
    if (keys.has('w') || keys.has('ArrowUp')) {
        actions.push('up');
    } 
    if (keys.has('s') || keys.has('ArrowDown')) {
        actions.push('down');
    } 
    if (keys.has('a') || keys.has('LeftDown')) {
        actions.push('left');
    }
    if (keys.has('d') || keys.has('RightDown')) {
        actions.push('right');
    } 
    if (keys.has('Enter')) {
        actions.push('enter');
    }
    return actions;
};