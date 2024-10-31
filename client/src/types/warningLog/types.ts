export interface WarningLogEntry {
  date: string;
  time: string;
  code: string;
  message: string;
}

export interface WarningLogProps {
  roomNumber: string;
  period: string;
  logs: WarningLogEntry[];
}
