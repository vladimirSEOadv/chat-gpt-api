import React, {FC} from "react";
import styles from './FormatedText.module.scss'

interface IFormattedText {
    text: string
}

export const FormattedText: FC<IFormattedText> = ({ text }) => {
    if (!text || !text.length) {
        return null
    }
    return (
        <div>
            {text.split('\n').map((paragraph, index) => (
                <p className={styles['text']} key={index}>{paragraph}</p>
            ))}
        </div>
    );
};