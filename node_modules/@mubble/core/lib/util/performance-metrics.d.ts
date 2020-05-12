export declare class PerformanceMetrics {
    private taskName;
    private startTs;
    private cycles;
    private cycle;
    constructor(taskName: string);
    startStep(stepName: string): void;
    endStep(stepName: string): void;
    finish(): void;
    private markEntry;
    private now;
    private logEntry;
}
