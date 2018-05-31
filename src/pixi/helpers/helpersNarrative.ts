
export const constantNumberValue = (valueArray: number[], _index: number, _distribution: number[], _randomIndex: number, _rateOfChange: number): number => valueArray[0];


export const incrementPosition = (currentPosition: number, valueArray: number[], index: number, _distribution: number[], _randomIndex: number, _rateOfChange: number): number => currentPosition + valueArray[index];





// SPEED FUNCTIONS 

export const constantSpeed = (speed: number[], change: number): number => speed[0];
export const sin = (speed: number[], change: number): number => speed[0] * Math.sin(change);
export const cos = (speed: number[], change: number): number => speed[0] * Math.cos(change);

export const constantDistribution = (distribution: number[]): number[] => distribution;
