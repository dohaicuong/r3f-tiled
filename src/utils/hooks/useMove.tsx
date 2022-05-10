import React from "react";

export const useMove = (actions : any[], setPosition: React.Dispatch<React.SetStateAction<number[]>>, delta = 0.06) => {
    if (actions.length > 0) {
        
        for (const action of actions) {
            switch(action) {
                case 'up': setPosition(position => [position[0], position[1]+delta]); break;
                case 'down': setPosition(position => [position[0], position[1]-delta]); break;
                case 'left': setPosition(position => [position[0]-delta, position[1]]); break;
                case 'right': setPosition(position => [position[0]+delta, position[1]]); break;
            }
        }
      };
}