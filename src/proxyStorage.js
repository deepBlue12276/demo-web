/**
 * 使用方法：
 *      import proxyStorage from '@/utils/proxyStorage';
 *      const app = createApp(App);
 *      app.use(proxyStorage, 'nameSpace')
 */

export default {
    install(app, nameSpace) {
        /**
         * 创建带命名空间代理
         * @param {Storage} storage - 初始的存储对象 (localStorage 或 sessionStorage)
         * @returns {Proxy} - 带命名空间的storage代理
         */
        function createNameSpacedStorage(storage) {
            return new Proxy(storage, {
                // 代理get操作，就是代理访问storage上的方法、属性
                get(target, prop, receiver) {
                    // 代理setItem方法
                    if (prop === 'setItem') {
                        return (key, value) => {
                            target.setItem(`${nameSpace}:${key}`, value);
                        };
                    }
                    // 代理getItem方法
                    if (prop === 'getItem') {
                        return (key) => {
                            return target.getItem(`${nameSpace}:${key}`);
                        };
                    }
                    // 代理removeItem方法
                    if (prop === 'removeItem') {
                        return (key) => {
                            target.removeItem(`${nameSpace}:${key}`);
                        };
                    }
                    // 代理clear方法
                    if (prop === 'clear') {
                        return () => {
                            Object.keys(target).forEach((key) => {
                                if (key.startsWith(`${nameSpace}:`)) {
                                    target.removeItem(key);
                                }
                            });
                        };
                    }
                    if (prop === 'key') {
                        return (index) => {
                            const keys = Object.keys(target);
                            // 只获取带命名空间的key
                            const nameSpacedKeys = keys.filter((key) => key.startsWith(`${nameSpace}:`));
                            // 返回原始的key
                            return nameSpacedKeys[index]?.replace(`${nameSpace}:`, '');
                        };
                    }
                    if (prop === 'length') {
                        const keys = Object.keys(target);
                        const nameSpacedKeys = keys.filter((key) => key.startsWith(`${nameSpace}:`));
                        return nameSpacedKeys.length;
                    }
                    // 兼容属性调用，如localStorage[key]
                    if (typeof prop === 'string') {
                        return target.getItem(`${nameSpace}:${prop}`);
                    }
                    // 最后要返回默认的代理
                    return Reflect.get(target, prop, receiver);
                },
                // 代理写入操作，只有一种情况：localStorage.key = value
                set(target, prop, value) {
                    if (typeof prop === 'string') {
                        target.setItem(`${nameSpace}:${prop}`, value);
                        return true;
                    }
                    return Reflect.set(target, prop, value);
                },
                // 属性删除，如 delete localStorage[key]
                deleteProperty(target, prop) {
                    if (typeof prop === 'string') {
                        target.removeItem(`${nameSpace}:${prop}`);
                        return true;
                    }
                    return Reflect.deleteProperty(target, prop);
                },
                // 代理Object.getOwnPropertyNames(obj)，相当于Object.keys(),防止某些npm包使用到
                ownKeys(target) {
                    const keys = Object.keys(target).filter((key) => key.startsWith(`${nameSpace}:`));
                    // 返回原始的key
                    return keys.map((key) => key.replace(`${nameSpace}:`, ''));
                },
                // 代理Object.getOwnPropertyDescriptor(obj, prop)，获取对象属性描述的方法，防止某县npm包会用到
                getOwnPropertyDescriptor(target, prop) {
                    const value = target.getItem(`${nameSpace}:${prop}`);
                    return value
                        ? {
                              enumerable: true,
                              configurable: true,
                              value,
                              writable: true
                          }
                        : undefined;
                }
            });
        }

        // 创建命名空间的 localStorage 和 sessionStorage
        const nameSpacedLocalStorage = createNameSpacedStorage(localStorage);
        const nameSpacedSessionStorage = createNameSpacedStorage(sessionStorage);

        // 替换原有的 localStorage 和 sessionStorage
        Object.defineProperty(window, 'localStorage', {
            value: nameSpacedLocalStorage,
            writable: false,
            configurable: false,
            enumerable: true
        });

        Object.defineProperty(window, 'sessionStorage', {
            value: nameSpacedSessionStorage,
            writable: false,
            configurable: false,
            enumerable: true
        });
    }
};
