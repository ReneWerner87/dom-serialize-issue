import { Config } from '@stencil/core';

export const config: Config = {
    namespace: 'dom-serialize-issue',
    taskQueue: 'async',
    tsconfig: './tsconfig.json',
    extras: {
        enableImportInjection: true, // for vite bundler https://stenciljs.com/docs/config-extras#enableimportinjection
        scriptDataOpts: true,
        slotChildNodesFix: true,
        experimentalSlotFixes: true,
    },
    outputTargets: [
        {
            type: 'www',
            baseUrl: 'http://0.0.0.0/',
            serviceWorker: null,
            dir: 'www',
            buildDir: 'build',
            copy: [
                { src: '*.html' },
            ],
        },
    ],
};
