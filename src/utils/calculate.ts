import { BlockContent } from '../types/block-content';
import { Result } from '../types/result';

export function calculate(game: BlockContent[]): Result | null {
    const possibleWinningCombinations: Array<number[]> = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const isPlayerWon: boolean = possibleWinningCombinations.some((combination: number[]) => combination.every((index: number) => game[index] === BlockContent.cross));

    const isComputerWon: boolean = possibleWinningCombinations.some((combination: number[]) => combination.every((index: number) => game[index] === BlockContent.oval));

    if (isPlayerWon) {
        return Result.win;
    } else if (isComputerWon) {
        return Result.failed;
    } else {
        return null;
    }
}