import './css/style.css';

// Define extension name as a global constant
const EXTENSION_NAME = 'Outfit Extension';

// Define API constants
const API_ROOT_URL = '/api/plugins/valuetracker';
const EXTENSION_ID = 'extension-valuetracker-outfits';

// Define module name for settings
const MODULE_NAME = 'outfit_extension';

// Default settings for the extension
const defaultSettings = Object.freeze({
    debugMode: false
});

// Define API enums
enum ApiEndpoints {
    Register = '/register',
}

enum HttpMethod {
    GET = 'GET',
    HEAD = 'HEAD',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
    OPTIONS = 'OPTIONS',
}

enum HttpContentType {
    JSON = 'application/json',
}

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
            console.error("Value Tracker not found or not running. Did you enable server plugins in your config.yaml file?", result);
            return;
        } else if (!response.ok) {
            console.error('Failed to register with ValueTracker:', result);
            return;
        }

        console.log('Successfully registered with ValueTracker:', result.message);
    } catch (error) {
        console.error('Error registering with ValueTracker:', error);
    }
};

// Function to get or initialize settings
function getSettings() {
    const context = SillyTavern.getContext();
    // Use type assertion to handle extension settings
    const extensionSettings: Record<string, any> = context.extensionSettings;

    // Initialize settings if they don't exist
    if (!extensionSettings[MODULE_NAME]) {
        extensionSettings[MODULE_NAME] = structuredClone(defaultSettings);
    }

    // Ensure all default keys exist (helpful after updates)
    for (const key of Object.keys(defaultSettings)) {
        if (!(key in extensionSettings[MODULE_NAME])) {
            extensionSettings[MODULE_NAME][key] = defaultSettings[key as keyof typeof defaultSettings];
        }
    }

    // Remove the deprecated 'enabled' setting if it exists
    if ('enabled' in extensionSettings[MODULE_NAME]) {
        delete extensionSettings[MODULE_NAME].enabled;
    }

    return extensionSettings[MODULE_NAME];
}

// Initialize the extension when the app is ready
const initializeExtension = async () => {
    // Wait for the app to be ready
    if (typeof SillyTavern !== 'undefined' && SillyTavern.getContext) {
        const context = SillyTavern.getContext();
        const {eventSource, event_types} = context;

        // Listen for the app ready event
        eventSource.on(event_types.APP_READY, () => {
            console.log('Outfit Extension: App is ready');
            // Always register with ValueTracker when the app is ready
            registerWithValueTracker();
            console.log('Outfit Extension: Initialized');
        });

        // Listen for chat changes
        eventSource.on(event_types.CHAT_CHANGED, () => {
            console.log('Outfit Extension: Chat changed');
        });

        // Listen for incoming messages
        eventSource.on(event_types.MESSAGE_RECEIVED, (data) => {
            console.log('Outfit Extension: Message received', data);
        });

        // Listen for messages being sent
        eventSource.on(event_types.MESSAGE_SENT, (data) => {
            console.log('Outfit Extension: Message sent', data);
        });

        console.log('Outfit Extension: Event listeners registered');
    } else {
        console.error('SillyTavern context not available');
    }
};

// Register a simple slash command for testing
const registerSlashCommands = () => {
    if (typeof (globalThis as any).SlashCommandParser !== 'undefined' && typeof (globalThis as any).SlashCommand !== 'undefined') {
        (globalThis as any).SlashCommandParser.addCommandObject(
            (globalThis as any).SlashCommand.fromProps({
                name: 'outfit',
                callback: (namedArgs: any, unnamedArgs: any) => {
                    return `Outfit Extension is active. Command: ${unnamedArgs.toString()}`;
                },
                aliases: ['o'],
                returns: 'outfit extension status',
                helpString: `
                    <div>
                        Outfit Extension command for testing purposes.
                    </div>
                    <div>
                        <strong>Example:</strong>
                        <ul>
                            <li>
                                <pre><code class="language-stscript">/outfit status</code></pre>
                                returns the current status of the outfit extension
                            </li>
                        </ul>
                    </div>
                `,
            })
        );

        console.log('Outfit Extension: Slash commands registered');
    }
};

// Register settings panel in the settings UI
function registerSettingsPanel() {
    // Create settings HTML content using the standard format
    const settingsHtml = `
        <div class="outfit-extension-settings">
            <div class="inline-drawer">
                <div class="inline-drawer-toggle inline-drawer-header">
                    <b>Outfit Extension Settings</b>
                    <div class="inline-drawer-icon fa-solid fa-circle-chevron-down down"></div>
                </div>
                <div class="inline-drawer-content">
                    <div class="flex-container">
                        <label for="outfit-extension-debug">Debug Mode</label>
                        <input type="checkbox" id="outfit-extension-debug"
                                ${getSettings().debugMode ? 'checked' : ''}>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Wait for the app to be ready before trying to add settings
    if (typeof SillyTavern !== 'undefined' && SillyTavern.getContext) {
        const context = SillyTavern.getContext();
        if (context && context.eventSource) {
            // Listen for when the app is ready
            context.eventSource.on(context.event_types.APP_READY, function () {
                // Add settings panel to the extensions settings container using jQuery
                if (typeof $ !== 'undefined') {
                    $("#extensions_settings").append(settingsHtml);

                    // Set up event handler for the debug checkbox using jQuery
                    $("#outfit-extension-debug").on("input", function (this: HTMLElement) {
                        const settings = getSettings();
                        settings.debugMode = $(this).prop('checked');
                        SillyTavern.getContext().saveSettingsDebounced();
                    });

                    console.log('Outfit Extension: Settings panel registered');
                } else {
                    console.error('jQuery not available, cannot register settings panel');
                }
            });
        }
    }
}

// Actual execution START

initializeExtension();
registerSlashCommands();
registerSettingsPanel();

console.log(`${EXTENSION_NAME}: Initialization complete`);
