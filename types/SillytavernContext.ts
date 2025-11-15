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

export interface MacroAutoCompleteOption {
    new (name: string, title: string, description: string): MacroAutoCompleteOption;
    name: string;
    title: string;
    description: string;
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

// Chat Completion Service related types
export interface TextCompletionRequestBase {
    stream?: boolean;
    max_tokens?: number;
    model?: string;
    api_type?: string;
    api_server?: string;
    temperature?: number;
    min_p?: number;
    [key: string]: any; // Allow additional properties
}

export interface TextCompletionPayload extends TextCompletionRequestBase {
    prompt: string;
    max_new_tokens?: number;
}

export interface TextCompletionOptions {
    presetName?: string;
    instructName?: string;
    instructSettings?: Partial<InstructSettings>;
}

export interface TextCompletionService {
    TYPE: string;
    createRequestData: (params: TextCompletionRequestBase & { prompt: string }) => TextCompletionPayload;
    sendRequest: (
        data: TextCompletionPayload,
        extractData?: boolean,
        signal?: AbortSignal
    ) => Promise<ExtractedData | (() => AsyncGenerator<StreamResponse>)>;
    processRequest: (
        custom: TextCompletionRequestBase & { prompt: any },
        options?: TextCompletionOptions,
        extractData?: boolean,
        signal?: AbortSignal
    ) => Promise<ExtractedData | (() => AsyncGenerator<StreamResponse>)>;
    presetToGeneratePayload: (
        preset: Record<string, any>,
        customPreset?: Record<string, any>
    ) => Record<string, any>;
}

export interface ChatCompletionMessage {
    role: string;
    content: string;
    name?: string;
    ignoreInstruct?: boolean;
}

export interface ChatCompletionPayload {
    stream?: boolean;
    messages: ChatCompletionMessage[];
    model: string;
    chat_completion_source: string;
    max_tokens?: number;
    temperature?: number;
    custom_url?: string;
    reverse_proxy?: string;
    proxy_password?: string;
    custom_prompt_post_processing?: string;
    use_makersuite_sysprompt?: boolean;
    claude_use_sysprompt?: boolean;
    [key: string]: any; // Allow additional properties
}

export interface ChatCompletionOptions {
    presetName?: string;
}

export interface StreamResponse {
    text: string;
    swipes: string[];
    state: {
        reasoning: string;
        image: string;
    };
}

export interface ExtractedData {
    content: string;
    reasoning: string;
}

export interface ChatCompletionService {
    TYPE: string;
    createRequestData: (params: ChatCompletionPayload) => ChatCompletionPayload;
    sendRequest: (
        data: ChatCompletionPayload,
        extractData?: boolean,
        signal?: AbortSignal
    ) => Promise<ExtractedData | (() => AsyncGenerator<StreamResponse>)>;
    processRequest: (
        custom: ChatCompletionPayload,
        options: ChatCompletionOptions,
        extractData?: boolean,
        signal?: AbortSignal
    ) => Promise<ExtractedData | (() => AsyncGenerator<StreamResponse>)>;
    presetToGeneratePayload: (
        preset: Record<string, any>,
        customParams?: Record<string, any>
    ) => Record<string, any>;
}

export interface InstructSettings {
    [key: string]: any; // Define the structure for instruct settings
}

export interface ConnectionProfile {
    id: string;
    mode: string;
    exclude: string[];
    api: string;
    preset: string;
    sysprompt: string;
    'sysprompt-state': string;
    context: string;
    'instruct-state': string;
    tokenizer: string;
    'stop-strings': string;
    'start-reply-with': string;
    'reasoning-template': string;
    name: string;
    model?: string;
    'api-url'?: string;
    proxy?: string;
    'prompt-post-processing'?: string;
    instruct?: string;
}

export interface ConnectionManagerRequestParams {
    stream?: boolean;
    signal?: AbortSignal | null;
    extractData?: boolean;
    includePreset?: boolean;
    includeInstruct?: boolean;
    instructSettings?: Partial<InstructSettings>;
}

export interface ConnectionManagerRequestService {
    defaultSendRequestParams: ConnectionManagerRequestParams;
    getAllowedTypes: () => Record<string, string>;
    sendRequest: (
        profileId: string,
        prompt: string | any[],
        maxTokens: number,
        custom?: ConnectionManagerRequestParams,
        overridePayload?: Record<string, any>
    ) => Promise<ExtractedData | (() => AsyncGenerator<StreamResponse>)>;
    getSupportedProfiles: () => ConnectionProfile[];
    isProfileSupported: (profile?: ConnectionProfile) => boolean;
    validateProfile: (profile?: ConnectionProfile) => any; // Return type is ConnectAPIMap
    handleDropdown: (
        selector: string,
        initialSelectedProfileId: string,
        onChange?: (profile?: ConnectionProfile) => Promise<void> | void,
        onCreate?: (profile: ConnectionProfile) => Promise<void> | void,
        unUpdate?: (oldProfile: ConnectionProfile, newProfile: ConnectionProfile) => Promise<void> | void,
        onDelete?: (profile: ConnectionProfile) => Promise<void> | void
    ) => void;
}

// Popup related types
export interface CustomPopupButton {
    text: string;
    result: number;
    classes?: string[];
    appendAtEnd?: boolean;
    action?: (event: Event) => void;
}

export interface CustomPopupInput {
    id: string;
    type?: 'checkbox' | 'text';
    label: string;
    defaultState?: any;
    tooltip?: string;
}

// Slash Command related types
export interface SlashCommandEnumValue {
    value: string;
    description?: string;
}

export interface SlashCommandExecutor {
    // Define properties and methods for executor
    [key: string]: any;
}

export interface SlashCommandScope {
    // Define properties and methods for scope
    [key: string]: any;
}

export interface SlashCommandArgumentInstance {
    description: string;
    typeList: (string | number)[]; // ARGUMENT_TYPE values
    isRequired: boolean;
    acceptsMultiple: boolean;
    defaultValue: string | any;
    enumList: SlashCommandEnumValue[];
    enumProvider: ((executor: SlashCommandExecutor, scope: SlashCommandScope) => SlashCommandEnumValue[]) | null;
    forceEnum: boolean;
}

export interface SlashCommandArgument {
    new (
        description: string,
        types: (string | number) | (string | number)[],
        isRequired?: boolean,
        acceptsMultiple?: boolean,
        defaultValue?: string | any,
        enums?: (string | SlashCommandEnumValue)[],
        enumProvider?: ((executor: SlashCommandExecutor, scope: SlashCommandScope) => SlashCommandEnumValue[]) | null,
        forceEnum?: boolean
    ): SlashCommandArgumentInstance;
    readonly prototype: SlashCommandArgumentInstance;
    fromProps(props: any): SlashCommandArgumentInstance;
}

export interface SlashCommandNamedArgumentInstance extends SlashCommandArgumentInstance {
    name: string;
    aliasList: string[];
}

export interface SlashCommandNamedArgument {
    new (
        name: string,
        description: string,
        types: (string | number) | (string | number)[],
        isRequired?: boolean,
        acceptsMultiple?: boolean,
        defaultValue?: string | any,
        enums?: (string | SlashCommandEnumValue)[],
        aliases?: string[],
        enumProvider?: ((executor: SlashCommandExecutor, scope: SlashCommandScope) => SlashCommandEnumValue[]) | null,
        forceEnum?: boolean
    ): SlashCommandNamedArgumentInstance;
    readonly prototype: SlashCommandNamedArgumentInstance;
    fromProps(props: any): SlashCommandNamedArgumentInstance;
}

export interface CommonEnumProviders {
    boolean: () => () => SlashCommandEnumValue[];
}

// Parser-related types
export interface PARSER_FLAG {
    REPLACE_GETVAR: string;
    STRICT_ESCAPING: string;
}

export interface SlashCommandClosure {
    [key: string]: any; // Define more specific properties as needed
}

export interface SlashCommandBreakPoint extends SlashCommandExecutor {
    [key: string]: any;
}

export interface SlashCommandBreak extends SlashCommandExecutor {
    [key: string]: any;
}

export interface SlashCommandNamedArgumentAssignment {
    start: number;
    end: number;
    name: string;
    value: any;
}

export interface SlashCommandUnnamedArgumentAssignment {
    start: number;
    end: number;
    value: any;
}

export interface SlashCommandParserError extends Error {
    new (message: string, text: string, index: number): SlashCommandParserError;
    message: string;
    text: string;
    index: number;
}

export interface AutoCompleteNameResult {
    name: string;
    index: number;
    options: any[];
    isFuzzy: boolean;
    noMatchMessage: () => string;
    emptyMessage: () => string;
}

export interface SlashCommandAutoCompleteNameResult extends AutoCompleteNameResult {
    new (executor: any, scope: any, commands: Record<string, SlashCommand>): SlashCommandAutoCompleteNameResult;
}

export interface SlashCommandVariableAutoCompleteOption {
    new (name: string): SlashCommandVariableAutoCompleteOption;
    name: string;
}

export interface SlashCommandQuickReplyAutoCompleteOption {
    new (name: string): SlashCommandQuickReplyAutoCompleteOption;
    name: string;
}

export interface SlashCommandParser {
    commands: Record<string, SlashCommand>;
    addCommand: (command: string, callback: any, aliases: string[], helpString?: string) => void;
    addCommandObject: (command: SlashCommand) => void;
    addCommandObjectUnsafe: (command: SlashCommand) => void;
    new (): SlashCommandParser;
    readonly prototype: SlashCommandParserInstance;
}

export interface SlashCommandParserInstance {
    readonly commands: Record<string, SlashCommand>;
    helpStrings: Record<string, string>;
    verifyCommandNames: boolean;
    text: string;
    index: number;
    abortController: any; // SlashCommandAbortController
    debugController: any; // SlashCommandDebugController
    scope: SlashCommandScope;
    closure: any; // SlashCommandClosure
    flags: Record<string, boolean>; // PARSER_FLAG
    jumpedEscapeSequence: boolean;
    closureIndex: { start: number; end: number }[];
    macroIndex: { start: number; end: number; name: string }[];
    commandIndex: any[]; // SlashCommandExecutor[]
    scopeIndex: SlashCommandScope[];
    parserContext: string;
    readonly userIndex: number;
    readonly ahead: string;
    readonly behind: string;
    readonly char: string;
    readonly endOfText: boolean;

    getHelpString: () => string;
    getNameAt: (text: string, index: number) => Promise<any>;
    take: (length?: number) => string;
    discardWhitespace: () => void;
    testSymbol: (sequence: string | RegExp, offset?: number) => boolean;
    testSymbolLooseyGoosey: (sequence: string | RegExp, offset?: number) => boolean;
    replaceGetvar: (value: string) => string;
    parse: (
        text: string,
        verifyCommandNames?: boolean,
        flags?: Record<string, boolean>,
        abortController?: any,
        debugController?: any
    ) => any; // Returns SlashCommandClosure
    testClosure: () => boolean;
    testClosureEnd: () => boolean;
    parseClosure: (isRoot?: boolean) => any; // Returns SlashCommandClosure
    testBreakPoint: () => boolean;
    parseBreakPoint: () => any; // Returns SlashCommandBreakPoint
    testBreak: () => boolean;
    parseBreak: () => any; // Returns SlashCommandBreak
    testBlockComment: () => boolean;
    testBlockCommentEnd: () => boolean;
    parseBlockComment: () => void;
    testComment: () => boolean;
    testCommentEnd: () => boolean;
    parseComment: () => void;
    testParserFlag: () => boolean;
    testParserFlagEnd: () => boolean;
    parseParserFlag: () => void;
    testRunShorthand: () => boolean;
    testRunShorthandEnd: () => boolean;
    parseRunShorthand: () => any; // Returns SlashCommandExecutor
    testCommand: () => boolean;
    testCommandEnd: () => boolean;
    parseCommand: () => any; // Returns SlashCommandExecutor
    testNamedArgument: () => boolean;
    parseNamedArgument: () => any; // Returns SlashCommandNamedArgumentAssignment
    testUnnamedArgument: () => boolean;
    testUnnamedArgumentEnd: () => boolean;
    parseUnnamedArgument: (
        split?: boolean,
        splitCount?: number | null,
        rawQuotes?: boolean
    ) => any[]; // Returns SlashCommandUnnamedArgumentAssignment[]
    testQuotedValue: () => boolean;
    testQuotedValueEnd: () => boolean;
    parseQuotedValue: () => string;
    testListValue: () => boolean;
    testListValueEnd: () => boolean;
    parseListValue: () => string;
    testValue: () => boolean;
    testValueEnd: () => boolean;
    parseValue: () => string;
    indexMacros: (offset: number, text: string) => void;
    registerLanguage: () => void;
}

export interface NamedArguments {
    [key: string]: any;
}

export interface UnnamedArguments {
    [index: number]: any;
    raw: string;
}

export interface SlashCommandProps {
    name?: string;
    callback?: (namedArguments: NamedArguments, unnamedArguments: UnnamedArguments) => string | any | Promise<string | any>;
    helpString?: string;
    splitUnnamedArgument?: boolean;
    splitUnnamedArgumentCount?: number;
    rawQuotes?: boolean;
    aliases?: string[];
    returns?: string;
    namedArgumentList?: SlashCommandNamedArgument[];
    unnamedArgumentList?: SlashCommandArgument[];
}

export interface SlashCommand {
    name: string;
    callback: (namedArguments: NamedArguments, unnamedArguments: UnnamedArguments) => string | any | Promise<string | any>;
    helpString: string;
    splitUnnamedArgument: boolean;
    splitUnnamedArgumentCount?: number;
    rawQuotes: boolean;
    aliases: string[];
    returns?: string;
    namedArgumentList: SlashCommandNamedArgument[];
    unnamedArgumentList: SlashCommandArgument[];
    helpCache: Record<string, HTMLElement>;
    helpDetailsCache: Record<string, DocumentFragment>;
    isExtension: boolean;
    isThirdParty: boolean;
    source: string;
    renderHelpItem: (key?: string) => HTMLElement;
    renderHelpDetails: (key?: string) => DocumentFragment;
}

export interface PopupOptions {
    okButton?: string | boolean | null;
    cancelButton?: string | boolean | null;
    rows?: number;
    wide?: boolean;
    wider?: boolean;
    large?: boolean;
    transparent?: boolean;
    allowHorizontalScrolling?: boolean;
    allowVerticalScrolling?: boolean;
    leftAlign?: boolean;
    animation?: string;
    defaultResult?: number; // POPUP_RESULT
    customButtons?: (CustomPopupButton | string)[];
    customInputs?: CustomPopupInput[];
    onClosing?: (popup: Popup) => Promise<boolean> | boolean;
    onClose?: (popup: Popup) => Promise<void> | void;
    onOpen?: (popup: Popup) => Promise<void> | void;
    cropAspect?: number | null;
    cropImage?: string | null;
}

export interface PopupUtil {
    popups: Popup[];
    lastResult: {
        value: any;
        result: number | null; // POPUP_RESULT
        inputResults: Map<string, string | boolean> | undefined;
    } | null;
    isPopupOpen: () => boolean;
    getTopmostModalLayer: () => HTMLElement;
}

export interface Popup {
    type: number; // POPUP_TYPE
    id: string;
    dlg: HTMLDialogElement;
    body: HTMLDivElement;
    content: HTMLDivElement;
    mainInput: HTMLTextAreaElement;
    inputControls: HTMLDivElement;
    buttonControls: HTMLDivElement;
    okButton: HTMLDivElement;
    cancelButton: HTMLDivElement;
    closeButton: HTMLDivElement;
    cropWrap: HTMLDivElement;
    cropImage: HTMLImageElement;
    defaultResult: number | null; // POPUP_RESULT
    customButtons: (CustomPopupButton | string)[] | null;
    customInputs: CustomPopupInput[];
    onClosing: ((popup: Popup) => Promise<boolean> | boolean) | null;
    onClose: ((popup: Popup) => Promise<void> | void) | null;
    onOpen: ((popup: Popup) => Promise<void> | void) | null;
    result: number; // POPUP_RESULT
    value: any;
    inputResults: Map<string, string | boolean> | undefined;
    cropData: any;
    lastFocus: HTMLElement | undefined;
    show: () => Promise<any>;
    complete: (result: number) => Promise<any>;
    completeAffirmative: () => Promise<any>;
    completeNegative: () => Promise<any>;
    completeCancelled: () => Promise<any>;
    setAutoFocus: (options?: { applyAutoFocus?: boolean }) => void;
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
    SlashCommandParser: SlashCommandParser;
    SlashCommand: SlashCommand;
    SlashCommandArgument: SlashCommandArgument;
    SlashCommandNamedArgument: SlashCommandNamedArgument;
    ARGUMENT_TYPE: IArgumentTypes;
    executeSlashCommandsWithOptions: (text: string, options: any) => any;
    registerSlashCommand: (command: SlashCommand) => void;
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
    ChatCompletionService: ChatCompletionService;
    TextCompletionService: TextCompletionService;
    ConnectionManagerRequestService: ConnectionManagerRequestService;
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