export const PreloadBody = loader => ({
    category: 'UIHELPER',
    type: 'PRELOAD_BODY',
    loader
});

export const PreloadShell = loader => ({
    category: 'UIHELPER',
    type: 'PRELOAD_SHELL',
    loader
});

export const PreloadDialog = loader => ({
    category: 'UIHELPER',
    type: 'PRELOAD_DIALOG',
    loader
});

export const CandidateInt = integration => ({
    category: 'UIHELPER',
    type: 'CANDIDATE_ITEM',
    item : {
        integration : integration
    }
});