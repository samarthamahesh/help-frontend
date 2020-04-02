import { store } from "react-easy-state";

import { IUIStore } from "../interfaces";


export const UIStore: IUIStore = store({
    isSettingsModalOpen: false
});

export const UIActions = {
    setSettingsModal: (visibility: boolean) => UIStore.isSettingsModalOpen = visibility
};
