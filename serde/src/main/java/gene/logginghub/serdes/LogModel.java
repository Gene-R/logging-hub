package gene.logginghub.serdes;

import java.io.Serializable;

import com.datastax.driver.core.utils.UUIDs;

public class LogModel implements Serializable {

	public enum LogLevel {
		DEBUG, ERROR, INFO, UNDEFINED;
	}

	private static final long serialVersionUID = 1;
	private final String rawdata;
	private final String timeid;
	private final LogLevel level;
	private final String record;
	private final String ip;
	private final String user;
	private final String path;

	public LogModel(String rawdata, String ip, String user, String path) {
		this.rawdata = rawdata;
		this.timeid = UUIDs.timeBased().toString();
		this.level = LogLevel.UNDEFINED;
		this.record = rawdata;
		this.ip = ip;
		this.user = user;
		this.path = path;
	}

	public String getRawdata() {
		return rawdata;
	}

	public String getTimeid() {
		return timeid;
	}

	public LogLevel getLevel() {
		return level;
	}

	public String getRecord() {
		return record;
	}

	public String getIp() {
		return ip;
	}

	public String getUser() {
		return user;
	}

	public String getPath() {
		return path;
	}

	@Override
	public String toString() {
		String r = "...";
		if (record.length() > 30) {
			r = record.substring(0, 30) + " ...";
		} else {
			r = record;
		}
		return "[" + timeid + ", " + path + ", " + user + "@" + ip + ", " + level + "{" + r + "}]";
	}

}
