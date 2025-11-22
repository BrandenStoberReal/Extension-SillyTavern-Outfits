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

    // Add settings panel to the DOM once the settings page is loaded
    const addSettingsPanel = () => {
        // Add settings panel to the DOM using the proper SillyTavern extension registration
        // Try multiple possible containers for compatibility with different versions
        const possibleContainers = [
            document.getElementById('settingsDiv'),  // Original target
            document.querySelector('#settingsDiv'),  // Selector fallback
            document.querySelector('#settings-menu'),  // Alternative target
            document.body  // Last resort
        ];

        let settingsContainer = null;
        for (const container of possibleContainers) {
            if (container) {
                settingsContainer = container;
                break;
            }
        }

        if (settingsContainer) {
            // Insert the settings panel HTML
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
                        // Create settings navigation link even if we can't find a specific container
                        // Look for the settings modal backdrop or similar element
                        const modalBackdrop = document.querySelector('.dialoguePopupBackdrop.settings');
                        if (modalBackdrop) {
                            // Create a temporary container in the modal backdrop for extension links
                            let extensionLinksContainer = document.querySelector('.extension-settings-links') as HTMLElement;
                            if (!extensionLinksContainer) {
                                extensionLinksContainer = document.createElement('div');
                                extensionLinksContainer.className = 'extension-settings-links';
                                extensionLinksContainer.style.borderTop = '1px solid #999';
                                extensionLinksContainer.style.paddingTop = '10px';
                                extensionLinksContainer.style.marginTop = '10px';
                                modalBackdrop.appendChild(extensionLinksContainer);
                            }

                            const linkElement = document.createElement('A') as HTMLAnchorElement;
                            linkElement.setAttribute('data-target', 'outfit-extension-settings');
                            linkElement.textContent = EXTENSION_NAME;
                            linkElement.href = 'javascript:void(0)';
                            linkElement.style.display = 'block';
                            linkElement.style.margin = '5px 0';
                            extensionLinksContainer.appendChild(linkElement);
                        } else {
                            // As a last resort, add a button to open settings in a different way
                            console.warn(`Could not find standard settings navigation container for ${EXTENSION_NAME}`);

                            // Try to add our settings to the extension manager area
                            const extensionManager = document.querySelector('#manage-extensions-content');
                            if (extensionManager) {
                                const extensionSettingsDiv = document.createElement('div');
                                extensionSettingsDiv.innerHTML = `
                                    <details class="settings-list-item">
                                        <summary class="list-header">
                                            <span class="list-title">${EXTENSION_NAME} Settings</span>
                                        </summary>
                                        <div class="list-content">
                                            ${settingsHtml}
                                        </div>
                                    </details>
                                `;
                                extensionManager.appendChild(extensionSettingsDiv);

                                // Initialize settings after adding to DOM
                                const settings = getSettings();
                                const enabledCheckbox = extensionSettingsDiv.querySelector('#outfit-extension-enabled') as HTMLInputElement;
                                const debugCheckbox = extensionSettingsDiv.querySelector('#outfit-extension-debug') as HTMLInputElement;

                                if (enabledCheckbox && debugCheckbox) {
                                    enabledCheckbox.checked = settings.enabled;
                                    debugCheckbox.checked = settings.debugMode;

                                    enabledCheckbox.addEventListener('change', () => {
                                        settings.enabled = enabledCheckbox.checked;
                                        SillyTavern.getContext().saveSettingsDebounced();

                                        if (settings.enabled) {
                                            registerWithValueTracker();
                                        }
                                    });

                                    debugCheckbox.addEventListener('change', () => {
                                        settings.debugMode = debugCheckbox.checked;
                                        SillyTavern.getContext().saveSettingsDebounced();
                                    });
                                }
                            }
                        }
                    }
                }
            }

            console.log('Outfit Extension: Settings panel registered');
        } else {
            // If we still can't find any container, defer the registration until later
            console.warn('Could not find any settings container for Outfit Extension, deferring...');
        }
    };

    // Try to add settings panel immediately
    addSettingsPanel();

    // Also try to add it once the app is ready and DOM is fully loaded
    if (typeof SillyTavern !== 'undefined' && SillyTavern.getContext) {
        const context = SillyTavern.getContext();
        if (context && context.eventSource) {
            // Listen for when the app is ready
            context.eventSource.on(context.event_types.APP_READY, addSettingsPanel);

            // Also listen for settings modal open or similar events if available
            // This is a custom approach since there's no specific "settings opened" event
            // We'll use a MutationObserver to detect when settings elements are added to the DOM
            const observer = new MutationObserver((mutationsList) => {
                for (const mutation of mutationsList) {
                    if (mutation.type === 'childList') {
                        // Check if any settings-related elements were added
                        const addedNodes = Array.from(mutation.addedNodes);
                        const hasSettingsElement = addedNodes.some(node =>
                            node.nodeType === Node.ELEMENT_NODE &&
                            (node as Element).matches &&
                            ((node as Element).matches('[id*="settings" i]') ||
                                (node as Element).matches('[class*="settings" i]'))
                        );

                        if (hasSettingsElement) {
                            // Delay slightly to ensure the element is fully rendered
                            setTimeout(addSettingsPanel, 100);
                            break;
                        }
                    }
                }
            });

            // Start observing changes to the document body
            observer.observe(document.body, {childList: true, subtree: true});
        }
    }
};

// Actual execution START

initializeExtension();
registerSlashCommands();
registerSettingsPanel();

console.log(`${EXTENSION_NAME}: Initialization complete`);
