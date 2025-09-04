import "../styles/Favorites.css"
import { Modal } from "./Modal"
import { useContext, useState } from "react"
import { FavoritesContext } from "./FavoritesProvider"

export function Favorites(props) {
    const activeModal = { out: () => { } }
    const favorites = useContext(FavoritesContext)
    const [favoritesList, setFavoristList] = useState([])
    return (
        <>
            <label className="favorites" onClick={() => {
                activeModal.out(true)
                setFavoristList(favorites.getList())
            }}>
                Favorites
            </label>
            <Modal modalOn={activeModal} >
                <div className={'outer-modal'} onClick={() => {
                    activeModal.out(false)
                }} >
                    <div className="favorites" onClick={(e) => e.stopPropagation()}>
                        <h3>Favorites</h3>
                        {favoritesList.map((item) => {
                            return <p key={item[0]}>
                                <span onClick={() => {
                                    props.showCard(item[0])
                                    activeModal.out(false)
                                }} >
                                    {item[1]}
                                </span>
                            </p>
                        })}
                        <button onClick={() => {
                            activeModal.out(false)
                        }} >
                            Close
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    )
}