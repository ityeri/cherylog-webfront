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

export function composeTraversal<S, T, A, B, X, Y>(
    t1: Traversal<S, T, A, B>,
    t2: Traversal<A, B, X, Y>
): Traversal<S, T, X, Y> {
    return {
        getAll(s: S): X[] { // is it ok? this function ignore origin nesting structure
            return t1.getAll(s).flatMap(a => t2.getAll(a))
        },
        editAll(s: S, f: (a: X) => Y): T {
            return t1.editAll(s, a => t2.editAll(a, f))
        }
    }
}