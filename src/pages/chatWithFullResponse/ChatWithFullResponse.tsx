import React, { useState } from "react";
import { Button, Input, Spin } from "antd";
import { FaArrowUp } from "react-icons/fa";
import {
  IGptResponse,
  IMessage,
  IUserProfileData,
} from "@/pages/chatWithFullResponse/types.ts";
import { ChatList } from "@/pages/chatWithFullResponse/components/ChatList/ChatList.tsx";
import { getData } from "@/pages/chatWithFullResponse/utils/getData.ts";
import styles from "../ChatWithFullResponse.module.scss";
import { UserProfileForm } from "./components/UserForm/UserProfileForm.tsx";

export const ChatWithFullResponse = () => {
  const [inputField, setInputField] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<IMessage[]>([]);
  const [userFormVisible, setUserFormVisible] = useState(false);

  const [userProfileData, setUserProfileData] = useState<IUserProfileData>({
    // company: "Алмазодобывающая компания",
    // resources: "9 шахт, 500 рабочих, 7 буровых установок, 200 тонн динамита",
    company: "Сеть супермаркетов",
    resources:
      "9 складов, 500 рабочих, 3 супермаркета, заключенные контракты с ключевыми производителями",
  });

  const [loading, setLoading] = useState(false);

  const askGpt = async () => {
    setLoading(true);
    if (!inputField.trim().length) return;
    // @ts-ignore
    const newMessage: IMessage = { role: "user", content: inputField };
    setChatMessages((prev) => {
      return [...prev, newMessage];
    });
    setInputField("");

    const makeContext = (profile: IUserProfileData) => {
      const lib = {
        company: "My business is",
        resources: "Main resources in My company its",
      };
      let result: IMessage[] = [];
      for (const key of Object.keys(profile) as Array<keyof IUserProfileData>) {
        if (key in lib) {
          result.push({
            role: "system",
            content: `${lib[key as keyof IUserProfileData]} ${
              profile[key as keyof IUserProfileData]
            }`,
          });
        }
      }

      return result;
    };
    // @ts-ignore
    try {
      const response = (await getData(inputField, [
        ...makeContext(userProfileData),
        ...chatMessages,
      ])) as IGptResponse;
      console.log("response", response);

      // @ts-ignore
      setChatMessages((prev) => [...prev, response?.choices[0]?.message]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    // @ts-ignore
    setInputField(e.target.value);
  };

  // console.log("chat", chatMessages);
  // @ts-ignore
  return (
    <div className={"container"}>
      <div className={styles["chat-wrapper"]}>
        <div className={styles["main-input"]}>
          <Input
            className={styles["input"]}
            value={inputField}
            onChange={onChangeHandler}
            size="large"
            placeholder="Enter text"
          />
          <Button
            className={styles["btn"]}
            size={"middle"}
            onClick={askGpt}
            type="default"
          >
            {" "}
            <FaArrowUp />
          </Button>
        </div>
        <ChatList messages={chatMessages} />
        {loading && <Spin />}
      </div>
      <div className={styles["user-form-btn"]}>
        <Button onClick={() => setUserFormVisible(true)}>User profile</Button>
      </div>
      {userFormVisible && (
        <div className={styles["background"]}>
          <UserProfileForm
            setUserFormVisible={setUserFormVisible}
            userProfileData={userProfileData}
            setUserProfileData={setUserProfileData}
          />
        </div>
      )}
    </div>
  );
};
