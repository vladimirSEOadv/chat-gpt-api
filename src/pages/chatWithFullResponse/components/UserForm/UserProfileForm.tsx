import React, { Dispatch, FC, SetStateAction } from "react";
import styles from "./UserProfileForm.module.scss";
import { Button, Form } from "antd";
import TextArea from "antd/es/input/TextArea";
interface FieldType {
  company?: string;
  resources?: string;
}
interface IUserProfileForm {
  setUserFormVisible: Dispatch<SetStateAction<boolean>>;
  setUserProfileData: any;
  userProfileData: any;
}
export const UserProfileForm: FC<IUserProfileForm> = ({
  setUserFormVisible,
  setUserProfileData,
  userProfileData,
}) => {
  const onFinish = (values: any) => {
    setUserProfileData(values);
    console.log("Success:", values);
    setUserFormVisible(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const closeBtnHandler = () => {
    setUserFormVisible(false);
  };
  return (
    <div className={styles["user-form"]}>
      <Form
        name="basic"
        layout={"vertical"}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item<FieldType>
          label="Company"
          name="company"
          initialValue={userProfileData.company}
        >
          <TextArea
            autoSize={{ minRows: 4, maxRows: 8 }}
            placeholder="Please write about your company"
          />
        </Form.Item>
        <Form.Item<FieldType>
          label="Resources"
          name="resources"
          initialValue={userProfileData.resources}
        >
          <TextArea
            autoSize={{ minRows: 4, maxRows: 8 }}
            placeholder="Please write about company main resources and assets"
          />
        </Form.Item>
        <Form.Item className={styles["user-form__footer"]}>
          <Button
            onClick={closeBtnHandler}
            className={styles["user-form__close-btn"]}
          >
            Close
          </Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
