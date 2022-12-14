# Need rover to be installed and the other services to be running

# Install rover and the router
install:
	curl -sSL https://rover.apollo.dev/nix/latest | sh
	curl -sSL https://router.apollo.dev/download/nix/latest | sh

# Compose all the subgraphs together into a supergraph
build-supergraph-schema:
	rover supergraph compose --config ./supergraph-config.yaml > supergraph.graphql

# Start the router for the generated supergraph
run-router:
	./router --supergraph supergraph.graphql --config ./router-config.yaml --dev
