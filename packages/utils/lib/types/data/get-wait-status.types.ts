import { TelemedAppointmentStatus } from 'utils';
import { Secrets } from '../../main';

export interface WaitingRoomInput {
  appointmentID: string;
  secrets: Secrets | null;
  authorization: string | undefined;
}

export interface WaitingRoomResponse {
  status: TelemedAppointmentStatus;
  estimatedTime?: number;
  encounterId?: string;
}
