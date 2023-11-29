import React, {FC} from "react";
import {IChatList} from "@/pages/chatWithFullResponse/types.ts";
import {FormattedText} from "@/pages/chatWithFullResponse/components/FormatedText/FormatedText.tsx";
import styles from './ChatList.module.scss'

export const ChatList: FC<IChatList> = ({messages}) => {
    const roles = {
        system: {name: "system" ,class: "system"},
        assistant: {name: "ChatGPT",class: "gpt-message"},
        user : {name: 'You',class: "my-message"}
    }
    return messages.map((item, idx) => {
        if(item.role === "system") return null
        return (
            <div key={idx} className={styles['message']}>
                <div className={styles['avatar']}>
                    {roles[item.role].name}
                </div>
                <div className={styles[`${roles[item.role].class}`]} key={idx}>
                    <FormattedText text={item.content}/>
                </div>
            </div>
        )
    })
}