package gene.logginghub.consumer.service;

import java.io.Serializable;

import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;
import gene.logginghub.serdes.LogModel;

@Table
public class Log implements Serializable {

	private static final long serialVersionUID = 1L;

	@PrimaryKey
	private LogPrimaryKey key;

	@Column(value = "log_msg")
	private String logMsg;
	@Column(value = "log_level")
	private String logLevel;

	public Log() { // lack of default constructor results in invocation exception

	}

	public Log(LogModel record) {
		super();
		this.key = new LogPrimaryKey(record.getPath(), record.getUser(), record.getIp(), record.getTimeid());
		this.logMsg = record.getRecord();
		this.logLevel = record.getLevel().name();
	}

	@Override
	public String toString() {
		return key + " : " + logLevel;
	}

	@Override
	public int hashCode() {
		return key.hashCode();
	}

	@Override
	public boolean equals(Object obj) {
		if (obj == null || !(obj instanceof Log)) {
			return false;
		}
		Log other = (Log) obj;
		return this.key.equals(other.getKey());
	}

	public LogPrimaryKey getKey() {
		return key;
	}

	public void setKey(LogPrimaryKey key) {
		this.key = key;
	}

	public String getRecord() {
		return logMsg;
	}

	public void setRecord(String record) {
		this.logMsg = record;
	}

	public String getLevel() {
		return logLevel;
	}

	public void setLevel(String level) {
		this.logLevel = level;
	}

}
