import {
    createSettingsSchema,
    initializeValueTrackerAPI,
    Logger,
    LogLevel,
    registerSettingsPanel,
    SettingsManager,
    slashCommandsUtil,
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

// Register a simple slash command for testing
const registerSlashCommands = () => {
    const success = slashCommandsUtil.registerSlashCommand(
        'outfit-status',
        (namedArgs, unnamedArgs) => {
            return `${EXTENSION_NAME} online and operational.`;
        },
        {
            aliases: [''],
            returns: 'Outfit extension status message',
            helpString: '<div>Get the status of the extension.</div>',
        }
    );

    mainlogger.info(`${EXTENSION_NAME}: Slash commands registered`);
};


// Actual execution START

(function () {
    initializeExtension();
    registerSlashCommands();

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
