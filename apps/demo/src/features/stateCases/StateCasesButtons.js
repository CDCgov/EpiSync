import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, ButtonGroup, Checkbox, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, FormControl, FormGroup, FormLabel, FormControlLabel, makeStyles } from '@material-ui/core'

import { stateCases } from './stateCasesKeys'
import { addRandomStateCases, addStateCaseElement, deleteStateCaseElement, fetchStateCaseDictionary, publishStateCases, deduplicateStateCases } from '../api/api'
import { variableStateCaseElements, caQuestion1, caQuestion2, caQuestion3, azQuestion1, azQuestion2, cdcQuestion1, cdcQuestion2 } from './variableStateCaseElements'


export default function StateCasesButtons(props) {
  const queryClient = useQueryClient()
  const [open, setOpen] = React.useState(false)
  const [checked, setChecked] = React.useState(new Set())
  const agency = props.agency

  const addCasesMutation = useMutation({
    mutationFn: async (params) => {
      return await addRandomStateCases(params.numOfDays, params.numPerDay, agency)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [stateCases, agency] })
    }
  })

  const publishStateCasesMutation = useMutation({
    mutationFn: () => publishStateCases(agency)
  })

  const updateStateDictionaryMutation = useMutation({
    mutationFn: async () => {
      for (let element of variableStateCaseElements) {
        if (checked.has(element.name)) {
          await addStateCaseElement(element, agency)
        } else {
          await deleteStateCaseElement(element.name, agency)
        }
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries()
    }
  })

  const deduplicateMutation = useMutation({
    mutationFn: async () => {
      await deduplicateStateCases(agency)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [stateCases, agency] })
    }
  })

  const handleClickOpen = async () => {
    const dictionary = await fetchStateCaseDictionary(agency)
    const newChecked = new Set()
    for (let element of variableStateCaseElements) {
      if (dictionary.elements.findIndex(e => e.name === element.name) !== -1) {
        newChecked.add(element.name)
      }
    }
    setChecked(newChecked)
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleUpdate = async () => {
    await updateStateDictionaryMutation.mutateAsync()
    setOpen(false);
  }

  const handleCheckboxChange = (event) => {
    const newChecked = new Set(checked)
    const name = event.target.name
    if (event.target.checked) {
      newChecked.add(name)
    } else {
      newChecked.delete(name)
    }
    setChecked(newChecked)
  }

  function onChangeDictionaryClick() {
    handleClickOpen()
  }

  const useButtonStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
      width: '100%'
    },
    formControl: {
      margin: theme.spacing(3),
    },
  }))

  const buttonClasses = useButtonStyles()

  const createCheckboxes = (questions) => (
    questions.map((question) => (
      <FormControlLabel key={question.name}
        control={
          <Checkbox name={question.name} checked={checked.has(question.name)} onChange={handleCheckboxChange} />
        }
        label={question.descriptions[0].displayName}
      />
    ))
  )

  const isLoading = addCasesMutation.isLoading || publishStateCasesMutation.isLoading

  return (
    <div className={buttonClasses.root} align='right'>
      <ButtonGroup color='primary'>
        <Button disabled={isLoading ?? false} onClick={() => addCasesMutation.mutate({ numOfDays: 1, numPerDay: 1 })}>Add 1 Case</Button>
        <Button disabled={isLoading ?? false} onClick={() => addCasesMutation.mutate({ numOfDays: 2, numPerDay: 10 })}>Add 20 Cases</Button>
        <Button disabled={isLoading ?? false} onClick={() => addCasesMutation.mutate({ numOfDays: 30, numPerDay: 500 })}>Add 15000 Cases</Button>
      </ButtonGroup>
      <Button disabled={isLoading ?? false} onClick={() => deduplicateMutation.mutate()} color='primary' variant='outlined'>Deduplicate</Button>
      <Button disabled={isLoading ?? false} onClick={() => onChangeDictionaryClick()} color='primary' variant='outlined'>Update Data Elements</Button>
      <Button disabled={isLoading ?? false} onClick={() => publishStateCasesMutation.mutate()} color='primary' variant='outlined'>Publish</Button>
      <Dialog open={open} onClose={handleClose} maxWidth="xl" aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Change Data Dictionary</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Update the data dictionary used for this case type using questions from a national and a local question bank.
          </DialogContentText>
          <FormControl component="fieldset" className={buttonClasses.formControl}>
            <FormLabel component="legend">California</FormLabel>
            <FormGroup>
              {createCheckboxes([caQuestion1, caQuestion2, caQuestion3])}
            </FormGroup>
          </FormControl>
          <FormControl component="fieldset" className={buttonClasses.formControl}>
            <FormLabel component="legend">Arizona</FormLabel>
            <FormGroup>
              {createCheckboxes([azQuestion1, azQuestion2])}
            </FormGroup>
          </FormControl>
          <FormControl component="fieldset" className={buttonClasses.formControl}>
            <FormLabel component="legend">CDC</FormLabel>
            <FormGroup>
              {createCheckboxes([cdcQuestion1, cdcQuestion2])}
            </FormGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button disabled={updateStateDictionaryMutation.isLoading ?? false} onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
