/* eslint-disable @typescript-eslint/no-explicit-any */

// Basic Interfaces
interface ChatMessage {
    name: string;
    is_user: boolean;
    is_name: boolean;
    send_date: number;
    mes: string;
    extra?: Record<string, any>;
    swipes?: string[];
    swipe_id?: number;
    is_system?: boolean;
}

interface AddMessageOptions {
    scroll: boolean;
    forceId: number;
    showSwipes: boolean;
}

interface Character {
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
    data: CharacterData;
    tags: string[];
    json_data: string;
    date_added: number;
    chat_size: number;
    date_last_chat: number;
    data_size: number;
}

interface CharacterData {
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
    extensions: Record<string, any>;
    character_book?: CharacterBook;
    group_only_greetings?: any[];
}

interface CharacterBook {
    entries: BookEntry[];
    name: string;
}

interface BookEntry {
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
    extensions: Record<string, any>;
}

interface Group {
    id: string;
    name: string;
    members: string[];
    avatar_url: string;
    allow_self_responses: boolean;
    activation_strategy: number;
    generation_mode: number;
    disabled_members: any[];
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

// Services
interface ChatCompletionMessage {
    role: string;
    content: string;
    ignoreInstruct?: boolean;
}

interface ChatCompletionPayload {
    stream?: boolean;
    messages: ChatCompletionMessage[];
    model: string;
    chat_completion_source: string;
    max_tokens: number;
    temperature: number;
    custom_url?: string;
    reverse_proxy?: string;
    proxy_password?: string;
    custom_prompt_post_processing?: 'NONE' | 'MERGE_TOOLS' | 'SEMI_TOOLS' | 'STRICT_TOOLS' | string;
    use_makersuite_sysprompt?: boolean;
    claude_use_sysprompt?: boolean;
    json_schema?: Record<string, any>;
}

interface ExtractedData {
    content: string;
    reasoning: string;
}

interface StreamResponse {
    text: string;
    swipes: string[];
    state: {
        reasoning: string;
        image?: string;
    };
}

interface ChatCompletionService {
    TYPE: string;
    createRequestData(custom: Partial<ChatCompletionPayload>): ChatCompletionPayload;
    sendRequest(data: ChatCompletionPayload, extractData?: boolean, signal?: AbortSignal | null): Promise<ExtractedData | (() => AsyncGenerator<StreamResponse>)>;
    processRequest(custom: Partial<ChatCompletionPayload>, options: { presetName?: string }, extractData?: boolean, signal?: AbortSignal | null): Promise<ExtractedData | (() => AsyncGenerator<StreamResponse>)>;
    presetToGeneratePayload(preset: any, customParams?: any): ChatCompletionPayload;
}

interface TextCompletionRequestBase {
    max_tokens: number;
    model: string;
    api_type: string;
    api_server?: string;
    temperature: number;
    min_p: number;
}

interface TextCompletionPayload extends TextCompletionRequestBase {
    stream?: boolean;
    prompt: string;
    max_new_tokens: number;
    stopping_strings?: string[];
    stop?: string[];
}

interface InstructSettings {
    names_behavior: NamesBehavior;
    output_suffix: string;
    wrap: boolean;
    stop_sequence?: string;
    input_sequence?: string;
    output_sequence?: string;
    last_output_sequence?: string;
}

interface TextCompletionService {
    TYPE: string;
    createRequestData(custom: Record<string, any> & TextCompletionRequestBase & { prompt: string }): TextCompletionPayload;
    sendRequest(data: TextCompletionPayload, extractData?: boolean, signal?: AbortSignal | null): Promise<ExtractedData | (() => AsyncGenerator<StreamResponse>)>;
    processRequest(
        custom: Record<string, any> & TextCompletionRequestBase & { prompt: (ChatCompletionMessage & { ignoreInstruct?: boolean })[] | string },
        options?: {
            presetName?: string;
            instructName?: string;
            instructSettings?: Partial<InstructSettings>;
        },
        extractData?: boolean,
        signal?: AbortSignal | null,
    ): Promise<ExtractedData | (() => AsyncGenerator<StreamResponse>)>;
    presetToGeneratePayload(preset: any, customPreset?: any): TextCompletionPayload;
}

interface ConnectionProfile {
    id: string;
    name: string;
    api: string;
    model: string;
    preset: string;
    instruct: string;
    proxy?: string;
    'api-url'?: string;
    'prompt-post-processing'?: any;
}

interface ConnectionManagerRequestService {
    defaultSendRequestParams: {
        stream: boolean;
        signal: AbortSignal | null;
        extractData: boolean;
        includePreset: boolean;
        includeInstruct: boolean;
        instructSettings: Partial<InstructSettings>;
    };
    getAllowedTypes(): Record<string, string>;
    sendRequest(
        profileId: string,
        prompt: string | (any & { ignoreInstruct?: boolean })[],
        maxTokens: number,
        custom?: Partial<any>,
        overridePayload?: Record<string, any>,
    ): Promise<ExtractedData | (() => AsyncGenerator<StreamResponse>)>;
    getSupportedProfiles(): ConnectionProfile[];
    isProfileSupported(profile?: ConnectionProfile): boolean;
    validateProfile(profile?: ConnectionProfile): { selected: string; source?: string; type?: string };
    handleDropdown(
        selector: string,
        initialSelectedProfileId: string,
        onChange?: (profile?: ConnectionProfile) => Promise<void> | void,
        onCreate?: (profile: ConnectionProfile) => Promise<void> | void,
        onUpdate?: (oldProfile: ConnectionProfile, newProfile: ConnectionProfile) => Promise<void> | void,
        onDelete?: (profile: ConnectionProfile) => Promise<void> | void,
    ): void;
}

// Extension Settings
interface ExtensionSettings {
    apiUrl: string;
    apiKey: string;
    autoConnect: boolean;
    notifyUpdates: boolean;
    disabledExtensions: string[];
    expressionOverrides: any[];
    memory: MemorySettings;
    note: NoteSettings;
    caption: CaptionSettings;
    expressions: ExpressionsSettings;
    connectionManager: ConnectionManagerSettings;
    dice: Record<string, any>;
    regex: any[];
    regex_presets: any[];
    character_allowed_regex: any[];
    preset_allowed_regex: Record<string, any>;
    tts: TtsSettings;
    sd: SdSettings;
    chromadb: Record<string, any>;
    translate: TranslateSettings;
    objective: ObjectiveSettings;
    quickReply: QuickReplySettings;
    randomizer: RandomizerSettings;
    speech_recognition: SpeechRecognitionSettings;
    rvc: RvcSettings;
    hypebot: Record<string, any>;
    vectors: Record<string, any>;
    variables: VariablesSettings;
    attachments: any[];
    character_attachments: Record<string, any>;
    disabled_attachments: any[];
    gallery: GallerySettings;
    cfg: CfgSettings;
    quickReplyV2: QuickReplyV2Settings;
}

interface MemorySettings {
    minLongMemory: number;
    maxLongMemory: number;
    longMemoryLength: number;
    shortMemoryLength: number;
    minShortMemory: number;
    maxShortMemory: number;
    shortMemoryStep: number;
    longMemoryStep: number;
    repetitionPenaltyStep: number;
    repetitionPenalty: number;
    maxRepetitionPenalty: number;
    minRepetitionPenalty: number;
    temperature: number;
    minTemperature: number;
    maxTemperature: number;
    temperatureStep: number;
    lengthPenalty: number;
    minLengthPenalty: number;
    maxLengthPenalty: number;
    lengthPenaltyStep: number;
    memoryFrozen: boolean;
    source: string;
    prompt: string;
    promptWords: number;
    promptMinWords: number;
    promptMaxWords: number;
    promptWordsStep: number;
    promptInterval: number;
    promptMinInterval: number;
    promptMaxInterval: number;
    promptIntervalStep: number;
    template: string;
    position: number;
    depth: number;
    promptForceWords: number;
    promptForceWordsStep: number;
    promptMinForceWords: number;
    promptMaxForceWords: number;
    SkipWIAN: boolean;
    role: number;
    scan: boolean;
    overrideResponseLength: number;
    overrideResponseLengthMin: number;
    overrideResponseLengthMax: number;
    overrideResponseLengthStep: number;
    maxMessagesPerRequest: number;
    maxMessagesPerRequestMin: number;
    maxMessagesPerRequestMax: number;
    maxMessagesPerRequestStep: number;
    prompt_builder: number;
}

interface NoteSettings {
    default: string;
    chara: any[];
    wiAddition: any[];
    defaultPosition: number;
    defaultDepth: number;
    defaultInterval: number;
    defaultRole: number;
}

interface CaptionSettings {
    refine_mode: boolean;
    source: string;
    multimodal_api: string;
    multimodal_model: string;
    prompt: string;
    template: string;
    show_in_chat: boolean;
}

interface ExpressionsSettings {
    showDefault: boolean;
    api: number;
    llmPrompt: string;
    allowMultiple: boolean;
    promptType: string;
    custom: any[];
}

interface ConnectionManagerSettings {
    selectedProfile: string;
    profiles: ConnectionProfile[];
}

interface TtsSettings {
    voiceMap: string;
    ttsEnabled: boolean;
    currentProvider: string;
    auto_generation: boolean;
    ElevenLabs: Record<string, any>;
    System: Record<string, any>;
    narrate_user: boolean;
    playback_rate: number;
    multi_voice_enabled: boolean;
}

interface SdSettings {
    scale_min: number;
    scale_max: number;
    scale_step: number;
    scale: number;
    steps_min: number;
    steps_max: number;
    steps_step: number;
    steps: number;
    dimension_min: number;
    dimension_max: number;
    dimension_step: number;
    width: number;
    height: number;
    prompt_prefix: string;
    negative_prompt: string;
    sampler: string;
    model: string;
    restore_faces: boolean;
    enable_hr: boolean;
    horde: boolean;
    horde_nsfw: boolean;
    horde_karras: boolean;
    refine_mode: boolean;
    prompts: Record<string, string>;
    character_prompts: Record<string, any>;
    source: string;
    scheduler: string;
    vae: string;
    seed: number;
    adetailer_face: boolean;
    horde_sanitize: boolean;
    interactive_mode: boolean;
    multimodal_captioning: boolean;
    snap: boolean;
    free_extend: boolean;
    function_tool: boolean;
    auto_url: string;
    auto_auth: string;
    vlad_url: string;
    vlad_auth: string;
    drawthings_url: string;
    drawthings_auth: string;
    hr_upscaler: string;
    hr_scale: number;
    hr_scale_min: number;
    hr_scale_max: number;
    hr_scale_step: number;
    denoising_strength: number;
    denoising_strength_min: number;
    denoising_strength_max: number;
    denoising_strength_step: number;
    hr_second_pass_steps: number;
    hr_second_pass_steps_min: number;
    hr_second_pass_steps_max: number;
    hr_second_pass_steps_step: number;
    clip_skip_min: number;
    clip_skip_max: number;
    clip_skip_step: number;
    clip_skip: number;
    novel_anlas_guard: boolean;
    novel_sm: boolean;
    novel_sm_dyn: boolean;
    novel_decrisper: boolean;
    novel_variety_boost: boolean;
    openai_style: string;
    openai_quality: string;
    style: string;
    styles: Style[];
    comfy_url: string;
    comfy_workflow: string;
    pollinations_enhance: boolean;
    wand_visible: boolean;
    command_visible: boolean;
    interactive_visible: boolean;
    tool_visible: boolean;
    stability_style_preset: string;
    bfl_upsampling: boolean;
    google_api: string;
    google_enhance: boolean;
    character_negative_prompts: Record<string, any>;
}

interface Style {
    name: string;
    negative: string;
    prefix: string;
}

interface TranslateSettings {
    target_language: string;
    internal_language: string;
    provider: string;
    auto_mode: string;
    deepl_endpoint: string;
}

interface ObjectiveSettings {
    customPrompts: {
        default: {
            createTask: string;
            checkTaskCompleted: string;
            currentTask: string;
        };
    };
}

interface QuickReplySettings {
    quickReplyEnabled: boolean;
    numberOfSlots: number;
    quickReplySlots: QuickReplySlot[];
}

interface QuickReplySlot {
    mes: string;
    label: string;
    enabled: boolean;
}

interface RandomizerSettings {
    controls: any[];
    fluctuation: number;
    enabled: boolean;
}

interface SpeechRecognitionSettings {
    currentProvider: string;
    messageMode: string;
    messageMappingText: string;
    messageMapping: any[];
    messageMappingEnabled: boolean;
    None: Record<string, any>;
}

interface RvcSettings {
    enabled: boolean;
    model: string;
    pitchOffset: number;
    pitchExtraction: string;
    indexRate: number;
    filterRadius: number;
    rmsMixRate: number;
    protect: number;
    voicMapText: string;
    voiceMap: Record<string, any>;
}

interface VariablesSettings {
    global: Record<string, any>;
}

interface GallerySettings {
    folders: Record<string, any>;
    sort: string;
}

interface CfgSettings {
    global: {
        guidance_scale: number;
        negative_prompt: string;
    };
    chara: any[];
}

interface QuickReplyV2Settings {
    isEnabled: boolean;
    isCombined: boolean;
    isPopout: boolean;
    config: QuickReplyConfig;
}

interface QuickReplyConfig {
    setList: QuickReplySetLink[];
    scope: 'global' | 'chat' | 'character';
    onUpdate: Function;
    onRequestEditSet: Function;
    dom: HTMLElement;
    setListDom: HTMLElement;
}

interface QuickReplySetLink {
    set: QuickReplySet;
    isVisible: boolean;
    index: number;
    onUpdate: Function;
    onRequestEditSet: Function;
    onDelete: Function;
    settingsDom: HTMLElement;
}

interface QuickReplySet {
    name: string;
    scope: 'global' | 'chat' | 'character';
    disableSend: boolean;
    placeBeforeInput: boolean;
    injectInput: boolean;
    color: string;
    onlyBorderColor: boolean;
    qrList: QuickReply[];
    idIndex: number;
    isDeleted: boolean;
    save: Function;
    dom: HTMLElement;
    settingsDom: HTMLElement;
}

interface QuickReply {
    id: number;
    icon: string;
    label: string;
    showLabel: boolean;
    title: string;
    message: string;
    contextList: QuickReplyContextLink[];
    preventAutoExecute: boolean;
    isHidden: boolean;
    executeOnStartup: boolean;
    executeOnUser: boolean;
    executeOnAi: boolean;
    executeOnChatChange: boolean;
    executeOnGroupMemberDraft: boolean;
    executeOnNewChat: boolean;
    executeBeforeGeneration: boolean;
    automationId: string;
    onExecute: Function;
    onDebug: Function;
    onDelete: Function;
    onUpdate: Function;
    onInsertBefore: Function;
    onTransfer: Function;
    dom: HTMLElement;
    domIcon: HTMLElement;
    domLabel: HTMLElement;
    settingsDom: HTMLElement;
    settingsDomIcon: HTMLElement;
    settingsDomLabel: HTMLInputElement;
    settingsDomMessage: HTMLTextAreaElement;
    editorPopup: any;
    editorDom: HTMLElement;
    editorMessage: HTMLTextAreaElement;
    editorMessageLabel: HTMLElement;
    editorSyntax: HTMLElement;
    editorExecuteBtn: HTMLElement;
    editorExecuteBtnPause: HTMLElement;
    editorExecuteBtnStop: HTMLElement;
    editorExecuteProgress: HTMLElement;
    editorExecuteErrors: HTMLElement;
    editorExecuteResult: HTMLElement;
    editorDebugState: HTMLElement;
    editorExecutePromise: Promise<any>;
    isExecuting: boolean;
    abortController: any;
    debugController: any;
}

interface QuickReplyContextLink {
    set: QuickReplySet;
    isChained: boolean;
}

interface PowerUserSettings {
    charListGrid: boolean;
    tokenizer: number;
    token_padding: number;
    collapse_newlines: boolean;
    pin_examples: boolean;
    strip_examples: boolean;
    trim_sentences: boolean;
    always_force_name2: boolean;
    user_prompt_bias: string;
    show_user_prompt_bias: boolean;
    auto_continue: {
        enabled: boolean;
        allow_chat_completions: boolean;
        target_length: number;
    };
    markdown_escape_strings: string;
    chat_truncation: number;
    streaming_fps: number;
    smooth_streaming: boolean;
    smooth_streaming_speed: number;
    stream_fade_in: boolean;
    fast_ui_mode: boolean;
    avatar_style: number;
    chat_display: number;
    toastr_position: string;
    chat_width: number;
    never_resize_avatars: boolean;
    show_card_avatar_urls: boolean;
    play_message_sound: boolean;
    play_sound_unfocused: boolean;
    auto_save_msg_edits: boolean;
    confirm_message_delete: boolean;
    sort_field: string;
    sort_order: string;
    sort_rule: any;
    font_scale: number;
    blur_strength: number;
    shadow_width: number;
    main_text_color: string;
    italics_text_color: string;
    underline_text_color: string;
    quote_text_color: string;
    blur_tint_color: string;
    chat_tint_color: string;
    user_mes_blur_tint_color: string;
    bot_mes_blur_tint_color: string;
    shadow_color: string;
    border_color: string;
    custom_css: string;
    waifuMode: boolean;
    movingUI: boolean;
    movingUIState: Record<string, any>;
    movingUIPreset: string;
    noShadows: boolean;
    theme: string;
    gestures: boolean;
    auto_swipe: boolean;
    auto_swipe_minimum_length: number;
    auto_swipe_blacklist: any[];
    auto_swipe_blacklist_threshold: number;
    auto_scroll_chat_to_bottom: boolean;
    auto_fix_generated_markdown: boolean;
    send_on_enter: number;
    console_log_prompts: boolean;
    request_token_probabilities: boolean;
    show_group_chat_queue: boolean;
    allow_name1_display: boolean;
    allow_name2_display: boolean;
    hotswap_enabled: boolean;
    timer_enabled: boolean;
    timestamps_enabled: boolean;
    timestamp_model_icon: boolean;
    mesIDDisplay_enabled: boolean;
    hideChatAvatars_enabled: boolean;
    max_context_unlocked: boolean;
    message_token_count_enabled: boolean;
    expand_message_actions: boolean;
    enableZenSliders: boolean;
    enableLabMode: boolean;
    prefer_character_prompt: boolean;
    prefer_character_jailbreak: boolean;
    quick_continue: boolean;
    quick_impersonate: boolean;
    continue_on_send: boolean;
    trim_spaces: boolean;
    relaxed_api_urls: boolean;
    world_import_dialog: boolean;
    enable_auto_select_input: boolean;
    enable_md_hotkeys: boolean;
    tag_import_setting: number;
    disable_group_trimming: boolean;
    single_line: boolean;
    instruct: InstructSettings;
    context: ContextSettings;
    instruct_derived: boolean;
    context_derived: boolean;
    context_size_derived: boolean;
    model_templates_mappings: Record<string, any>;
    chat_template_hash: string;
    sysprompt: SysPromptSettings;
    reasoning: ReasoningSettings;
    personas: Record<string, string>;
    default_persona: any;
    persona_descriptions: Record<string, PersonaDescription>;
    persona_description: string;
    persona_description_position: number;
    persona_description_role: number;
    persona_description_depth: number;
    persona_description_lorebook: string;
    persona_show_notifications: boolean;
    persona_sort_order: string;
    custom_stopping_strings: string;
    custom_stopping_strings_macro: boolean;
    fuzzy_search: boolean;
    encode_tags: boolean;
    servers: any[];
    bogus_folders: boolean;
    zoomed_avatar_magnification: boolean;
    show_tag_filters: boolean;
    aux_field: string;
    stscript: StScriptSettings;
    restore_user_input: boolean;
    reduced_motion: boolean;
    compact_input_area: boolean;
    show_swipe_num_all_messages: boolean;
    auto_connect: boolean;
    auto_load_chat: boolean;
    forbid_external_media: boolean;
    external_media_allowed_overrides: any[];
    external_media_forbidden_overrides: any[];
    pin_styles: boolean;
    click_to_edit: boolean;
    ui_mode: number;
    auto_sort_tags: boolean;
    selectSamplers: {
        forceHidden: any[];
        forceShown: any[];
    };
}

interface ContextSettings {
    preset: string;
    story_string: string;
    chat_start: string;
    example_separator: string;
    use_stop_strings: boolean;
    names_as_stop_strings: boolean;
    story_string_position: number;
    story_string_depth: number;
    story_string_role: number;
}

interface SysPromptSettings {
    enabled: boolean;
    name: string;
    content: string;
}

interface ReasoningSettings {
    name: string;
    auto_parse: boolean;
    add_to_prompts: boolean;
    auto_expand: boolean;
    show_hidden: boolean;
    prefix: string;
    suffix: string;
    separator: string;
    max_additions: number;
}

interface PersonaDescription {
    description: string;
    position: number;
}

interface StScriptSettings {
    parser: {
        flags: {
            "1": boolean;
            "2": boolean;
        };
    };
    autocomplete: {
        state: number;
        autoHide: boolean;
        style: string;
        font: {
            scale: number;
        };
        width: {
            left: number;
            right: number;
        };
        select: number;
    };
}

interface ChatCompletionSettings {
    preset_settings_openai: string;
    temp_openai: number;
    freq_pen_openai: number;
    pres_pen_openai: number;
    top_p_openai: number;
    top_k_openai: number;
    min_p_openai: number;
    top_a_openai: number;
    repetition_penalty_openai: number;
    stream_openai: boolean;
    openai_max_context: number;
    openai_max_tokens: number;
    wrap_in_quotes: boolean;
    prompts: Prompt[];
    prompt_order: PromptOrder[];
    send_if_empty: string;
    impersonation_prompt: string;
    new_chat_prompt: string;
    new_group_chat_prompt: string;
    new_example_chat_prompt: string;
    continue_nudge_prompt: string;
    bias_preset_selected: string;
    bias_presets: Record<string, Bias[]>;
    wi_format: string;
    group_nudge_prompt: string;
    scenario_format: string;
    personality_format: string;
    openai_model: string;
    claude_model: string;
    google_model: string;
    vertexai_model: string;
    ai21_model: string;
    mistralai_model: string;
    cohere_model: string;
    perplexity_model: string;
    groq_model: string;
    electronhub_model: string;
    electronhub_sort_models: string;
    electronhub_group_models: boolean;
    nanogpt_model: string;
    deepseek_model: string;
    aimlapi_model: string;
    xai_model: string;
    pollinations_model: string;
    cometapi_model: string;
    moonshot_model: string;
    fireworks_model: string;
    azure_base_url: string;
    azure_deployment_name: string;
    azure_api_version: string;
    azure_openai_model: string;
    custom_model: string;
    custom_url: string;
    custom_include_body: string;
    custom_exclude_body: string;
    custom_include_headers: string;
    openrouter_model: string;
    openrouter_use_fallback: boolean;
    openrouter_group_models: boolean;
    openrouter_sort_models: string;
    openrouter_providers: any[];
    openrouter_allow_fallbacks: boolean;
    openrouter_middleout: string;
    reverse_proxy: string;
    chat_completion_source: string;
    max_context_unlocked: boolean;
    show_external_models: boolean;
    proxy_password: string;
    assistant_prefill: string;
    assistant_impersonation: string;
    claude_use_sysprompt: boolean;
    use_makersuite_sysprompt: boolean;
    vertexai_auth_mode: string;
    vertexai_region: string;
    vertexai_express_project_id: string;
    squash_system_messages: boolean;
    image_inlining: boolean;
    inline_image_quality: string;
    video_inlining: boolean;
    bypass_status_check: boolean;
    continue_prefill: boolean;
    function_calling: boolean;
    names_behavior: number;
    continue_postfix: string;
    custom_prompt_post_processing: string;
    show_thoughts: boolean;
    reasoning_effort: string;
    enable_web_search: boolean;
    request_images: boolean;
    seed: number;
    n: number;
    bind_preset_to_connection: boolean;
    extensions: Record<string, any>;
}

interface Prompt {
    name: string;
    system_prompt: boolean;
    role: string;
    content: string;
    identifier: string;
    marker?: boolean;
}

interface PromptOrder {
    character_id: number;
    order: Order[];
}

interface Order {
    identifier: string;
    enabled: boolean;
}

interface Bias {
    id: string;
    text: string;
    value: number;
}

interface TextCompletionSettings {
    temp: number;
    temperature_last: boolean;
    top_p: number;
    top_k: number;
    top_a: number;
    tfs: number;
    epsilon_cutoff: number;
    eta_cutoff: number;
    typical_p: number;
    min_p: number;
    rep_pen: number;
    rep_pen_range: number;
    rep_pen_decay: number;
    rep_pen_slope: number;
    no_repeat_ngram_size: number;
    penalty_alpha: number;
    num_beams: number;
    length_penalty: number;
    min_length: number;
    encoder_rep_pen: number;
    freq_pen: number;
    presence_pen: number;
    skew: number;
    do_sample: boolean;
    early_stopping: boolean;
    dynatemp: boolean;
    min_temp: number;
    max_temp: number;
    dynatemp_exponent: number;
    smoothing_factor: number;
    smoothing_curve: number;
    dry_allowed_length: number;
    dry_multiplier: number;
    dry_base: number;
    dry_sequence_breakers: string;
    dry_penalty_last_n: number;
    max_tokens_second: number;
    seed: number;
    preset: string;
    add_bos_token: boolean;
    stopping_strings: any[];
    ban_eos_token: boolean;
    skip_special_tokens: boolean;
    include_reasoning: boolean;
    streaming: boolean;
    mirostat_mode: number;
    mirostat_tau: number;
    mirostat_eta: number;
    guidance_scale: number;
    negative_prompt: string;
    grammar_string: string;
    json_schema: Record<string, any>;
    banned_tokens: string;
    global_banned_tokens: string;
    send_banned_tokens: boolean;
    sampler_priority: string[];
    samplers: string[];
    samplers_priorities: string[];
    ignore_eos_token: boolean;
    spaces_between_special_tokens: boolean;
    speculative_ngram: boolean;
    type: string;
    mancer_model: string;
    togetherai_model: string;
    infermaticai_model: string;
    ollama_model: string;
    openrouter_model: string;
    openrouter_providers: any[];
    vllm_model: string;
    aphrodite_model: string;
    dreamgen_model: string;
    tabby_model: string;
    sampler_order: number[];
    logit_bias: any[];
    n: number;
    server_urls: Record<string, any>;
    custom_model: string;
    bypass_status_check: boolean;
    openrouter_allow_fallbacks: boolean;
    xtc_threshold: number;
    xtc_probability: number;
    nsigma: number;
    min_keep: number;
    featherless_model: string;
    generic_model: string;
    extensions: Record<string, any>;
    rep_pen_size: number;
}

interface Popup {
    // Properties
    type: POPUP_TYPE;
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
    defaultResult: POPUP_RESULT | number | null;
    customButtons: (CustomPopupButton | string)[] | null;
    customInputs: CustomPopupInput[];
    onClosing: ((popup: Popup) => Promise<boolean | null> | boolean | null) | null;
    onClose: ((popup: Popup) => Promise<void | null> | void | null) | null;
    onOpen: ((popup: Popup) => Promise<void | null> | void | null) | null;
    result: POPUP_RESULT | number;
    value: any;
    inputResults: Map<string, string | boolean> | null;
    cropData: any;
    lastFocus: HTMLElement;

    // Methods
    show(): Promise<string | number | boolean | null>;
    complete(result: POPUP_RESULT | number): Promise<string | number | boolean | undefined | null>;
    completeAffirmative(): Promise<string | number | boolean | undefined | null>;
    completeNegative(): Promise<string | number | boolean | undefined | null>;
    completeCancelled(): Promise<string | number | boolean | undefined | null>;
    setAutoFocus(options?: { applyAutoFocus?: boolean }): void;
}

interface CustomPopupButton {
    text: string;
    result: POPUP_RESULT | number;
    classes?: string[];
    action?: () => void;
    appendAtEnd?: boolean;
}

interface CustomPopupInput {
    id: string;
    type: 'checkbox' | 'text';
    label: string;
    defaultState?: boolean | string;
    tooltip?: string;
}

declare enum POPUP_TYPE {
    TEXT = 1,
    CONFIRM = 2,
    INPUT = 3,
    DISPLAY = 4,
    CROP = 5,
}

declare enum POPUP_RESULT {
    AFFIRMATIVE = 1,
    NEGATIVE = 0,
    CANCELLED = -1,
    CUSTOM1 = 1001,
    CUSTOM2 = 1002,
    CUSTOM3 = 1003,
    CUSTOM4 = 1004,
    CUSTOM5 = 1005,
    CUSTOM6 = 1006,
    CUSTOM7 = 1007,
    CUSTOM8 = 1008,
    CUSTOM9 = 1009,
}

interface SlashCommandParser {
    // Static properties
    commands: Record<string, SlashCommand>;
    helpStrings: Record<string, string>;
    verifyCommandNames: boolean;

    // Instance properties
    text: string;
    index: number;
    abortController: SlashCommandAbortController;
    debugController: SlashCommandDebugController;
    scope: SlashCommandScope;
    closure: SlashCommandClosure;
    flags: Record<string, boolean>;
    jumpedEscapeSequence: boolean;
    closureIndex: { start: number; end: number }[];
    macroIndex: { start: number; end: number; name: string }[];
    commandIndex: SlashCommandExecutor[];
    scopeIndex: SlashCommandScope[];
    parserContext: string;

    // Getters
    readonly userIndex: number;
    readonly ahead: string;
    readonly behind: string;
    readonly char: string;
    readonly endOfText: boolean;

    // Methods
    parse(text: string, verifyCommandNames?: boolean, flags?: Record<string, boolean>, abortController?: SlashCommandAbortController, debugController?: SlashCommandDebugController): SlashCommandClosure;
    getNameAt(text: string, index: number): Promise<AutoCompleteNameResult | null>;
    take(length?: number): string;
    discardWhitespace(): void;
    testSymbol(sequence: string | RegExp, offset?: number): boolean;
    testSymbolLooseyGoosey(sequence: string | RegExp, offset?: number): boolean;
    replaceGetvar(value: string): string;
    testClosure(): boolean;
    testClosureEnd(): boolean;
    parseClosure(isRoot?: boolean): SlashCommandClosure;
    testBreakPoint(): boolean;
    parseBreakPoint(): SlashCommandBreakPoint;
    testBreak(): boolean;
    parseBreak(): SlashCommandBreak;
    testBlockComment(): boolean;
    testBlockCommentEnd(): boolean;
    parseBlockComment(): void;
    testComment(): boolean;
    testCommentEnd(): boolean;
    parseComment(): void;
    testParserFlag(): boolean;
    testParserFlagEnd(): boolean;
    parseParserFlag(): void;
    testRunShorthand(): boolean;
    testRunShorthandEnd(): boolean;
    parseRunShorthand(): SlashCommandExecutor;
    testCommand(): boolean;
    testCommandEnd(): boolean;
    parseCommand(): SlashCommandExecutor;
    testNamedArgument(): boolean;
    parseNamedArgument(): SlashCommandNamedArgumentAssignment;
    testUnnamedArgument(): boolean;
    testUnnamedArgumentEnd(): boolean;
    parseUnnamedArgument(split?: boolean, splitCount?: number | null, rawQuotes?: boolean): SlashCommandUnnamedArgumentAssignment[];
    testQuotedValue(): boolean;
    testQuotedValueEnd(): boolean;
    parseQuotedValue(): string;
    testListValue(): boolean;
    testListValueEnd(): boolean;
    parseListValue(): string;
    testValue(): boolean;
    testValueEnd(): boolean;
    parseValue(): string;
    indexMacros(offset: number, text: string): void;
    getHelpString(): string;
}

interface SlashCommand {
    name: string;
    callback: (namedArguments: Record<string, any>, unnamedArguments: (string | SlashCommandClosure)[]) => string | SlashCommandClosure | Promise<string | SlashCommandClosure>;
    helpString: string;
    splitUnnamedArgument: boolean;
    splitUnnamedArgumentCount: number;
    rawQuotes: boolean;
    aliases: string[];
    returns: string;
    namedArgumentList: SlashCommandNamedArgument[];
    unnamedArgumentList: SlashCommandArgument[];
    helpCache: Record<string, HTMLElement>;
    helpDetailsCache: Record<string, DocumentFragment>;
    isExtension: boolean;
    isThirdParty: boolean;
    source: string;

    renderHelpItem(key?: string): HTMLElement;
    renderHelpDetails(key?: string): DocumentFragment;
}

interface SlashCommandAbortController {
    // Properties and methods based on usage in context
    signal: AbortSignal;
    abort(reason?: any): void;
}

interface SlashCommandDebugController {
    // Properties and methods based on usage in context
    stack: any[];
    cmdStack: any[];
    // Additional properties based on how it's used
}

interface SlashCommandScope {
    // Properties based on usage in context
    allVariableNames?: string[];
    [key: string]: any; // Allow for dynamic properties
}

interface SlashCommandClosure {
    // Properties based on usage in context
    execute(): Promise<any>;
    abortController: SlashCommandAbortController;
    isAborted?: boolean;
    isQuietlyAborted?: boolean;
    abortReason?: string;
}

interface SlashCommandExecutor {
    // Properties based on usage in context
    start: number;
    end?: number;
    name: string;
    command?: SlashCommand;
    unnamedArgumentList?: any[];
    namedArgumentList?: any[];
}

interface SlashCommandBreakPoint {
    // Properties based on usage in context
}

interface SlashCommandBreak {
    // Properties based on usage in context
}

interface SlashCommandNamedArgumentAssignment {
    // Properties based on usage in context
    name: string;
    value: any;
}

interface SlashCommandUnnamedArgumentAssignment {
    // Properties based on usage in context
    value: any;
}

interface AutoCompleteNameResult {
    // Properties based on usage in context
    name: string;
    start: number;
    options: any[];
    fuzzy: boolean;
    noMatchMessage: () => string;
    emptyMessage: () => string;
}

interface SlashCommandArgument {
    description: string;
    typeList: ARGUMENT_TYPE[];
    isRequired: boolean;
    acceptsMultiple: boolean;
    defaultValue: string | any;
    enumList: SlashCommandEnumValue[];
    enumProvider: (executor: any, scope: any) => SlashCommandEnumValue[];
    forceEnum: boolean;
}

interface SlashCommandNamedArgument extends SlashCommandArgument {
    name: string;
    aliasList: string[];
}

interface SlashCommandEnumValue {
    value: string;
    description: string;
    type: any;
    icon: any;
}

declare enum ARGUMENT_TYPE {
    STRING = "string",
    NUMBER = "number",
    RANGE = "range",
    BOOLEAN = "bool",
    VARIABLE_NAME = "varname",
    CLOSURE = "closure",
    SUBCOMMAND = "subcommand",
    LIST = "list",
    DICTIONARY = "dictionary",
}

type NamesBehavior = number | "force" | "strip" | "system";

// API Connect Map Types
interface ApiConfig {
    selected: string;
    button?: string;
    type?: string;
    source?: string;
}

type ApiConnectMap = {
    [key: string]: ApiConfig;
};

// Tag Types
interface Tag {
    id: string;
    name: string;
    color: string;
}

interface AccountStorage {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
    getState(): Record<string, string>;
}

type Listener = (...args: any[]) => void;

interface EventSource {
    on(event: string, listener: Listener): void;
    off(event: string, listener: Listener): void;
    emit(event: string, ...args: any[]): Promise<void>;
    events: Record<string, Listener[]>;
}

interface StreamingProcessor {
    constructor(type: string, force_name2: boolean, generation_started: Date, continue_mag: string, promptReasoning: any): StreamingProcessor;
    generator: AsyncGenerator<any, void, unknown>;
    generate(): Promise<any>;
    onStopStreaming(): void;
    isFinished: boolean;
    isStopped: boolean;
    messageId: number;
    firstMessageText: string;
    toolCalls: any[];
    result: string;
    onFinishStreaming(messageId: number, getMessage: string): Promise<void>;
}

interface ToolManager {
    registerFunctionTool(tool: any): void;
    unregisterFunctionTool(name: string): void;
    isToolCallingSupported(): boolean;
    canPerformToolCalls(type: string): boolean;
    invokeFunctionTools(data: any): Promise<any>;
    hasToolCalls(data: any): boolean;
    saveFunctionToolInvocations(invocations: any[]): Promise<void>;
    showToolCallError(errors: Error[]): void;
    initToolSlashCommands(): void;
}

interface ModuleWorkerWrapper {
    new(callback: (...args: any[]) => void): ModuleWorkerWrapper;
    update(...args: any[]): Promise<void>;
}


// Main Context Interface
export interface ISillyTavernContext {
    accountStorage: AccountStorage;
    chat: ChatMessage[];
    characters: Character[];
    groups: Group[];
    name1: string;
    name2: string;
    characterId: string;
    groupId: string;
    chatId: string;
    getCurrentChatId(): string;
    getRequestHeaders(options?: { omitContentType?: boolean }): Record<string, string>;
    reloadCurrentChat(): Promise<void>;
    renameChat(oldFileName: string, newName: string): Promise<any>;
    saveSettingsDebounced(): void;
    onlineStatus: string;
    maxContext: number;
    chatMetadata: any;
    saveMetadataDebounced(): void;
    streamingProcessor: StreamingProcessor;
    eventSource: EventSource;
    eventTypes: Record<string, string>;
    addOneMessage(mes: ChatMessage, options?: Partial<AddMessageOptions & { type?: string, insertAfter?: number, insertBefore?: number }>): void;
    deleteLastMessage(): Promise<void>;
    generate(type: string, options?: any, dryRun?: boolean): Promise<any>;
    sendStreamingRequest(type: string, data: any, options?: any): Promise<any>;
    sendGenerationRequest(type: string, data: any, options?: any): Promise<any>;
    stopGeneration(): boolean;
    tokenizers: Record<string, number>;
    getTextTokens(tokenizerType: number, str: string): any;
    getTokenCount(str: string, padding?: number): number;
    getTokenCountAsync(str: string, padding?: number): Promise<number>;
    extensionPrompts: Record<string, unknown>;
    setExtensionPrompt(key: string, value: string, position: number, depth: number, scan?: boolean, role?: number, filter?: any): void;
    updateChatMetadata(newValues: Record<string, unknown>, reset?: boolean): void;
    saveChat(): Promise<void>;
    openCharacterChat(file_name: string): Promise<void>;
    openGroupChat(groupId: string, chatId: string): Promise<void>;
    saveMetadata(): Promise<void>;
    sendSystemMessage(type: string, text: string, extra?: Record<string, unknown>): void;
    activateSendButtons(): void;
    deactivateSendButtons(): void;
    saveReply(options: { type: string, getMessage: string, fromStreaming?: boolean, title?: string, swipes?: string[], reasoning?: string, imageUrl?: string }): Promise<{ type: string, getMessage: string }>;
    substituteParams(content: string, _name1?: string, _name2?: string, _original?: string, _group?: string, _replaceCharacterCard?: boolean, additionalMacro?: any, postProcessFn?: (x: any) => any): string;
    substituteParamsExtended(content: string, additionalMacro?: any, postProcessFn?: (x: any) => any): string;
    SlashCommandParser: new() => SlashCommandParser;
    SlashCommand: new() => SlashCommand;
    SlashCommandArgument: new() => SlashCommandArgument;
    SlashCommandNamedArgument: new() => SlashCommandNamedArgument;
    ARGUMENT_TYPE: typeof ARGUMENT_TYPE;
    executeSlashCommandsWithOptions(text: string, options?: any): Promise<any>;
    registerSlashCommand(command: string, callback: (...args: any[]) => any, aliases: string[], helpString?: string): void;
    executeSlashCommands(text: string, handleParserErrors?: boolean, scope?: any, handleExecutionErrors?: boolean, parserFlags?: any, abortController?: any, onProgress?: any): Promise<any>;
    timestampToMoment(timestamp: number): any;
    registerHelper(): void;
    registerMacro(name: string, callback: (...args: any[]) => any): void;
    unregisterMacro(name: string): void;
    registerFunctionTool(tool: any): void;
    unregisterFunctionTool(name: string): void;
    isToolCallingSupported(): boolean;
    canPerformToolCalls(): boolean;
    ToolManager: ToolManager;
    registerDebugFunction(functionId: string, name: string, description: string, func: (...args: any[]) => any): void;
    renderExtensionTemplate(extensionName: string, templateId: string, templateData?: any, sanitize?: boolean, localize?: boolean): string;
    renderExtensionTemplateAsync(extensionName: string, templateId: string, templateData?: any, sanitize?: boolean, localize?: boolean): Promise<string>;
    registerDataBankScraper(scraper: any): void;
    callPopup(text: string, type: string, inputValue?: string, options?: any): Promise<any>;
    callGenericPopup(content: any, type: string, inputValue?: string, popupOptions?: any): Promise<any>;
    showLoader(): void;
    hideLoader(): Promise<void>;
    mainApi: string;
    extensionSettings: ExtensionSettings;
    ModuleWorkerWrapper: new() => ModuleWorkerWrapper;
    getTokenizerModel(): string;
    generateQuietPrompt(options: { quietPrompt?: string, quietToLoud?: boolean, skipWIAN?: boolean, quietImage?: any, quietName?: string, responseLength?: number, forceChId?: string, jsonSchema?: any, removeReasoning?: boolean, trimToSentence?: boolean }): Promise<string>;
    generateRaw(options: { prompt?: string, api?: string, instructOverride?: boolean, quietToLoud?: boolean, systemPrompt?: string, responseLength?: number, trimNames?: boolean, prefill?: string, jsonSchema?: any }): Promise<string>;
    writeExtensionField(characterId: string, key: string, value: any): Promise<void>;
    getThumbnailUrl(type: string, file: string, t?: boolean): string;
    selectCharacterById(id: string, options?: { switchMenu?: boolean }): Promise<void>;
    messageFormatting(mes: string, ch_name: string, isSystem: boolean, isUser: boolean, messageId: number, sanitizerOverrides?: any, isReasoning?: boolean): string;
    shouldSendOnEnter(): boolean;
    isMobile(): boolean;
    t(strings: TemplateStringsArray, ...values: any[]): string;
    translate(text: string, key?: string): string;
    getCurrentLocale(): string;
    addLocaleData(localeId: string, data: any): void;
    tags: Tag[];
    tagMap: Record<string, any>;
    menuType: string;
    createCharacterData: any;
    event_types: Record<string, string>;
    Popup: new() => Popup;
    POPUP_TYPE: typeof POPUP_TYPE;
    POPUP_RESULT: typeof POPUP_RESULT;
    chatCompletionSettings: ChatCompletionSettings;
    textCompletionSettings: TextCompletionSettings;
    powerUserSettings: PowerUserSettings;
    getCharacters(): Promise<void>;
    getCharacterCardFields(options?: { chid?: string }): any;
    uuidv4(): string;
    humanizedDateTime(): string;
    updateMessageBlock(messageId: number, message: ChatMessage, options?: { rerenderMessage?: boolean }): void;
    appendMediaToMessage(mes: ChatMessage, messageElement: any, adjustScroll?: boolean): void;
    swipe: {
        left(event?: any, options?: { source?: string, repeated?: boolean }): void;
        right(event?: any, options?: { source?: string, repeated?: boolean }): void;
    };
    variables: {
        local: {
            get(name: string, args?: any): any;
            set(name: string, value: any, args?: any): any;
        };
        global: {
            get(name: string, args?: any): any;
            set(name: string, value: any, args?: any): any;
        };
    };
    loadWorldInfo(name: string): Promise<any>;
    saveWorldInfo(name: string, data: any, immediately?: boolean): Promise<void>;
    reloadWorldInfoEditor(file: string, loadIfNotSelected?: boolean): void;
    updateWorldInfoList(): Promise<void>;
    convertCharacterBook(characterBook: any): Promise<any>;
    getWorldInfoPrompt(chat: string[], maxContext: number, isDryRun: boolean, globalScanData: any): Promise<any>;
    CONNECT_API_MAP: ApiConnectMap;
    getTextGenServer(type?: string): string;
    extractMessageFromData(data: any, activeApi?: string): string;
    getPresetManager(apiId?: string): any;
    getChatCompletionModel(source?: string): string;
    printMessages(): Promise<void>;
    clearChat(): Promise<void>;
    ChatCompletionService: ChatCompletionService;
    TextCompletionService: TextCompletionService;
    ConnectionManagerRequestService: ConnectionManagerRequestService;
    updateReasoningUI(messageIdOrElement: any, options?: { reset?: boolean }): void;
    parseReasoningFromString(str: string, options?: { strict?: boolean }): { reasoning: string, content: string } | null;
    unshallowCharacter(characterId: string): Promise<void>;
    unshallowGroupMembers(groupId: string): Promise<void>;
    openThirdPartyExtensionMenu(suggestUrl?: string): Promise<void>;
    symbols: {
        ignore: symbol;
    };
}
