from ariadne import QueryType, load_schema_from_path
from ariadne.contrib.federation import make_federated_schema

type_defs = load_schema_from_path('./schema.graphql')
query = QueryType()

@query.field("hello")
def resolve_hello(_, info):
    request = info.context["request"]
    user_agent = request.headers.get("user-agent", "guest")
    return "Hello, %s!" % user_agent

schema = make_federated_schema(type_defs, query)
