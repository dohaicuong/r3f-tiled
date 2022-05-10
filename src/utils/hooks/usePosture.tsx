import React, { useEffect, useState } from "react";
import { usePrevious } from "react-use";

export enum Posture {
    atk_up = 0,
    atk_right,
    atk_left,
    atk_down,
    walk_up,
    walk_right,
    walk_left,
    walk_down,
    idle_up,
    idle_right,
    idle_left,
    idle_down,
}

export const usePosture = (prevActions: string[], actions: string[], setPosture: React.Dispatch<React.SetStateAction<Posture>>) => {
    if (actions.length === 0) {
        if (prevActions.length === 1 && prevActions.includes('enter')) {
            setTimeout(() => setPosture(posture => {
                switch(posture) {
                    case Posture.atk_up: return Posture.idle_up;
                    case Posture.atk_down: return Posture.idle_down;
                    case Posture.atk_left: return Posture.idle_left;
                    case Posture.atk_right: return Posture.idle_right;
                };
                return posture;
            }), 500);
        }
        if (prevActions.includes('up')) {
            setPosture(posture => Posture.idle_up);
        }
        if (prevActions.includes('down')) {
            setPosture(posture => Posture.idle_down);
        }
        if (prevActions.includes('left')) {
            setPosture(posture => Posture.idle_left);
        }
        if (prevActions.includes('right')) {
            setPosture(posture => Posture.idle_right);
        }
    }
    if (actions.length > 0) {        
        if (prevActions.length === 0 && actions.length === 1 && actions.includes('enter')) {
            setPosture(posture => {
                switch(posture) {
                    case Posture.idle_up || Posture.walk_up: return Posture.atk_up;
                    case Posture.idle_left || Posture.walk_left: return Posture.atk_left;
                    case Posture.idle_right || Posture.walk_right: return Posture.atk_right;
                    case Posture.idle_down || Posture.walk_down: return Posture.atk_down;
                };
                return posture;
            });
        }
        if (actions.includes('up')) {
            setPosture(posture => Posture.walk_up);
        }
        if (actions.includes('down')) {
            setPosture(posture => Posture.walk_down);
        }
        if (actions.includes('left')) {
            setPosture(posture => Posture.walk_left);
        }
        if (actions.includes('right')) {
            setPosture(posture => Posture.walk_right);
        }
    }
    return Posture.idle_down;
}