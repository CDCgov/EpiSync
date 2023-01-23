import { Summary } from "../components/Summary"

const Root: React.FC = (): JSX.Element => {
  return (
    <div className='root'>
      <section className='usa-prose'>
        <h2>Summary</h2>
        <p>Information about the feed and its content.</p>
        <Summary/>
      </section>
    </div>
  )
}

export default Root
