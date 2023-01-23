import CaseTable from '../../components/CaseTable'
import { fetchAllStateCases, fetchStateCaseDictionary } from '../../features/api/api'
import { CircularProgress } from '@material-ui/core'
import { useQuery } from '@tanstack/react-query'
import { Alert } from '@material-ui/lab'
import { stateCases, stateCasesDictionary } from './stateCasesKeys'

const customWidths = {
  uscdiPatientFirstName: 140,
  uscdiPatientLastName: 140,
  uscdiPatientRaceCategory: 200,
  uscdiPatientEthnicityGroup: 200,
  uscdiPatientPostalCode: 140,
  uscdiPatientAddress: 200,
  uscdiPatientPhone: 200,
  uscdiPatientEmail: 200,
}

function makeColumns(dictionary) {
  return dictionary.elements.map((element) => {
    return {
      id: element.name,
      label: element.descriptions[0].displayName,
      minWidth: customWidths[element.name] ?? 120,
      dateFormat: element.type === 'date',
    }
  })
}

export default function StateCasesTable(props) {
  const agency = props.agency

  console.log(`rendering state cases for ${agency}`)
  const dictionaryQuery = useQuery({
    queryKey: [stateCasesDictionary, agency],
    queryFn: async () => {
      return await fetchStateCaseDictionary(agency)
    },
  })
  const casesQuery = useQuery({
    queryKey: [stateCases, agency],
    queryFn: async () => {
      return await fetchAllStateCases('desc', agency)
    },
  })

  let content = ''
  if (dictionaryQuery.isError || casesQuery.isError) {
    if (casesQuery.isError) {
      content = (
        <Alert severity='error'>
          Get state cases api error: {casesQuery.error}
        </Alert>
      )
    }
    if (dictionaryQuery.isError) {
      content = (
        <Alert severity='error'>
          Get state cases dictionary api error: {dictionaryQuery.error}
        </Alert>
      )
    }
  } else if (casesQuery.isLoading || dictionaryQuery.isLoading) {
    content = (
      <CircularProgress />
    )
  } else if (casesQuery.isFetched && dictionaryQuery.isFetched) {
    const columns = makeColumns(dictionaryQuery.data)
    content = (
      <CaseTable fetchRows={() => casesQuery.data} columns={columns} />
    )
  }

  return (
    <div>
      {content}
    </div>
  )
}
