import {LogPrimaryKey} from './log-primary-key';

export class Log {
  key: LogPrimaryKey;
  level: string;
  record: string;

  constructor( key: LogPrimaryKey, level: string, record: string) {
    this.key = key;
    this.level = level;
    this.record = record;
  }
}
