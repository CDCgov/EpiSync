
export function Summary(): JSX.Element {
  return (<table>
    <caption>
      Information from the feed's summary.yaml file
    </caption>
    <tbody>
      <tr>
        <th scope="row">Declaration of Independence</th>
        <td>
          Statement adopted by the Continental Congress declaring independence
          from the British Empire.
        </td>
      </tr>
      <tr>
        <th scope="row">Bill of Rights</th>
        <td>
          The first ten amendments of the U.S. Constitution guaranteeing rights
          and freedoms.
        </td>
      </tr>
      <tr>
        <th scope="row">Declaration of Sentiments</th>
           <td>
          A document written during the Seneca Falls Convention outlining the
          rights that American women should be entitled to as citizens.
        </td>
      </tr>
      <tr>
        <th scope="row">Emancipation Proclamation</th>
        <td>
          An executive order granting freedom to slaves in designated southern
          states.
        </td>
      </tr>
    </tbody>
  </table>)
}
