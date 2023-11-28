import React, {FC} from "react";
import {IChatList} from "@/pages/chat/types.ts";
import {FormattedText} from "@/pages/chat/components/FormatedText.tsx";

export const ChatList: FC<IChatList> = ({messages}) => {
    return messages.map((item, idx) => {
        return (
            <div key={idx} className='message'>
                <div className={'avatar'}>{item.role === "system" ? 'You' : 'ChatGPT'}</div>
                <div className={item.role === "system" ? "my-message" : 'gpt-message'} key={idx}>
                    <FormattedText text={item.content}/>
                </div>
            </div>
        )
    })
}