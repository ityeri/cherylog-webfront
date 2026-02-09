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
        getAll(s: S): X[] {
            return t1.getAll(s).flatMap(a => t2.getAll(a))
        },
        editAll(s: S, f: (a: X) => Y): T {
            return t1.editAll(s, a => t2.editAll(a, f))
        }
    }
}

export function lensToTraversal<S, T, A, B>(l: Lens<S, T, A, B>): Traversal<S, T, A, B> {
    return {
        getAll(s: S): A[] {
            return [l.get(s)]
        },
        editAll(s: S, f: (a: A) => B): T {
            return l.set(s, f(l.get(s)))
        }
    }
}