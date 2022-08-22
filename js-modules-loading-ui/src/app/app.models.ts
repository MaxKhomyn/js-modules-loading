export interface AppState {
    modules: Module[];
}

export const defaultState = {
    modules: [],
    script: '',
};

export enum Priority {
    low = -1,
    normal = 0,
    high = 1,
}

export interface Module {
    url: string;
    name: string;
    priority: Priority;
    dependenciesNames?: string[];
}

export const modules: Module[] = [
    {
        name: 'module-1.js',
        priority: Priority.normal,
        url: 'https://my-service.com/modules/module-1.js'
    },
    {
        name: 'module-2.js',
        priority: Priority.low,
        url: 'https://my-service.com/modules/module-2.js'
    },
    {
        name: 'module-3.js',
        dependenciesNames: ['module-4.js', 'module-5.js'],
        priority: Priority.high,
        url: 'https://my-service.com/modules/module-3.js'
    },
    {
        name: 'module-4.js',
        dependenciesNames: ['module-1.js'],
        priority: Priority.normal,
        url: 'https://my-service.com/modules/module-4.js'
    },
    {
        name: 'module-5.js',
        dependenciesNames: ['module-4.js'],
        priority: Priority.high,
        url: 'https://my-service.com/modules/module-5.js'
    },
    {
        name: 'module-6.js',
        priority: Priority.high,
        url: 'https://my-service.com/modules/module-6.js'
    },
    {
        name: 'module-7.js',
        priority: Priority.normal,
        url: 'https://my-service.com/modules/module-7.js'
    },
    {
        name: 'module-8.js',
        dependenciesNames: ['module-7.js'],
        priority: Priority.normal,
        url: 'https://my-service.com/modules/module-8.js'
    },
    {
        name: 'module-9.js',
        dependenciesNames: ['module-10.js'],
        priority: Priority.normal,
        url: 'https://my-service.com/modules/module-9.js'
    },
    {
        name: 'module-10.js',
        priority: Priority.normal,
        url: 'https://my-service.com/modules/module-10.js'
    },
];
