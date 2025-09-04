
export function IconOptions (props) {
    const openOptions = props.openOptions || (() => {})
    return (
        <label className={'icon options'}  onClick={openOptions}>
            { props.hasOwnProperty('label') ? props.label : '' }
            {' \u2261'}
        </label>
    )
}