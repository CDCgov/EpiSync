import { Button, makeStyles, Grid, Box, Switch, FormControlLabel } from '@material-ui/core'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchCDCCaseSubscribers, fetchCDCSummary, readCDCCaseFeed, setCDCCaseSubscriber, publishCDCCases } from '../api/api'
import { cdcCasesSubscriber, cdcCases, cdcCasesDictionary, cdcCasesSummary } from './cdcCasesKeys'

export default function CDCCasesButtons(props) {
  const queryClient = useQueryClient()
  const getCDCCaseSubcribersQuery = useQuery(
    [cdcCasesSubscriber],
    fetchCDCCaseSubscribers,
    { refetchInterval: 5000 },
  )
  const getCDCCaseSummaryQuery = useQuery(
    [cdcCasesSummary],
    fetchCDCSummary,
    { refetchInterval: 5000 },
  )
  const readCDCCaseFeedMutation = useMutation({
    mutationFn: async () => { return await readCDCCaseFeed() },
    onSuccess: async () => {
      await queryClient.invalidateQueries()
    }
  })
  const setSubscriberAutomaticMutation = useMutation({
    mutationFn: async (params) => { return await setCDCCaseSubscriber(params.automatic) },
    onSuccess: async () => {
      await queryClient.invalidateQueries()
    }
  })
  const publishCDCCasesMutation = useMutation({
    mutationFn: () => publishCDCCases()
  })
  const useButtonStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1)
      }
    }
  }))

  const buttonClasses = useButtonStyles()
  const subscribers = getCDCCaseSubcribersQuery.data
  const isReading = getCDCCaseSubcribersQuery.isFetched && subscribers.reduce((prev, curr, _idx, _array) => prev.reading || curr.reading)
  const isAutomatic = getCDCCaseSubcribersQuery.isFetched && subscribers.reduce((prev, curr, _idx, _array) => prev.automatic && curr.automatic)

  let status = ''
  let isBusy = publishCDCCasesMutation.isLoading
  if (getCDCCaseSubcribersQuery.isError || getCDCCaseSummaryQuery.isError) {
    status = `Query Error: ${getCDCCaseSubcribersQuery.error} ${getCDCCaseSummaryQuery.error}`
  } else if (getCDCCaseSubcribersQuery.isFetched && getCDCCaseSummaryQuery.isFetched){
    if (isReading) {
      status = 'Reading...'
      isBusy = true
    } else {
      const summary = getCDCCaseSummaryQuery.data
      if (summary.updatedAt) {
        status = `Updated at ${summary.updatedAt}`
        const updatedAt = new Date(summary.updatedAt).getTime()
        queryClient.invalidateQueries({
          predicate: (query) => {
            return query.state.dataUpdatedAt < updatedAt &&
              (query.queryKey[0] === cdcCases || query.queryKey[0] === cdcCasesDictionary)
          }
        })
      } else {
        status = 'Never updated'
      }
    }
  } else {
    isBusy = true
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Box pl={1} pt={1} color='text.secondary'>
          {status}
        </Box>
      </Grid>
      <Grid item xs={6}>
        <div className={buttonClasses.root} align='right'>
          <FormControlLabel
            control={
              <Switch
                checked={isAutomatic}
                color="primary"
                name='automatic'
                onChange={(e) => setSubscriberAutomaticMutation.mutate({ automatic: e.target.checked })} />
            }
            label='Automatic'
          />
          <Button disabled={isBusy || isAutomatic} onClick={() => readCDCCaseFeedMutation.mutate()} color='primary' variant='outlined'>Read Subscriptions</Button>
          <Button disabled={isBusy} onClick={() => publishCDCCasesMutation.mutate()} color='primary' variant='outlined'>Publish</Button>
        </div>
      </Grid>
    </Grid>
  )
}
