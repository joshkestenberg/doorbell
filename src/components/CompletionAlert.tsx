import Alert from 'react-bootstrap/Alert';

interface Props {
  name: string | undefined;
  type: string | undefined;
}

const CompletionAlert: React.FC<Props> = ({ name, type }: Props) => {
  const successMessage = `${name} has been notified and will come get you shortly`
  const failureMessage = `Something went wrong and ${name} has not been notified; try again.`

  return (
    <Alert className="mt-2" variant={type}>
      { type === 'success' ? successMessage : failureMessage }
    </Alert>
  )
}

export default CompletionAlert;