// Type declarations for View Transitions API
interface ViewTransition {
    finished: Promise<void>;
    ready: Promise<void>;
    updateCallbackDone: Promise<void>;
    skipTransition(): void;
}

interface Document {
    startViewTransition?(updateCallback?: () => void | Promise<void>): ViewTransition;
}

// Also add it to the Window interface for completeness
interface Window {
    startViewTransition?: (updateCallback?: () => void | Promise<void>) => ViewTransition;
} 