export interface IMessage {
    "content": string,
    "role": "system" | "assistant"
}
export interface IChatList {
    messages: IMessage[];
}

// Response
export interface IGptResponse {
    id: string
    object: string
    created: number
    model: string
    choices: IChoice[]
    usage: IUsage
}

export interface IChoice {
    index: number
    message: IMessage
    finish_reason: string
}

export interface IUsage {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
}