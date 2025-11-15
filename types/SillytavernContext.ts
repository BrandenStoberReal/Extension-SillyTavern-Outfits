/**
 * Type definitions for SillyTavern context object
 */

// Core types
export interface IChar {
    name: string;
    description: string;
    personality: string;
    first_mes: string;
    avatar: string;
    chat: string;
    mes_example: string;
    scenario: string;
    create_date: string;
    talkativeness: string;
    fav: boolean;
    creatorcomment: string;
    spec: string;
    spec_version: string;
    data?: ICharData;
    tags: string[];
    json_data?: string;
    date_added: number;
    chat_size: number;
    date_last_chat: number;
    data_size: number;
}

export interface ICharData {
    name: string;
    description: string;
    personality: string;
    scenario: string;
    first_mes: string;
    mes_example: string;
    creator_notes: string;
    system_prompt: string;
    post_history_instructions: string;
    tags: string[];
    creator: string;
    character_version: string;
    alternate_greetings: string[];
    extensions: ICharExtensions;
    character_book: ICharacterBook;
    group_only_greetings: string[];
}

export interface ICharExtensions {
    talkativeness: string;
    fav: boolean;
    world: string;
    depth_prompt: IDepthPrompt;
}

export interface IDepthPrompt {
    prompt: string;
    depth: number;
    role: string;
}

export interface ICharacterBook {
    entries: ICharacterBookEntry[];
    name: string;
}

export interface ICharacterBookEntry {
    id: number;
    keys: string[];
    secondary_keys: string[];
    comment: string;
    content: string;
    constant: boolean;
    selective: boolean;
    insertion_order: number;
    enabled: boolean;
    position: string;
    use_regex: boolean;
    extensions: ICharacterBookEntryExtensions;
}

export interface ICharacterBookEntryExtensions {
    position: number;
    exclude_recursion: boolean;
    display_index: number;
    probability: number;
    useProbability: boolean;
    depth: number;
    selectiveLogic: number;
    group: string;
    group_override: boolean;
    group_weight: number;
    prevent_recursion: boolean;
    delay_until_recursion: boolean;
    scan_depth: number | null;
    match_whole_words: number | null;
    use_group_scoring: boolean;
    case_sensitive: number | null;
    automation_id: string;
    role: number;
    vectorized: boolean;
    sticky: number;
    cooldown: number;
    delay: number;
}

export interface IGroup {
    id: string;
    name: string;
    members: string[];
    avatar_url: string;
    allow_self_responses: boolean;
    activation_strategy: number;
    generation_mode: number;
    disabled_members: string[];
    chat_metadata: Record<string, any>;
    fav: boolean;
    chat_id: string;
    chats: string[];
    auto_mode_delay: number;
    generation_mode_join_prefix: string;
    generation_mode_join_suffix: string;
    date_added: number;
    create_date: string;
    date_last_chat: number;
    chat_size: number;
    past_metadata: Record<string, any>;
}

export interface IChatMessage {
    // Define the structure of a chat message if needed
    [key: string]: any;
}

export interface IEventSource {
    events: Record<string, Array<any | null>>;
    autoFireLastArgs: Record<string, any>;
    autoFireAfterEmit: Record<string, any>;
}

export interface IExtensionPrompts {
    [key: string]: {
        value: string;
        position: number;
        depth: number;
        scan: boolean;
        role: number;
        filter: any | null;
    };
}

export interface IExtensionSettings {
    [key: string]: any;
}

export interface IChatCompletionSettings {
    [key: string]: any;
}

export interface ITextCompletionSettings {
    [key: string]: any;
}

export interface IPowerUserSettings {
    [key: string]: any;
}

export interface ITag {
    id: string;
    name: string;
    color: string;
}

export interface ITagMap {
    [key: string]: string[];
}

export interface ICharacterCreateData {
    name: string;
    description: string;
    creator_notes: string;
    post_history_instructions: string;
    character_version: string;
    system_prompt: string;
    tags: string;
    creator: string;
    personality: string;
    first_message: string;
    avatar: any | null;
    scenario: string;
    mes_example: string;
    world: string;
    talkativeness: number;
    alternate_greetings: string[];
    depth_prompt_prompt: string;
    depth_prompt_depth: number;
    depth_prompt_role: string;
    extensions: Record<string, any>;
    extra_books: any[];
}

export interface IEventTypes {
    [key: string]: string;
}

export interface IPopupTypes {
    TEXT: number;
    CONFIRM: number;
    INPUT: number;
    DISPLAY: number;
    CROP: number;
}

export interface IPopupResults {
    AFFIRMATIVE: number;
    NEGATIVE: number;
    CANCELLED: null;
    CUSTOM1: number;
    CUSTOM2: number;
    CUSTOM3: number;
    CUSTOM4: number;
    CUSTOM5: number;
    CUSTOM6: number;
    CUSTOM7: number;
    CUSTOM8: number;
    CUSTOM9: number;
}

export interface ITokenizerTypes {
    NONE: number;
    GPT2: number;
    OPENAI: number;
    LLAMA: number;
    NERD: number;
    NERD2: number;
    API_CURRENT: number;
    MISTRAL: number;
    YI: number;
    API_TEXTGENERATIONWEBUI: number;
    API_KOBOLD: number;
    CLAUDE: number;
    LLAMA3: number;
    GEMMA: number;
    JAMBA: number;
    QWEN2: number;
    COMMAND_R: number;
    NEMO: number;
    DEEPSEEK: number;
    COMMAND_A: number;
    BEST_MATCH: number;
}

export interface IArgumentTypes {
    STRING: string;
    NUMBER: string;
    RANGE: string;
    BOOLEAN: string;
    VARIABLE_NAME: string;
    CLOSURE: string;
    SUBCOMMAND: string;
    LIST: string;
    DICTIONARY: string;
}

export interface IConnectApiMap {
    [key: string]: {
        selected: string;
        button?: string;
        type?: string;
        source?: string;
    };
}

export interface ISwipeDirections {
    left: any;
    right: any;
}

export interface IVariables {
    local: {
        get: (name: string) => any;
        set: (name: string, value: any) => void;
    };
    global: {
        get: (name: string) => any;
        set: (name: string, value: any) => void;
    };
}

export interface ISymbols {
    ignore: string;
}

// Main context interface
export interface ISillyTavernContext {
    accountStorage: Record<string, any>;
    chat: IChatMessage[];
    characters: IChar[];
    groups: IGroup[];
    name1: string;
    name2: string;
    characterId: number | null;
    groupId: string | null;
    chatId: string | null;
    getCurrentChatId: () => string;
    getRequestHeaders: () => Record<string, string>;
    reloadCurrentChat: () => void;
    renameChat: (newName: string) => void;
    saveSettingsDebounced: () => void;
    onlineStatus: string;
    maxContext: number;
    chatMetadata: Record<string, any>;
    saveMetadataDebounced: () => void;
    streamingProcessor: any | null;
    eventSource: IEventSource;
    eventTypes: IEventTypes;
    addOneMessage: (message: any) => void;
    deleteLastMessage: () => void;
    generate: (options: any) => Promise<any>;
    sendStreamingRequest: (data: any) => Promise<any>;
    sendGenerationRequest: (data: any) => Promise<any>;
    stopGeneration: () => void;
    tokenizers: ITokenizerTypes;
    getTextTokens: (text: string) => number;
    getTokenCount: (text: string) => number;
    getTokenCountAsync: (text: string) => Promise<number>;
    extensionPrompts: IExtensionPrompts;
    setExtensionPrompt: (name: string, value: any) => void;
    updateChatMetadata: (metadata: Record<string, any>) => void;
    saveChat: () => void;
    openCharacterChat: (characterId: number) => void;
    openGroupChat: (groupId: string) => void;
    saveMetadata: () => void;
    sendSystemMessage: (message: string) => void;
    activateSendButtons: () => void;
    deactivateSendButtons: () => void;
    saveReply: (message: any) => void;
    substituteParams: (text: string) => string;
    substituteParamsExtended: (text: string, params: Record<string, any>) => string;
    SlashCommandParser: any;
    SlashCommand: any;
    SlashCommandArgument: any;
    SlashCommandNamedArgument: any;
    ARGUMENT_TYPE: IArgumentTypes;
    executeSlashCommandsWithOptions: (text: string, options: any) => any;
    registerSlashCommand: (command: any) => void;
    executeSlashCommands: (text: string) => any;
    timestampToMoment: any;
    registerHelper: () => void;
    registerMacro: (name: string, handler: any) => void;
    unregisterMacro: (name: string) => void;
    registerFunctionTool: (tool: any) => void;
    unregisterFunctionTool: (name: string) => void;
    isToolCallingSupported: () => boolean;
    canPerformToolCalls: () => boolean;
    ToolManager: any;
    registerDebugFunction: (func: any) => void;
    renderExtensionTemplate: any;
    renderExtensionTemplateAsync: (templateName: string, data: any) => Promise<string>;
    registerDataBankScraper: (scraper: any) => void;
    callPopup: any;
    callGenericPopup: (options: any) => Promise<any>;
    showLoader: () => void;
    hideLoader: () => void;
    mainApi: string;
    extensionSettings: IExtensionSettings;
    ModuleWorkerWrapper: any;
    getTokenizerModel: () => any;
    generateQuietPrompt: (prompt: string) => Promise<string>;
    generateRaw: (options: any) => Promise<any>;
    writeExtensionField: (extensionName: string, fieldName: string, value: any) => void;
    getThumbnailUrl: (path: string) => string;
    selectCharacterById: (id: number) => void;
    messageFormatting: any;
    shouldSendOnEnter: () => boolean;
    isMobile: boolean;
    t: (key: string, params?: Record<string, any>) => string;
    translate: (text: string, target: string, source?: string) => Promise<string>;
    getCurrentLocale: () => string;
    addLocaleData: (data: any) => void;
    tags: ITag[];
    tagMap: ITagMap;
    menuType: string;
    createCharacterData: ICharacterCreateData;
    event_types: IEventTypes;
    Popup: any;
    POPUP_TYPE: IPopupTypes;
    POPUP_RESULT: IPopupResults;
    chatCompletionSettings: IChatCompletionSettings;
    textCompletionSettings: ITextCompletionSettings;
    powerUserSettings: IPowerUserSettings;
    getCharacters: () => IChar[];
    getCharacterCardFields: () => any[];
    uuidv4: () => string;
    humanizedDateTime: (date: Date | string) => string;
    updateMessageBlock: (messageId: string, content: string) => void;
    appendMediaToMessage: (messageId: string, media: any) => void;
    swipe: ISwipeDirections;
    variables: IVariables;
    loadWorldInfo: () => void;
    saveWorldInfo: () => void;
    reloadWorldInfoEditor: () => void;
    updateWorldInfoList: () => void;
    convertCharacterBook: (book: any) => any;
    getWorldInfoPrompt: () => string;
    CONNECT_API_MAP: IConnectApiMap;
    getTextGenServer: () => any;
    extractMessageFromData: (data: any) => any;
    getPresetManager: () => any;
    getChatCompletionModel: () => string;
    printMessages: (messages: IChatMessage[]) => void;
    clearChat: () => void;
    ChatCompletionService: any;
    TextCompletionService: any;
    ConnectionManagerRequestService: any;
    updateReasoningUI: (reasoning: string) => void;
    parseReasoningFromString: (reasoning: string) => any;
    unshallowCharacter: (char: any) => any;
    unshallowGroupMembers: (group: any) => any[];
    openThirdPartyExtensionMenu: (extensionName: string) => void;
    symbols: ISymbols;
}

// Function to get the context
export function getContext(): ISillyTavernContext {
    throw new Error('getContext must be implemented in the actual SillyTavern environment');
}