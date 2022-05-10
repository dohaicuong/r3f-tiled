import { useState, useEffect } from "react";

export function useInput() {
    const [keysPressed, setKeyPressed] = useState(new Set<string>([]));
  
    function downHandler({ key } : any) {
        keysPressed.add(key)
        setKeyPressed(new Set<string>(keysPressed.values()));
    }
  
    const upHandler = ({ key } : any) => {
        keysPressed.delete(key);
        setKeyPressed(new Set<string>(keysPressed.values()));
    };
  
    useEffect(() => {
        window.addEventListener("keydown", downHandler);
        window.addEventListener("keyup", upHandler);
        return () => {
            window.removeEventListener("keydown", downHandler);
            window.removeEventListener("keyup", upHandler);
        };
    }, []); // Empty array ensures that effect is only run on mount and unmount
    
    return keysPressed;
  }