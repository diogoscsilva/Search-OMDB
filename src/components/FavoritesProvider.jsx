import { createContext, useMemo } from "react"

export const FavoritesContext = createContext()

export function FavoritesProvider (props) {
    const favorites = useMemo(() => (JSON.parse(localStorage.getItem('favorites') || '{}')), [])
    const favoritesCommands = useMemo(() => ({
        add (id, title) {
            favorites[id] = title
            localStorage.setItem('favorites', JSON.stringify(favorites))
        },
        remove (id) {
            delete favorites[id]
            localStorage.setItem('favorites', JSON.stringify(favorites))
        },
        getList () {
            return Object.entries(favorites)
        },
        has (id) {
            return favorites.hasOwnProperty(id)
        }
    }), [])
    return <FavoritesContext.Provider value={favoritesCommands}>
        {props.children}
    </FavoritesContext.Provider>
}