export interface Lens<S, T, A, B> {
    get: (s: S) => A
    set: (s: S, b: B) => T
}

export interface Prism<S, T, A, B> {
    get: (s: S) => A | undefined;
    build: (b: B) => T;
}

export interface Traversal<S, T, A, B> {
    getAll: (s: S) => A[]
    editAll: (s: S, f: (a: A) => B) => T
}