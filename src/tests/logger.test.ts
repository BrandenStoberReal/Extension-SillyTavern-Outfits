/**
 * @jest-environment node
 */

import {logDebug, logError, Logger, logInfo, LogLevel, logWarn} from '../../../SillyTavern-Utils/src/utils/logger';

describe('Logger', () => {
    let consoleLogSpy: jest.SpyInstance;
    let consoleInfoSpy: jest.SpyInstance;
    let consoleWarnSpy: jest.SpyInstance;
    let consoleErrorSpy: jest.SpyInstance;

    beforeEach(() => {
        consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {
        });
        consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation(() => {
        });
        consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {
        });
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('Default Logger', () => {
        it('should log debug messages', () => {
            logDebug('test debug');
            expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('test debug'));
        });

        it('should log info messages', () => {
            logInfo('test info');
            expect(consoleInfoSpy).toHaveBeenCalledWith(expect.stringContaining('test info'));
        });

        it('should log warn messages', () => {
            logWarn('test warn');
            expect(consoleWarnSpy).toHaveBeenCalledWith(expect.stringContaining('test warn'));
        });

        it('should log error messages', () => {
            logError('test error');
            expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('test error'));
        });
    });

    describe('Custom Logger', () => {
        const customLogger = new Logger({
            prefix: 'TestLogger',
            level: LogLevel.DEBUG,
            timestamp: true,
        });

        it('should log debug messages', () => {
            customLogger.debug('test debug');
            expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('[TestLogger]'), expect.stringContaining('test debug'));
        });

        it('should log info messages', () => {
            customLogger.info('test info');
            expect(consoleInfoSpy).toHaveBeenCalledWith(expect.stringContaining('[TestLogger]'), expect.stringContaining('test info'));
        });

        it('should log warn messages', () => {
            customLogger.warn('test warn');
            expect(consoleWarnSpy).toHaveBeenCalledWith(expect.stringContaining('[TestLogger]'), expect.stringContaining('test warn'));
        });

        it('should log error messages', () => {
            customLogger.error('test error');
            expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('[TestLogger]'), expect.stringContaining('test error'));
        });
    });

    describe('Log Levels', () => {
        const testLogger = new Logger({prefix: 'LevelTest', level: LogLevel.WARN});

        it('should not log messages below the current log level', () => {
            testLogger.debug('This debug should NOT appear');
            testLogger.info('This info should NOT appear');
            expect(consoleLogSpy).not.toHaveBeenCalled();
            expect(consoleInfoSpy).not.toHaveBeenCalled();
        });

        it('should log messages at or above the current log level', () => {
            testLogger.warn('This warning SHOULD appear');
            testLogger.error('This error SHOULD appear');
            expect(consoleWarnSpy).toHaveBeenCalledWith(expect.stringContaining('This warning SHOULD appear'));
            expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('This error SHOULD appear'));
        });

        it('should change log level at runtime', () => {
            testLogger.setLevel(LogLevel.DEBUG);
            testLogger.debug('This debug SHOULD now appear');
            expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('This debug SHOULD now appear'));
        });
    });
});
