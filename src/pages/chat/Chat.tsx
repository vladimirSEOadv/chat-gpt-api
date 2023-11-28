import React, {useState} from "react";
import {Button, Input} from "antd";
import {FaArrowUp} from "react-icons/fa";
import {IGptResponse, IMessage} from "@/pages/chat/types.ts";
import {ChatList} from "@/pages/chat/components/ChatList.tsx";
import {getData} from "@/pages/chat/utils/getData.ts";


export const Chat = () => {
    const [inputField, setInputField] = useState<string>("")
    const [chatMessages, setChatMessages] = useState<IMessage[]>([
        // {
        //     "role": "system",
        //     "content": "Привет",
        // },
        // {
        //     "role": "assistant",
        //     "content": `Стратегия развития бизнеса`,
        // }
    ])

    const askGpt = async () => {
        if(!inputField.trim().length) return
        // @ts-ignore
        setChatMessages((prev)=> {
            return [...prev, {role: 'system', content: inputField}]
        })
        setInputField('')
        try {
            const response = await getData(inputField, chatMessages) as IGptResponse
            console.log("response", response)

            // @ts-ignore
            setChatMessages((prev   )=> [...prev, response?.choices[0]?.message])

        } catch (error) {
            console.error('Error:', error);
        }
    }

    const onChangeHandler = (e: React.ChangeEventHandler<HTMLInputElement>) => {
        // @ts-ignore
        setInputField(e.target.value);
    }

    console.log("chat", chatMessages);
    // @ts-ignore
    return (
        <div className={'container'}>
            <div className={'chat-wrapper'}>
                <div className="main-input">
                    <Input className={'input'} value={inputField} onChange={onChangeHandler} size="large"
                           placeholder="Enter text"/>
                    <Button className='btn' size={"middle"} onClick={askGpt} type="default"> <FaArrowUp/> </Button>
                </div>
                <ChatList messages={chatMessages} />
            </div>
        </div>
    );
};