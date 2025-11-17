
export interface StreamResponse {
    text: string;
    swipes: string[];
    state: {
        reasoning: string;
        image?: string;
    };
}

export interface StreamingProcessor {
    constructor(type: string, force_name2: boolean, generation_started: Date, continue_mag: string, promptReasoning: any): StreamingProcessor;
    generator: AsyncGenerator<any, void, unknown>;
    generate(): Promise<any>;
    onStopStreaming(): void;
    isFinished: boolean;
    isStopped: boolean;
    messageId: number;
    firstMessageText: string;
    toolCalls: any[];
    result: string;
    onFinishStreaming(messageId: number, getMessage: string): Promise<void>;
}
