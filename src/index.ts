import './css/style.css';
import {logError, logInfo} from './utils/logger';

// Register with ValueTracker plugin on startup
const registerWithValueTracker = async () => {
    try {
        const response = await fetch(API_ROOT_URL + ApiEndpoints.Register, {
            method: HttpMethod.POST,
            headers: {
                'Content-Type': HttpContentType.JSON,
            },
            body: JSON.stringify({
                extensionId: EXTENSION_ID,
            }),
        });

        const result = await response.json();

        if (response.status === 404) {
            logError("Value Tracker not found or not running. Did you enable server plugins in your config.yaml file?", result);
            return;
        } else if (!response.ok) {
            logError('Failed to register with ValueTracker:', result);
            return;
        }

        logInfo('Successfully registered with ValueTracker:', result.message);
    } catch (error) {
        logError('Error registering with ValueTracker:', error);
    }
};

// Register on extension startup
registerWithValueTracker();
