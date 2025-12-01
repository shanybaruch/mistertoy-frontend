import { useCallback, useEffect, useState, useSyncExternalStore } from "react"

export function useOnlineStatusStore() {

    const subscribe = useCallback((onStoreChange) => {
        window.addEventListener('online', onStoreChange)
        window.addEventListener('offline', onStoreChange)

        return () => {
            window.removeEventListener('online', onStoreChange)
            window.removeEventListener('offline', onStoreChange)
        }

    }, [])

    const getData = useCallback(() => {
        return navigator.onLine
    }, [])



    return useSyncExternalStore(subscribe, getData)
}