import './css/style.css';
import {logger} from "./utils/logger";
import {API_ROOT_URL, EXTENSION_ID, EXTENSION_NAME, MODULE_NAME} from "./constants";

// Default settings for the extension
const defaultSettings = Object.freeze({
    debugMode: false,
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
    if (!window.toastr) {
        logger.error('window.toastr is not available inside registerWithValueTracker');
        return; // Exit if toastr is not available
    }

    const context = SillyTavern.getContext();

    window.toastr.info('Registering with ValueTracker plugin...');
    try {
        // Get the SillyTavern context to access authentication headers
        const headers = {
            ...context.getRequestHeaders(),  // Include standard ST authentication headers
            'Content-Type': HttpContentType.JSON,
        };

        const response = await fetch(API_ROOT_URL + ApiEndpoints.Register, {
            method: HttpMethod.POST,
            headers: headers,
            body: JSON.stringify({
                extensionId: EXTENSION_ID,
            }),
        });

        // Check if response is actually JSON before parsing
        const contentType = response.headers.get('content-type');
        let result;

        if (contentType && contentType.includes('application/json')) {
            result = await response.json();
        } else {
            // If not JSON, get text content for debugging
            const textResult = await response.text();
            logger.warn('Non-JSON response received:', textResult);
            window.toastr.warning('Non-JSON response received from ValueTracker. See logger for details.');
            result = {message: textResult, status: response.status};
        }

        if (response.status === 404) {
            logger.error('Value Tracker not found or not running. Did you enable server plugins in your config.yaml file?', result);
            window.toastr.error('Value Tracker not found or not running. Did you enable server plugins in your config.yaml file?');
            return;
        } else if (response.status === 403) {
            logger.error('Access forbidden. Please check that ValueTracker plugin is properly configured and enabled:', result);
            window.toastr.error('Access forbidden. Please check that ValueTracker plugin is properly configured and enabled.');
            return;
        } else if (!response.ok) {
            logger.error('Failed to register with ValueTracker:', result);
            window.toastr.error('Failed to register with ValueTracker. See logger for details.');
            return;
        }

        logger.info('Successfully registered with ValueTracker:', result.message);
        window.toastr.success('Successfully registered with ValueTracker.');

    } catch (error) {
        logger.error('Error registering with ValueTracker:', error);
        window.toastr.error('Error registering with ValueTracker. See logger for details.');
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
            // Always register with ValueTracker when the app is ready
            registerWithValueTracker();
            logger.info(`${EXTENSION_NAME}: Initialized`);
        });

        // Listen for chat changes
        eventSource.on(event_types.CHAT_CHANGED, () => {
            logger.info(`${EXTENSION_NAME}: Chat changed`);
        });

        // Listen for incoming messages
        eventSource.on(event_types.MESSAGE_RECEIVED, (data) => {
            logger.info(`${EXTENSION_NAME}: Message received`, data);
        });

        // Listen for messages being sent
        eventSource.on(event_types.MESSAGE_SENT, (data) => {
            logger.info(`${EXTENSION_NAME}: Message sent`, data);
        });

        logger.info(`${EXTENSION_NAME}: Event listeners registered`);
    } else {
        logger.error('SillyTavern context not available');
    }
};

// Register a simple slash command for testing
const registerSlashCommands = () => {
    if (typeof (globalThis as any).SlashCommandParser !== 'undefined' && typeof (globalThis as any).SlashCommand !== 'undefined') {
        (globalThis as any).SlashCommandParser.addCommandObject(
            (globalThis as any).SlashCommand.fromProps({
                name: 'outfit',
                callback: (namedArgs: any, unnamedArgs: any) => {
                    return `${EXTENSION_NAME} is active. Command: ${unnamedArgs.toString()}`;
                },
                aliases: ['o'],
                returns: `${EXTENSION_NAME.toLowerCase()} status`,
                helpString: `
                    <div>
                        ${EXTENSION_NAME.toLowerCase()} command for testing purposes.
                    </div>
                    <div>
                        <strong>Example:</strong>
                        <ul>
                            <li>
                                <pre><code class="language-stscript">/outfit status</code></pre>
                                returns the current status of the ${EXTENSION_NAME.toLowerCase()}
                            </li>
                        </ul>
                    </div>
                `,
            }),
        );

        logger.info(`${EXTENSION_NAME}: Slash commands registered`);
    }
};

// Register settings panel in the settings UI
function registerSettingsPanel() {
    // Create settings HTML content using the standard format
    const settingsHtml = `
        <div class="${EXTENSION_ID}-settings">
            <div class="inline-drawer">
                <div class="inline-drawer-toggle inline-drawer-header">
                    <b>${EXTENSION_NAME} Settings</b>
                    <div class="inline-drawer-icon fa-solid fa-circle-chevron-down down"></div>
                </div>
                <div class="inline-drawer-content">
                    <div class="flex-container">
                        <label for="${EXTENSION_ID}-debug">Debug Mode</label>
                        <input type="checkbox" id="${EXTENSION_ID}-debug"
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
                    $('#extensions_settings').append(settingsHtml);

                    // Set up event handler for the debug checkbox using jQuery
                    $('#outfit-extension-debug').on('input', function (this: HTMLElement) {
                        const settings = getSettings();
                        settings.debugMode = $(this).prop('checked');
                        SillyTavern.getContext().saveSettingsDebounced();
                    });

                    logger.info(`${EXTENSION_NAME}: Settings panel registered`);
                } else {
                    logger.error(`${EXTENSION_NAME}: jQuery not available, cannot register settings panel`);
                }
            });
        }
    }
}

// Actual execution START

const waitForToastr = setInterval(() => {
    if (window.toastr) {
        clearInterval(waitForToastr);

        initializeExtension();
        registerSlashCommands();
        registerSettingsPanel();

        logger.info(`${EXTENSION_NAME}: Initialization complete`);
    }
}, 100);
