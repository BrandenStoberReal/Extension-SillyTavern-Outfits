import './css/style.css';
import {logError, logInfo} from './utils/logger';

// Register with ValueTracker plugin on startup
const registerWithValueTracker = async () => {
    try {
        const response = await fetch('/api/plugins/valuetracker/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                extensionId: 'extension-valuetracker-outfits',
            }),
        });

        const result = await response.json();

        if (!response.ok) {
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
