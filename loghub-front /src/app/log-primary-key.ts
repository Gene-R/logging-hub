export class LogPrimaryKey {
  logPath: string;
  userId:  string;
  ipAddr:  string;
  logId:   string;

  constructor( logPath: string, userId: string, ipAddr: string, logId: string) {
    this.logPath = logPath;
    this.userId = userId;
    this.ipAddr = ipAddr;
    this.logId = logId;
  }
}
