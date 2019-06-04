date >> E:/tmp/a.out

#LOG_FILE=/home/gene/JAVA/apache-cassandra-3.11.4/logs/debug.log
#LOG_FILE=/home/gene/eclipse/jee-2019-03/eclipse/configuration/org.eclipse.oomph.setup/setup.log
set LOG_FILE=E:/tmp/a.out

java -jar target/logginghub-producer-1.0.0.jar --servers "scc45-wp2:9092" --topic test123 --path %LOG_FILE%
