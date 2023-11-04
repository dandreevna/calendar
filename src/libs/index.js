export const getRandomId = () => Math.random().toString(36).substr(2, 9)

const simpleObjectCheck = object => object && typeof object === 'object' && !Array.isArray(object)

export function mergeDeep(target, ...sources) {
    if (!sources.length) return target
    const source = sources.shift()

    if (simpleObjectCheck(target) && simpleObjectCheck(source)) {
        for (const key in source) {
            if (simpleObjectCheck(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} })
                mergeDeep(target[key], source[key])
            } else {
                Object.assign(target, { [key]: source[key] })
            }
        }
    }

    return mergeDeep(target, ...sources)
}