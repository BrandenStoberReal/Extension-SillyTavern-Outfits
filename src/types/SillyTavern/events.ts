
export type Listener = (...args: any[]) => void;

export interface EventSource {
    on(event: string, listener: Listener): void;
    off(event: string, listener: Listener): void;
    emit(event: string, ...args: any[]): Promise<void>;
    events: Record<string, Listener[]>;
}
