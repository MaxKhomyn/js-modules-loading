import { useCallback, useEffect, useState } from "react";
import { AppState, defaultState, Module, modules } from "./app.models";

export const useFacade = (): [
    AppState,
] => {
    const [state, setState] = useState(Object.assign({}, defaultState) as AppState);

    const sortByDependencies = useCallback((modules: Module[]): Module[] => {
        const pushModule = (modules: Module[], module: Module) => {
            if (!modules.includes(module)) {
                modules.push(module);
            }
        }

        const result = modules.reduce((previous, module) => {
            module.dependenciesNames?.forEach(name => {
                const m = modules.find(m => m.name === name);

                if (m) {
                    pushModule(previous, m);
                }
            });

            pushModule(previous, module);

            return previous;
        }, new Array<Module>());

        return result;
    }, []);

    const sortByPriority = (modules: Module[]): Module[] => {
        return modules.sort((a, b) => b.priority - a.priority);
    }

    const setModules = useCallback((modules: Module[]) => {
        const sorted = sortByDependencies(sortByPriority(modules));

        setState(state => ({...state, modules: sorted}));
    }, [sortByDependencies]);

    useEffect(() => {
        setModules(modules);

        // const url = "localhost:8000/modules";
        // get<Module[]>(url).then(setModules); // fetch modules from server
    }, [setModules]);

    return [
        state,
    ];
}
