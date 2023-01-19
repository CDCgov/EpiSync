import CaseTable from '../../components/CaseTable'
import { fetchAllCDCCases, fetchCDCCaseDictionary } from '../../features/api/api'
import { cdcCases, cdcCasesDictionary } from './cdcCasesKeys'

import { CircularProgress } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useQuery } from '@tanstack/react-query'

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

export default function CDCCasesTable() {
  const getCDCDictionaryQuery = useQuery(
    [cdcCasesDictionary],
    async () => await fetchCDCCaseDictionary(),
    {}
  )

  const getCDCCasesQuery = useQuery(
    [cdcCases],
    async () => await fetchAllCDCCases('desc'),
    {}
  )

  let content = ''

  if (getCDCCasesQuery.isError || getCDCDictionaryQuery.isError) {
    if (getCDCCasesQuery.isError) {
      content = (
        <Alert severity='error'>
          Get state cases api error: {getCDCCasesQuery.error}
        </Alert>
      )
    }
    if (getCDCDictionaryQuery.isError) {
      content = (
        <Alert severity='error'>
          Get state cases dictionary api error: {getCDCDictionaryQuery.error}
        </Alert>
      )
    }
  } else if (getCDCCasesQuery.isLoading || getCDCDictionaryQuery.isLoading) {
    content = (
      <CircularProgress />
    )
  } else if (getCDCCasesQuery.isFetched && getCDCDictionaryQuery.isFetched) {
    const columns = makeColumns(getCDCDictionaryQuery.data)
    if (columns.length === 0) {
      content = (
        <Alert severity='info'>
          No table published in feed
        </Alert>
      )
    } else {
      content = (
        <CaseTable fetchRows={() => getCDCCasesQuery.data} columns={columns} />
      )
    }
  }

  return (
    <div>
      {content}
    </div>
  )
}
