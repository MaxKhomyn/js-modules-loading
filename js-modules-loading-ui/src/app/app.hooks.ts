import { useCallback, useEffect, useState } from "react";
import { AppState, defaultState, Module, modules } from "./app.models";

export const useFacade = (): [
    AppState,
] => {
    const [state, setState] = useState(Object.assign({}, defaultState) as AppState);

    const insertModules = (array: Module[], toPush: Module) => {
        if (!array.includes(toPush)) {
            array.push(toPush);
        }
    }

    const sortByPriority = useCallback((modules: Module[]): Module[] => modules.sort((a, b) => b.priority - a.priority), []);

    const sortByDependencies = useCallback((modules: Module[]): Module[] => {
        return modules.reduce((previous, module) => {
            const dependencies = module.dependenciesNames?.reduce((dependencies, name) => {
                const dependency = modules.find(m => m.name === name);

                if (dependency) {
                    dependencies.push(dependency);
                }

                return dependencies;
            }, new Array<Module>()) ?? [];


            [...sortByDependencies(dependencies), module].forEach(m => insertModules(previous, m));

            return previous;
        }, new Array<Module>());
    }, []);

    const sortModules = useCallback((modules: Module[]) => sortByDependencies(sortByPriority(modules)), [sortByDependencies, sortByPriority]);

    const setModules = useCallback((modules: Module[]) => {
        const sorted = sortModules(modules);

        setState(state => ({...state, modules: sorted}));
    }, [sortModules]);

    useEffect(() => {
        setModules(modules);

        // const url = "localhost:8000/modules";
        // get<Module[]>(url).then(setModules); // fetch modules from server
    }, [setModules]);

    return [
        state,
    ];
}
