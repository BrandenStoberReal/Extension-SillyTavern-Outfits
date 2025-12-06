import {
    AddHeaderButton,
    createSettingsSchema,
    initializeValueTrackerAPI,
    Logger,
    LogLevel,
    registerSettingsPanel,
    SettingsManager,
    valueTrackerAPI,
} from 'sillytavern-utils';
import {EXTENSION_ID, EXTENSION_NAME} from './constants';
import outfitManagerTemplate from './html/templates/outfitManager.html';

const mainlogger = new Logger({
    level: LogLevel.DEBUG,
    prefix: EXTENSION_NAME,
    timestamp: true,
});

// Initialize the extension when the app is ready
const initializeExtension = async () => {
    try {
        const registerResponse = await valueTrackerAPI.registerExtension(EXTENSION_ID);
        toastr.success("Successfully registered with ValueTracker");
    } catch (error) {
        toastr.error(" Error registering with ValueTracker: " + error);
    }

    const headerButton = AddHeaderButton({
        id: 'outfit-manager-button',
        iconName: 'fa-solid fa-user-pen',
        title: 'Outfit Manager',
    });

    headerButton.content.innerHTML = outfitManagerTemplate;
};

// Actual execution START

(function () {
    initializeValueTrackerAPI(EXTENSION_ID);

    initializeExtension();

    const ExtensionSchema = createSettingsSchema({
        debugMode: {
            type: 'checkbox',
            label: 'Debug Mode',
            description: 'Enable debug logging in the browser console.',
            value: false,
        }
    } as const);

    const settingsManager = new SettingsManager(ExtensionSchema, EXTENSION_NAME);

    registerSettingsPanel(settingsManager, EXTENSION_ID, EXTENSION_NAME, mainlogger);

    mainlogger.info(`${EXTENSION_NAME}: Initialization complete`);
})();
