import Lottie from 'lottie-react';
import cross from '../../assets/lottie/cross.json';
import oval from '../../assets/lottie/oval.json';
import { BlockContent } from '../../types/block-content';
import styles from './block.module.scss';
import { MouseEventHandler } from 'react';

interface BlockComponentProps {
    isDisabled: boolean,
    value: BlockContent,
    onBlockClick: MouseEventHandler<HTMLButtonElement>
}

export function Block({ isDisabled, value, onBlockClick }: BlockComponentProps) {
    return (
        <button className={styles.block} onClick={onBlockClick} disabled={isDisabled}>
            {
                value === BlockContent.cross && <Lottie animationData={cross} loop={false} />
            }
            {
                value === BlockContent.oval && <Lottie animationData={oval} loop={false} />
            }
        </button>
    )
}