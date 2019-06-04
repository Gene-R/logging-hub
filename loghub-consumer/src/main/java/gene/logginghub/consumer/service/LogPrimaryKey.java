package gene.logginghub.consumer.service;

import java.io.Serializable;
import java.util.UUID;

import org.springframework.data.cassandra.core.cql.Ordering;
import org.springframework.data.cassandra.core.cql.PrimaryKeyType;
import org.springframework.data.cassandra.core.mapping.PrimaryKeyClass;
import org.springframework.data.cassandra.core.mapping.PrimaryKeyColumn;

@PrimaryKeyClass
public class LogPrimaryKey implements Serializable {

	private static final long serialVersionUID = 1L;

	@PrimaryKeyColumn(name = "log_path", ordinal = 0, type = PrimaryKeyType.PARTITIONED)
	private String logPath;

	@PrimaryKeyColumn(name = "user_id", ordinal = 1, type = PrimaryKeyType.PARTITIONED)
	private String userId;

	@PrimaryKeyColumn(name = "ip_addr", ordinal = 2, type = PrimaryKeyType.PARTITIONED)
	private String ipAddr;

	@PrimaryKeyColumn(name = "log_id", ordinal = 3, type = PrimaryKeyType.CLUSTERED, ordering = Ordering.DESCENDING)
	private UUID logId;

	public LogPrimaryKey() {

	}

	public LogPrimaryKey(String logPath, String userId, String ipAddr, String timeId) {
		this.logPath = logPath;
		this.userId = userId;
		this.ipAddr = ipAddr;
		this.logId = UUID.fromString(timeId);
	}

	@Override
	public int hashCode() {
		return this.logId.hashCode();
	}

	@Override
	public boolean equals(Object obj) {
		if (obj == null || !(obj instanceof LogPrimaryKey)) {
			return false;
		}
		LogPrimaryKey other = (LogPrimaryKey) obj;
		return this.logId.equals(other.getLogId());
	}

	@Override
	public String toString() {
		return logId + " => " + userId + "@" + ipAddr;
	}

	public String getLogPath() {
		return logPath;
	}

	public void setLogPath(String logPath) {
		this.logPath = logPath;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getIpAddr() {
		return ipAddr;
	}

	public void setIpAddr(String ipAddr) {
		this.ipAddr = ipAddr;
	}

	public UUID getLogId() {
		return logId;
	}

	public void setLogId(UUID timeId) {
		this.logId = timeId;
	}

}
