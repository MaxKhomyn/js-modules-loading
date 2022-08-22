import { useCallback, useEffect, useState } from "react";
import { AppState, defaultState, Module, modules } from "./app.models";


const insertModules = (array: Module[], toPush: Module) => {
    if (!array.includes(toPush)) {
        array.push(toPush);
    }
}

const sortByPriority = (modules: Module[]): Module[] => modules.sort((a, b) => b.priority - a.priority);

const sortByDependencies = (modules: Module[], original: Module[] = []): Module[] => {
    const array = original.length > 0 ? original : modules;

    return modules.reduce((previous, module) => {
        const dependencies = module.dependenciesNames?.reduce((dependencies, name) => {
            const dependency = array.find(m => m.name === name);

            if (dependency) {
                dependencies.push(dependency);
            }

            return dependencies;
        }, new Array<Module>()) ?? [];


        [...sortByDependencies(dependencies, array), module].forEach(m => insertModules(previous, m));

        return previous;
    }, new Array<Module>());
};

const sortModules = (modules: Module[]) => sortByDependencies(sortByPriority(modules));

export const useFacade = (): [
    AppState,
    (modules: Module[]) => Module[],
] => {
    const [state, setState] = useState(Object.assign({}, defaultState) as AppState);

    const setModules = useCallback((modules: Module[]) => {
        const sorted = sortModules(modules);

        setState(state => ({...state, modules: sorted}));
    }, []);

    useEffect(() => {
        setModules(modules);

        // const url = "localhost:8000/modules";
        // get<Module[]>(url).then(setModules); // fetch modules from server
    }, [setModules]);

    return [
        state,
        sortByDependencies,
    ];
}
