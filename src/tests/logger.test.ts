/*
 * Copyright (c) 2025.
 */

/**
 * Test file to validate the logging framework
 */

import {logDebug, logError, Logger, logInfo, LogLevel, logWarn} from '../utils/logger';

// Test the default logger instance
console.log('Testing default logger...');

logDebug('This is a debug message');
logInfo('This is an info message');
logWarn('This is a warning message');
logError('This is an error message');

// Test creating a custom logger instance
console.log('\nTesting custom logger instance...');

const customLogger = new Logger({
    prefix: 'TestLogger',
    level: LogLevel.DEBUG,
    timestamp: true,
});

customLogger.debug('Custom logger debug message');
customLogger.info('Custom logger info message');
customLogger.warn('Custom logger warning message');
customLogger.error('Custom logger error message');

// Test log level changes
console.log('\nTesting different log levels...');

const testLogger = new Logger({prefix: 'LevelTest', level: LogLevel.WARN});
testLogger.debug('This debug should NOT appear');
testLogger.info('This info should NOT appear');
testLogger.warn('This warning SHOULD appear');
testLogger.error('This error SHOULD appear');

// Change level at runtime
console.log('\nChanging level at runtime...');
testLogger.setLevel(LogLevel.DEBUG);
testLogger.debug('This debug SHOULD now appear after level change');

console.log('\nLogging framework tests completed successfully!');
