import React from "react";
import { useCollision } from "./useCollision";
import mapData from '../../map.json';

export const useMove = (actions : any[], setPosition: React.Dispatch<React.SetStateAction<number[]>>, delta = 0.06) => {
   
    if (actions.length > 0) {
        for (const action of actions) {
            setPosition(position => {
                const nextPosition = transferPosition(action, position, delta);
                if (useCollision(action, nextPosition, mapData)) {
                    return nextPosition;
                }
                return position;
            });
        }
      };
}

const transferPosition = (action: string, position: any[], delta: number) => {
    switch(action) {
        case 'up': return [position[0], position[1]+delta];
        case 'down': return [position[0], position[1]-delta];
        case 'left': return [position[0]-delta, position[1]];
        case 'right': return [position[0]+delta, position[1]];
    }
    return position;
};