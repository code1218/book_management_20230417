import { atom } from 'recoil';

export const refreshState = atom({
    key: "refreshState",
    default: true
});

export const refreshState2 = atom({
    key: "refreshState2",
    default: false
});

export const authenticatedState = atom({
    key: "authenticatedState",
    default: false
});