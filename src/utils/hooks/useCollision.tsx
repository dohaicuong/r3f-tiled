export const useCollision = (action: string, nextPosition : number[], mapData : any) : boolean => {
    const { width, height } = mapData;
    const limit = {
        top: height/2-1,
        bottom: -height/2,
        left: -width/2+1,
        right: width/2
    };
    
    if (nextPosition[1] > limit.top || nextPosition[1] < limit.bottom || nextPosition[0] < limit.left || nextPosition[0] > limit.right) {
        return false;
    }

    return true;
};