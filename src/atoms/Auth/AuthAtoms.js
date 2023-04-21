import { atom } from 'recoil';

export const authenticatedState = atom({
    key: "authenticatedState",
    default: false
});