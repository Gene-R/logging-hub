DROP KEYSPACE IF EXISTS logging_hub ;

CREATE KEYSPACE IF NOT EXISTS logging_hub WITH REPLICATION = {'class':'SimpleStrategy', 'replication_factor' : 3};

DROP TABLE IF EXISTS logging_hub.log;

USE logging_hub;

CREATE TABLE logging_hub.log (
    user_id text,
    ip_addr text,
    log_path text,
    log_id timeuuid,
    log_level text,
    log_msg text,
    PRIMARY KEY ((log_path,user_id, ip_addr), log_id)
) WITH CLUSTERING ORDER BY (log_id DESC)
    AND caching = {'keys':'ALL', 'rows_per_partition':'50'};


DESCRIBE log;
select * from log;
