interface Lens<S, T, A, B> {
    get: (s: S) => A
    edit: (s: S, b: B) => T
}

interface Prism<S, T, A, B> {
    // S에서 A를 가져오려고 시도 (실패할 수 있음)
    preview: (s: S) => A | undefined;
    // B를 가지고 다시 전체 구조 T를 생성 (역방향)
    review: (b: B) => T;
}

interface Traversal<S, T, A, B> {
    getAll: (s: S) => A[]
    edit: (s: S, f: (a: A) => B) => T
}