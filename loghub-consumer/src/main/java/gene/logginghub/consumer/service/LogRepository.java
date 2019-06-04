package gene.logginghub.consumer.service;

import java.util.List;

import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.data.cassandra.repository.Query;

public interface LogRepository extends CassandraRepository<Log, Long> {

	@Query("select * from log")
	List<Log> findAll();

	@Query("select * from log  limit ?0")
	List<Log> getNrecords(Integer limit);
	
	@Query("select distinct log_path,user_id,ip_addr from log")
	List<Log> getKeys();

}
