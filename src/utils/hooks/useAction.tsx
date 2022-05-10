import { useInput } from "./useInput";

export const useAction = () => {
    const wPress = useInput("w");
    const sPress = useInput("s");
    const aPress = useInput("a");
    const dPress = useInput("d");
    const upPress = useInput("ArrowUp");
    const rightPress = useInput("ArrowRight");
    const downPress = useInput("ArrowDown");
    const leftPress = useInput("ArrowLeft");
    const keyPress = useInput("Enter");
    
    if (wPress || upPress) {
        return 'up';
    } 
    if(sPress || downPress) {
        return 'down';
    }
    if (aPress || leftPress) {
        return 'left';
    }
    if (dPress || rightPress) {
        return 'right';
    }
    if (keyPress) {
        return 'enter';
    }
    return null;
};