import React, {FC} from "react";

interface IFormattedText {
    text: string
}

export const FormattedText: FC<IFormattedText> = ({ text }) => {
    console.log("text", text)
    if (!text || !text.length) {
        return ''
    }
    return (
        <div>
            {text.split('\n').map((paragraph, index) => (
                <p className='text' key={index}>{paragraph}</p>
            ))}
        </div>
    );
};