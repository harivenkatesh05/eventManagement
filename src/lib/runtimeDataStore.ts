import { EventDocument, VenueDocument, UserDocument } from "@/types/model";

type ModelMap = {
    users: UserDocument;
    events: EventDocument;
    venueEvents: VenueDocument;
    // purchases: PurchaseDocument;
};

export const runtimeDS: { [K in keyof ModelMap]: Map<string, ModelMap[K]> } = {
    users: new Map(),
    events: new Map(),
    venueEvents: new Map(),
};

export function getAllFromRuntime<T extends keyof ModelMap>(
    model: T
): ModelMap[T][] {
    return [...runtimeDS[model].values()];
}

export function getFromRuntime<T extends keyof ModelMap>(
    model: T,
    key: string
): ModelMap[T] | undefined {
    return runtimeDS[model].get(key);
}

export function getFromRuntimeByKey<T extends keyof ModelMap>(
    model: T,
    key: keyof ModelMap[T],
    value: string
): ModelMap[T] | undefined {
    const values = [...runtimeDS[model].values()];
    return values.find(item => 
        (item as ModelMap[T])[key] === value
    );
}

export function storeInRuntime<T extends keyof ModelMap>(
    model: T,
    key: string,
    data: ModelMap[T]
): void {
    runtimeDS[model].set(key, data);
}

export function clearModelRuntime(model: keyof ModelMap): void {
    runtimeDS[model].clear();
}

export function clearAllRuntime(): void {
    Object.values(runtimeDS).forEach(store => store.clear());
}

export function getAllModelData<T extends keyof ModelMap>(
    model: T
): ModelMap[T][] {
    return [...runtimeDS[model].values()];
}

export function existsInRuntime(model: keyof ModelMap, key: string): boolean {
    return runtimeDS[model].has(key);
} 