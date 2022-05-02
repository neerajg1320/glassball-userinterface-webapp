# Open bash in the qs container
docker exec -it sample-backend-services-mesh_qs_1 bash

# Send a request to compute_positions
rabbitmqadmin publish exchange=amq.default routing_key=compute payload='{"sender": "fms", "user_id": 36}'

# In case we want to specify parameters
# user_id: user for which these trades have to updated
# update_db: false - does not update db
#            true  - updates db
# security_name: process only the specified security name
# max_trades: maximum number of NEW trades to be processed. 0 is for all.
#       
rabbitmqadmin publish exchange=amq.default routing_key=compute payload='{"sender": "fms", "user_id": 36, "update_db":true, "security_name": "ZEEL ", "max_trades": 0}'
