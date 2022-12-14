from ariadne.asgi import GraphQL

from .schema import schema

__version__ = '0.1.0'

app = GraphQL(schema, debug=True)
