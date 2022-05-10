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
            return;
        }
        if (prevActions.includes('left')) {
            setPosture(posture => Posture.idle_left);
            return;
        }
        if (prevActions.includes('right')) {
            setPosture(posture => Posture.idle_right);
            return;
        }
        if (prevActions.includes('up')) {
            setPosture(posture => Posture.idle_up);
            return;
        }
        if (prevActions.includes('down')) {
            setPosture(posture => Posture.idle_down);
            return;
        }
    }
    if (actions.length > 0) {        
        if (prevActions.length === 0 && actions.length === 1 && actions.includes('enter')) {
            setPosture(posture => {
                switch(posture) {
                    case Posture.idle_up: case Posture.walk_up: return Posture.atk_up;
                    case Posture.idle_left: case Posture.walk_left: return Posture.atk_left;
                    case Posture.idle_right: case Posture.walk_right: return Posture.atk_right;
                    case Posture.idle_down: case Posture.walk_down: return Posture.atk_down;
                };
                return posture;
            });
            return;
        }
        if (actions.includes('left')) {
            setPosture(posture => Posture.walk_left);
            return;
        }
        if (actions.includes('right')) {
            setPosture(posture => Posture.walk_right);
            return;
        }
        if (actions.includes('up')) {
            setPosture(posture => Posture.walk_up);
            return;
        }
        if (actions.includes('down')) {
            setPosture(posture => Posture.walk_down);
            return;
        }
    }
}