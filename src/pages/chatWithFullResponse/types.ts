export interface IChatList {
  messages: IMessage[];
}
export interface IMessage {
  content: string;
  role: "system" | "assistant" | "user";
}
export interface IGptResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: IChoice[];
  usage: IUsage;
}

export interface IChoice {
  index: number;
  message: IMessage;
  finish_reason: string | null;
}

export interface IUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}
export interface IUserProfileData {
  company: string;
  resources: string;
}
