import { Button, Input, InputLabel } from "@mui/material"
import invariant from "tiny-invariant"
import { useData } from "../../App"
import { FormControl, StyledForm } from './styled'



export const Form = () => {
  const { setData } = useData()
  invariant(setData, 'setData must be set')

  const handleOnSubmit = (event: { preventDefault: () => void; target: any}) => {
    event.preventDefault();

    setData(prevData => [
      ...prevData,
      {
        id: prevData.length + 1,
        title: event.target.title.value,
        completed: event.target.completed.checked
      }])

  }

  return (
    <StyledForm onSubmit={handleOnSubmit}>
      <FormControl>
        <InputLabel htmlFor="title">Title</InputLabel>
        <Input id="title" name="title" type="text" />
        {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}

        {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="completed">Completed:</InputLabel>
        <Input id="completed" name="completed" type="checkbox" />
      </FormControl>
      <FormControl>
        <Button type="submit" variant="contained" color="primary" >Submit</Button>
      </FormControl>
    </StyledForm>
  )
}