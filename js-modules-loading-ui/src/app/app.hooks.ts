import { useEffect, useState } from "react";

enum Status {
    pending,
    loading,
    loaded,
    executed,
    failed,
}

enum Priority {
    low = 3,
    medium = 2,
    high = 1
}

interface Module {
    url: string;
    status: Status,
    priority: Priority;
    dependencies: Module[];
}

interface AppState {
    isLoading: boolean;
    modules: Module[];
}

const defaultState = {
    isLoading: true,
    modules: [],
};

export const useFacade = (): [
    AppState,
] => {

    const [state, setState] = useState(Object.assign({}, defaultState) as AppState);

    const setModules = (modules: Module[]) => {
        setState(state => ({...state, modules: modules, isLoading: false}));

        loadModules(modules);
    }

    const setModuleStatus = (module: Module, status: Status) => {
        const modules = state.modules.map(i => i.url === module.url ? {...i, status} : i);

        setState(state => ({...state, modules: modules}));
    }

    const loadModules = (modules: Module[]) => {
        modules.sort((a, b) => a.priority - b.priority);

        Promise.all(modules.map(m => loadModule(m)));
    }

    const loadModule = (module: Module) => {
        return new Promise((resolve, reject) => {
            setModuleStatus(module, Status.loading);

            get<string>(module.url).then((content: string) => {
                setModuleStatus(module, Status.loaded);

            });

            setModuleStatus(module, Status.executed);
            setModuleStatus(module, Status.failed);
        });
    }

    const get = <T>(resourceUrl: string): Promise<T> =>
        fetch(resourceUrl).then(response => response.json())

    useEffect(() => {
        const url = "localhost:8000/modules";
        setState(Object.assign({}, defaultState) as AppState);

        get<Module[]>(url).then(setModules);
    }, []);

    return [
        state,
    ];
}
