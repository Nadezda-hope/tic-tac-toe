import Lottie from 'lottie-react';
import { useState } from 'react';
import grid from '../../assets/lottie/grid.json';
import winner from '../../assets/lottie/winner.json';
import { Block } from '../block/block';
import { BlockContent } from '../../types/block-content';
import { calculate } from '../../utils/calculate';
import styles from './playground.module.scss';
import { Result } from '../../types/result';

export function Playground() {
    const arrayFill: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const [values, setValue] = useState(Array(9).fill(BlockContent.empty));
    const [result, setResult] = useState(Result.empty);

    function onBlockClick(index: number) {
        const copyValues = values.slice();
        if (values[index] !== BlockContent.empty) {
            return;
        }

        copyValues[index] = BlockContent.cross;

        if (copyValues.some((value: BlockContent) => value !== BlockContent.empty)) {
            const emptyIndexes: number[] = copyValues.reduce((acc: number[], currentValue: BlockContent, index: number) => {
                if (currentValue === BlockContent.empty) {
                    acc.push(index);
                }
                return acc;
            }, []);

            const randomIndex: number = Math.floor(Math.random() * emptyIndexes.length);
            copyValues[emptyIndexes[randomIndex]] = BlockContent.oval;
        }

        setValue(copyValues);

        const result: Result | null = calculate(copyValues);

        if (!result) {
            if (copyValues.every((value: BlockContent) => value !== BlockContent.empty)) {
                setResult(Result.draw);
            }

            return;
        }

        setResult(result);
    }

    const onResetClick = () => {
        setValue(Array(9).fill(BlockContent.empty));
        setResult(Result.empty);
    }

    return (
        <div className={styles.playground}>
            <Lottie animationData={grid} loop={false} className={styles.playground__anim} />
            <div className={styles.playground__grid}>
                {
                    arrayFill.map((index: number) => (
                        <Block isDisabled={result !== Result.empty} key={index} value={values[index]} onBlockClick={() => onBlockClick(index)} />
                    ))
                }
            </div>
            {
                result === Result.win &&
                <div className={styles.playground__result}>
                    YOU WON!!!
                    <Lottie animationData={winner} loop={2} />
                </div>
            }
            {
                result === Result.failed &&
                <div className={styles.playground__result}>You lost 😔</div>
            }
            {
                result === Result.draw &&
                <div className={styles.playground__result}>Draw! Try again</div>
            }
            {
                result !== Result.empty && <button className={styles.playground__reset} onClick={onResetClick}>Play again</button>
            }
        </div>
    )
}