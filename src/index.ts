import './css/style.css';

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
            console.error('Failed to register with ValueTracker:', result);
            return;
        }

        console.log('Successfully registered with ValueTracker:', result.message);
    } catch (error) {
        console.error('Error registering with ValueTracker:', error);
    }
};

// Register on extension startup
registerWithValueTracker();
