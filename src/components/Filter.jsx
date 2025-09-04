import "../styles/Filter.css"
import { Input, Radio, RadioGroup } from "./FormProvider"
import { IconOptions } from "./IconOptions"
import { ModalContainer } from "./Modal"

export function Filter(props) {
    const activeModal = { out: (() => { }) }
    return (
        <>
            <IconOptions label="Filters" openOptions={() => activeModal.out(true)} />
            <ModalContainer activeModal={activeModal}>
                <div className={"filter"} onClick={(e) => e.stopPropagation()}>
                    <h3>Filters</h3>
                    <label>
                        Year: <Input name="ano" />
                    </label>
                    <RadioGroup name="tipo" value="todos">
                        <label>
                            <Radio name="tipo" value="todos" />
                            All
                        </label>
                        <label>
                            <Radio name="tipo" value="movie" />
                            Movies
                        </label>
                        <label>
                            <Radio name="tipo" value="series" />
                            Series
                        </label>
                        <label>
                            <Radio name="tipo" value="episode" />
                            Episodes
                        </label>
                    </RadioGroup>
                    <button onClick={() => {
                        activeModal.out(false)
                    }} >
                        Close
                    </button>
                </div>
            </ModalContainer>
        </>
    )
}