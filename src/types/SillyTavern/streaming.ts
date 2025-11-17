export interface StreamResponse {
    text: string;
    swipes: string[];
    state: {
        reasoning: string;
        image?: string;
    };
}

export interface StreamingProcessor {
    generator: AsyncGenerator<any, void, unknown>;
    isFinished: boolean;
    isStopped: boolean;
    messageId: number;
    firstMessageText: string;
    toolCalls: any[];
    result: string;

    constructor(type: string, force_name2: boolean, generation_started: Date, continue_mag: string, promptReasoning: any): StreamingProcessor;

    generate(): Promise<any>;

    onStopStreaming(): void;

    onFinishStreaming(messageId: number, getMessage: string): Promise<void>;
}
