import './css/style.css';

// Define extension name as a global constant
const EXTENSION_NAME = 'Outfit Extension';

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

// Define module name for settings
const MODULE_NAME = 'outfit_extension';

// Default settings for the extension
const defaultSettings = Object.freeze({
    enabled: false,
    debugMode: false
});

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
            const settings = getSettings();
            if (settings.enabled) {
                console.log('Outfit Extension: Initialized and enabled');
                // Register with ValueTracker when extension is enabled
                registerWithValueTracker();
            } else {
                console.log('Outfit Extension: Initialized but disabled');
            }
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
                    const settings = getSettings();
                    if (settings.enabled) {
                        return `Outfit Extension is currently enabled. Command: ${unnamedArgs.toString()}`;
                    } else {
                        return 'Outfit Extension is currently disabled.';
                    }
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
const registerSettingsPanel = () => {
    // Create settings HTML content
    const settingsHtml = `
        <div id="outfit-extension-settings" style="display: none;">
            <div class="inline-help">
                <p>Configure the Outfit Extension settings here.</p>
            </div>

            <div class="checkbox-nested">
                <label class="checkbox">
                    <input type="checkbox" id="outfit-extension-enabled" name="enabled">
                    <span>Enable Outfit Extension</span>
                </label>
            </div>

            <div class="checkbox-nested">
                <label class="checkbox">
                    <input type="checkbox" id="outfit-extension-debug" name="debugMode">
                    <span>Debug Mode</span>
                </label>
            </div>
        </div>
    `;

    // Add settings panel to the DOM using the proper SillyTavern extension registration
    const settingsContainer = document.getElementById('settingsDiv');
    if (settingsContainer) {
        settingsContainer.insertAdjacentHTML('beforeend', settingsHtml);

        // Get settings
        const settings = getSettings();

        // Set up the settings elements
        const enabledCheckbox = document.getElementById('outfit-extension-enabled') as HTMLInputElement;
        const debugCheckbox = document.getElementById('outfit-extension-debug') as HTMLInputElement;

        if (enabledCheckbox && debugCheckbox) {
            // Initialize checkbox states
            enabledCheckbox.checked = settings.enabled;
            debugCheckbox.checked = settings.debugMode;

            // Add event listeners to save settings when changed
            enabledCheckbox.addEventListener('change', () => {
                settings.enabled = enabledCheckbox.checked;
                SillyTavern.getContext().saveSettingsDebounced();

                // Register with ValueTracker when extension is enabled
                if (settings.enabled) {
                    registerWithValueTracker();
                }
            });

            debugCheckbox.addEventListener('change', () => {
                settings.debugMode = debugCheckbox.checked;
                SillyTavern.getContext().saveSettingsDebounced();
            });
        }

        // Add the settings panel to the main settings navigation
        // In newer versions of SillyTavern, we need to use the proper extension registration
        const navContainer = document.getElementById('settingsMenuExtensionItems');
        if (navContainer) {
            // If the extension items container exists, add our tab there
            const linkElement = document.createElement('A') as HTMLAnchorElement;
            linkElement.setAttribute('data-target', 'outfit-extension-settings');
            linkElement.textContent = EXTENSION_NAME;
            linkElement.href = 'javascript:void(0)';
            navContainer.appendChild(linkElement);
        } else {
            // Fallback: Try to add to the main settings menu if the extensions section doesn't exist
            const mainNavContainer = document.querySelector('#nav-settings') as HTMLElement;
            if (mainNavContainer) {
                // Create a wrapper for extension navigation items if it doesn't exist
                let extensionNavContainer = document.querySelector('#extension-nav-items') as HTMLElement;
                if (!extensionNavContainer) {
                    extensionNavContainer = document.createElement('div');
                    extensionNavContainer.id = 'extension-nav-items';
                    extensionNavContainer.classList.add('settingsGroup');
                    mainNavContainer.appendChild(extensionNavContainer);
                }

                const linkElement = document.createElement('A') as HTMLAnchorElement;
                linkElement.setAttribute('data-target', 'outfit-extension-settings');
                linkElement.textContent = EXTENSION_NAME;
                linkElement.href = 'javascript:void(0)';
                extensionNavContainer.appendChild(linkElement);
            } else {
                // For older versions, try to find the general nav container
                const generalNavContainer = document.querySelector('#settingsMenu .settingsGroup') as HTMLElement;
                if (generalNavContainer) {
                    const linkElement = document.createElement('A') as HTMLAnchorElement;
                    linkElement.setAttribute('data-target', 'outfit-extension-settings');
                    linkElement.textContent = EXTENSION_NAME;
                    linkElement.href = 'javascript:void(0)';
                    generalNavContainer.appendChild(linkElement);
                } else {
                    console.warn(`Could not find settings navigation container for ${EXTENSION_NAME}`);
                }
            }
        }

        console.log('Outfit Extension: Settings panel registered');
    } else {
        console.error('Could not find settingsDiv container for Outfit Extension');
    }
};

// Actual execution START

initializeExtension();
registerSlashCommands();
registerSettingsPanel();

console.log(`${EXTENSION_NAME}: Initialization complete`);
