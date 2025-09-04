import '../styles/MovieCard.css'
import { useContext, useState } from "react"
import { Modal } from "./Modal"
import { FavoritesContext } from './FavoritesProvider'


export function MovieCard(props) {
    const favorites = useContext(FavoritesContext)
    const fields = ['Poster', 'Title', 'Year', 'Type']
    const extended = ['Director', 'Actors', 'Genre', 'Plot']
    const [obj, setObj] = useState(props.obj)
    const detail = obj.hasOwnProperty('Genre')
    const activeModal = { out: () => { } }

    return (
        <>
            <div className={(detail ? 'detail ' : '') + 'card movie'} >
                {
                    fields.map(function (key, i) {
                        if (key === 'Poster') {
                            return <img src={obj[key]} key={key} />
                        }
                        return (
                            <p className='keyValue movie-field' key={key} >
                                {`${key}: `}
                                <span className='value'> {obj[key]}</span>
                            </p>
                        )
                    })
                }
                {
                    !detail ? <p> <input type='button' value='Detail' onClick={() => {
                        props.getDetail(obj.imdbID)
                            .then((data) => {
                                activeModal.out(true)
                                setObj(data)
                            })
                    }} />
                    </p>
                        : <>
                            <p>
                                {
                                    !favorites.has(obj.imdbID)
                                        ? <input type='button' value='Add to favorites' onClick={() => {
                                            favorites.add(obj.imdbID, obj.Title)
                                            setObj({ ...obj })
                                        }} />
                                        : <input type='button' value='Remove of favorites' onClick={() => {
                                            favorites.remove(obj.imdbID)
                                            setObj({ ...obj })
                                        }} />
                                }
                            </p>
                            <div>
                                {
                                    extended.map(function (key) {
                                        return <p key={key} className='keyValue movie-field'>
                                            {`${key}: `}
                                            <span className='value'>
                                                {obj[key]}
                                            </span>
                                        </p>
                                    })
                                }
                            </div>
                        </>
                }
            </div>
            <Modal modalOn={activeModal} >
                <div className={'outer-modal'} onClick={() => {
                    activeModal.out(false)
                    setObj(props.obj)
                }} />
            </Modal>
        </>
    )
}