import { CancellationReasonOptionsInPerson, ZambdaInput } from 'utils';
import { CancelAppointmentInput } from '.';

export function validateRequestParameters(input: ZambdaInput): CancelAppointmentInput {
  if (!input.body) {
    throw new Error('No request body provided');
  }

  const { language, appointmentID, cancellationReason, silent } = JSON.parse(input.body);

  if (appointmentID === undefined || cancellationReason === undefined) {
    throw new Error('These fields are required: "appointmentID", "cancellationReason"');
  }

  if (!Object.values(CancellationReasonOptionsInPerson).includes(cancellationReason)) {
    throw new Error(
      `"cancellationReason" must be one of the following values: ${JSON.stringify(
        Object.values(CancellationReasonOptionsInPerson)
      )}`
    );
  }

  return {
    appointmentID,
    cancellationReason,
    silent,
    secrets: input.secrets,
    language,
  };
}
