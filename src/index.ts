import '@fortawesome/fontawesome-free/css/all.css';
import './css/style.css';
import 'sillytavern-utils/styles'
import {AddHeaderButton, Logger, LogLevel} from 'sillytavern-utils';
import {API_ROOT_URL, ApiEndpoints, EXTENSION_ID, EXTENSION_NAME, HttpContentType, HttpMethod} from './constants';
import {SettingsManager} from './settings';
import {schema} from './schema';

const settingsManager = new SettingsManager(schema);

const mainlogger = new Logger({
    level: LogLevel.DEBUG,
    prefix: EXTENSION_NAME,
    timestamp: true
});

// Register with ValueTracker plugin on startup
const registerWithValueTracker = async () => {
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

        if (contentType && contentType.includes(HttpContentType.JSON)) {
            result = await response.json();
        } else {
            // If not JSON, get text content for debugging
            const textResult = await response.text();
            mainlogger.warn('Non-JSON response received:', textResult);
            window.toastr.warning('Non-JSON response received from ValueTracker. See mainlogger for details.');
            result = {message: textResult, status: response.status};
        }

        if (response.status === 404) {
            mainlogger.error('Value Tracker not found or not running. Did you enable server plugins in your config.yaml file?', result);
            window.toastr.error('Value Tracker not found or not running. Did you enable server plugins in your config.yaml file?');
            return;
        } else if (response.status === 403) {
            mainlogger.error('Access forbidden. Please check that ValueTracker plugin is properly configured and enabled:', result);
            window.toastr.error('Access forbidden. Please check that ValueTracker plugin is properly configured and enabled.');
            return;
        } else if (!response.ok) {
            mainlogger.error('Failed to register with ValueTracker:', result);
            window.toastr.error('Failed to register with ValueTracker. See mainlogger for details.');
            return;
        }

        mainlogger.info('Successfully registered with ValueTracker:', result.message);
        window.toastr.success('Successfully registered with ValueTracker.');

    } catch (error) {
        mainlogger.error('Error registering with ValueTracker:', error);
        window.toastr.error('Error registering with ValueTracker. See mainlogger for details.');
    }
};

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

            // Add the new header button
            const {content} = AddHeaderButton({
                id: 'st-outfits-header-button',
                iconName: 'shirt',
                title: 'Outfits',
                position: 'last',
            });

            // Add a placeholder to the drawer content
            content.innerHTML = '<h3>Outfits</h3><p>Manage your outfits here.</p>';

            mainlogger.info(`${EXTENSION_NAME}: Initialized`);
        });

        // Listen for chat changes
        eventSource.on(event_types.CHAT_CHANGED, () => {
            mainlogger.info(`${EXTENSION_NAME}: Chat changed`);
        });

        // Listen for chat creations
        eventSource.on(event_types.CHAT_CREATED, () => {
            mainlogger.info(`${EXTENSION_NAME}: Chat created`);
        });

        // Listen for incoming messages
        eventSource.on(event_types.MESSAGE_RECEIVED, (data: object) => {
            mainlogger.info(`${EXTENSION_NAME}: Message received`, data);
        });

        // Listen for messages being sent
        eventSource.on(event_types.MESSAGE_SENT, (data: object) => {
            mainlogger.info(`${EXTENSION_NAME}: Message sent`);
        });

        mainlogger.info(`${EXTENSION_NAME}: Event listeners registered`);
    } else {
        mainlogger.error('SillyTavern context not available');
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

        mainlogger.info(`${EXTENSION_NAME}: Slash commands registered`);
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
                <div id="st-outfits-settings-content" class="inline-drawer-content">
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
                    const settingsContent = document.getElementById('st-outfits-settings-content');
                    if (settingsContent) {
                        settingsManager.render(settingsContent);
                    }

                    mainlogger.info(`${EXTENSION_NAME}: Settings panel registered`);
                } else {
                    mainlogger.error(`${EXTENSION_NAME}: jQuery not available, cannot register settings panel`);
                }
            });
        }
    }
}

// Actual execution START

(function () {
    initializeExtension();
    registerSlashCommands();
    registerSettingsPanel();

    mainlogger.info(`${EXTENSION_NAME}: Initialization complete`);
})();
