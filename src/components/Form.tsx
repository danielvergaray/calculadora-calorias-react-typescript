import { categories } from "../data/categories"
import { v4 as uuidv4} from 'uuid'
import { ActivityActions } from "../reducers/activivy-reducer"
import { Activity } from "../types"
import { Dispatch, useState } from "react"


type FormProps = {
    dispatch: Dispatch<ActivityActions>
}



const Form = ({dispatch}: FormProps) => {

    const initialState : Activity = {
        id: uuidv4(),
        category:1,
        name: '',
        calories: 0
    }
    
    const [activity, setActivity]=useState<Activity> (initialState)

    const handleChange = (e:React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) =>{ /* Ya que mas abajo hay dos tipos de elementos que usan e, 1 input y un select */
        const isNumberField = ['category', 'activity'].includes(e.target.id)
      
        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })
    }

    const isValidActivity =()=>{
        const {name, calories}=activity
        return name.trim() !== '' && calories > 0
    }

    const handleSubmit =(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()

        dispatch({ type: 'save-activity', payload: {newActivivy: activity }})

        setActivity (initialState)
    }

  return (
    <form
    className="space-y-5 bg-white shadow p-10 rounded-lg"
    onSubmit={handleSubmit}
    >
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="category" className="font-bold">Categoria:</label>
            <select
            className="border border-slate-300 p-2 rounded-lg w-full bg-white"
            id="category"
            value={activity.category}
            onChange={handleChange}
            >
                {categories.map (category =>(
                  <option
                  key={category.id}
                  value={category.id}
                  >{category.name} </option>  
                ))}
            </select>
        </div>

        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="name" className="font-bold">Actividad:</label>
            <input id="name" type="text" className="border border-slate-300 p-2 rounded-lg"
            placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
            value={activity.name}
            onChange={handleChange}
            />
        </div>

        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="calories" className="font-bold">Calorias:</label>
            <input id="calories" type="number" className="border border-slate-300 p-2 rounded-lg"
            placeholder="Calorias. Ej. 300 o 500"
            value={activity.calories}
            onChange={handleChange}
            />
        </div>

        <input type="submit" 
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer
        disabled:opacity-10"
        value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
        disabled={!isValidActivity()}
        />

    </form>
  )
}

export default Form