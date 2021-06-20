export const gens = {
    m: (m, f) => m,
    f: (m, f) => f,
};
export const nums = {
    s: (s, p) => s,
    p: (s, p) => p,
};
export const cass = {
    n: (n, c) => n,
    c: (n, c) => c,
    cam: (s) => s[0].toUpperCase() + s.substr(1),
    nor: (s) => s
};