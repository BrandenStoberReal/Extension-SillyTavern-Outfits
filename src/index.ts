import {
    ContextUtil,
    createSettingsSchema,
    initializeValueTrackerAPI,
    Logger,
    LogLevel,
    registerSettingsPanel,
    SettingsManager,
    valueTrackerAPI
} from 'sillytavern-utils';
import {EXTENSION_ID, EXTENSION_NAME} from './constants';

const mainlogger = new Logger({
    level: LogLevel.DEBUG,
    prefix: EXTENSION_NAME,
    timestamp: true,
});

// Initialize the extension when the app is ready
const initializeExtension = async () => {
    try {
        initializeValueTrackerAPI(EXTENSION_ID);

        const registerResponse = await valueTrackerAPI.registerExtension(EXTENSION_ID);
        toastr.success("Successfully registered with ValueTracker");
    } catch (error) {
        toastr.error(" Error registering with ValueTracker: " + error);
    }
};

// Actual execution START

(function () {
    const ctxUtil = ContextUtil.getInstance();
    const ctx = ctxUtil.fetchSillyTavernContext().then((resolved) => {
        resolved.eventSource.on(resolved.event_types.APP_READY, () => {
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
        })
    });
})();
