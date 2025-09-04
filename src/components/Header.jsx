import '../styles/Header.css'
import { FormProvider, Input, Submit } from "./FormProvider"
import { Filter } from './Filter'
import { Favorites } from './Favorites'

export function Header (porps) {

  return (
    <header>
      <FormProvider>
        <Filter />
        <label className='search'>
          Search: <Input name='busca' />
          <Submit value='Send' submit={porps.submit} />
        </label>
      </FormProvider>
      <Favorites  showCard={porps.showCard}/>
    </header>
  )
}

