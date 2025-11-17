
export interface ModuleWorkerWrapper {
    new(callback: (...args: any[]) => void): ModuleWorkerWrapper;
    update(...args: any[]): Promise<void>;
}
