source .env

docker-compose up -d mysql
docker-compose up -d bun

# Function to check if a port is open
function check_port() {
  nc -z localhost 3306
  echo $?
}

# Loop until port 3306 is open
while [[ $(check_port) -ne 0 ]]; do
  echo "Waiting for port 3306 to be available..."
  sleep 1
done

# Make sure that the mysql service is up and running
docker-compose exec mysql bash -c "mysql -h localhost  -P 3306 -u $MYSQL_USER -p$MYSQL_PASSWORD -e 'USE $MYSQL_DATABASE'"

# If NODE_ENV is not "production", display the logs
if [[ "$NODE_ENV" != "production" ]]; then
	# Show the logs, Do not do in production
	docker-compose logs -f bun
fi