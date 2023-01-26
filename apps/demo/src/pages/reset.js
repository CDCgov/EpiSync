import React from 'react'
import Meta from './../components/Meta'
import HeroSection2 from './../components/HeroSection2'
import { Container, Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { resetSystem } from '../features/api/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cdcCases, cdcCasesDictionary, cdcCasesSubscriber } from '../features/cdcCases/cdcCasesKeys'
import { stateCases, stateCasesDictionary } from '../features/stateCases/stateCasesKeys'

function ResetPage (props) {
  const history = useHistory()
  const queryClient = useQueryClient()
  const resetSystemMutation = useMutation({
    mutationFn: async () => { await resetSystem() },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [cdcCases, cdcCasesDictionary, cdcCasesSubscriber, stateCasesDictionary, stateCases] })
      history.push('/')
    }
  })

  return (
    <>
      <Meta title='Reset' />
      <HeroSection2
        bgColor='default'
        size='medium'
        bgImage=''
        bgImageOpacity={1}
        title='Reset'
        subtitle='Reset the demo by resetting the cases database and clearing the feed.'
      />
      <Container align='center'>
        <Button
          variant='contained'
          size='large'
          color='primary'
          onClick={() => { resetSystemMutation.mutate() }}
        >
          Reset
        </Button>
      </Container>
    </>
  )
}

export default ResetPage
