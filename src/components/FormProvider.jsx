import { createContext, useContext, useState, useMemo } from "react"

class Context {
    #props = {}
    constructor(obj) {
        for (let propName in obj) {
            if (obj.hasOwnProperty(propName)) {
                this.setup(propName, obj[propName])
            }
        }
    }
    setup(propName, pair) {
        if (pair.length === 1) {
            this.#props[propName] = {
                out: pair[0],
                set: () => { throw new RangeError(`Read only ${propName} property`) }
            }
        } else {
            this.#props[propName] = {
                out: pair[0],
                set: pair[1]
            }
        }
    }
    set(propName, value) {
        this.#props[propName].set(value)
    }
    get(propName) {
        return this.#props.hasOwnProperty(propName) && this.#props[propName].out
    }
    has(propName) {
        return this.#props.hasOwnProperty(propName) && true
    }
}

const FormContext = createContext()
const SelectContext = createContext()

export function FormProvider (props) {
    const context = useMemo(()=> new Context(), [])
    return (
        <FormContext.Provider value={context}>
            {props.children}
        </FormContext.Provider>
    )
}

export function Input (props) {
    const [input, setInput] = useState(props.hasOwnProperty('value') ? props.value : '')
    const context = useContext(FormContext)
    context.setup(props.name, [input, setInput])
    const onChange = props.onChange || (() => { })
    function changeField (e) {
        onChange.call(e.target, e)
        setInput(e.target.value)
    }
    return <input type={props.type || 'text'} name={props.name}  className={props.className} value={input} onChange={changeField} />
}

function getChecked (props) {
    return props.checked ? props.value || true : '' 
}

export function Checkbox (props) {
    const [input, setInput] = useState(getChecked(props))
    const context = useContext(FormContext)
    context.setup(props.name, [input, setInput])
    const onChange = props.onChange || (() => { })
    function changeField (e) {
        onChange.call(e.target, e)
        setInput(getChecked(e.target))
    }
    return <input type='checkbox' name={props.name}  className={props.className} value={input} onChange={changeField} />
}

export function RadioGroup (props) {
    const [input, setInput] = useState(props.value)
    const radiosSetChecked = useMemo(() => ({}), [])
    const context = useContext(FormContext)
    const onChange = props.onChange || (() => {})
    context.setup(props.name, [input, (value) => {
        for (var key in radiosSetChecked) {
            if (radiosSetChecked.hasOwnProperty(key)
            && key !== value) {
                const setChecked = radiosSetChecked[key]
                setChecked(false)
            }
        }
        onChange({target: {value}})
        setInput(value)
    }])
    return <SelectContext.Provider value={radiosSetChecked}>
         {props.children}
    </SelectContext.Provider>
}

export function Radio (props) {
    const context = useContext(FormContext)
    const [checked, setChecked] = useState(props.value === context.get(props.name))
    useContext(SelectContext)[props.value] = setChecked
    const onChange = props.onChange || (() => {})
    function changeField (e) {
        setChecked(true)
        onChange.call(e.targer, e)
        context.set(props.name, e.target.value)
    }
    return <input type='radio' name={props.name} checked={checked} className={props.className} value={props.value} onChange={changeField} />
}

export function Submit (props) {
    var submit = props.submit || (() => {})
    var outSubmit = props.outSubmit || {}
    var context = useContext(FormContext)
    function onClick(e) {
        submit(context)
    }
    outSubmit.out = onClick
    return <input type='button' id={props.id} className={props.className} value={props.value} onClick={onClick} />
}