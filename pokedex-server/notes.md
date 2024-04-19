<style>
    h2 {
        color: lightseagreen;
    }
    h3 {
        color: springgreen;
    }
    h4 {
        color: violet;
    }
    strong {
        color: turquoise;
    }
</style>

# General Notes

## Decorators

In the context of TypeScript and NestJS, a decorator is a special kind of declaration that can be attached to a class declaration, method, property, or parameter to provide additional metadata or modify the behavior of the target.\
Decorators are indicated by the `@` symbol followed by the decorator's name. They are functions that are executed at runtime with acces to the target declaration and can perform various actions or modifications.\
Some key points:
- #### Metadata
  Decorators can be used to add metadata to a class, method, property or parameter, so other parts of the app or libraries can use them it to provide additional functionality or perfom certain operations based on it.
- #### Syntax
  The syntax used allows them to be placed directly above the declaration they are decorating. For example:
  - `@Component()` decorates a **class**,
  - `@Get()` decorates a **method**, and
  - `@Inject()` decorates a **parameter**.
- #### Execution
    Decorators are executed when the target declaration is evaluated at runtime, which allow them to perfom actions or modifications to the target with certain systems or frameworks. Their execution order is from bottom to top for class decorators and from inside to outside for method and property decorators. 
- #### Decorator Factories
    Decorators can also be created using decorator factories. Decorator factories are higher-order functions that return the actual decorator function. This allows for parameterized decorators that can accept arguments and configure the behavior of the decorator.
### Decorators for HTTP requests
They mapo the routes to the controller methods, paving the path for HTTP requests to find exactly what they need. (`Get()`, `Post()`)



>  Sourse article: [Power of Decorators in TypeScript and NestJS](https://kyiv-tech-kat.medium.com/in-the-context-of-typescript-and-nestjs-a-decorator-is-a-special-kind-of-declaration-that-can-be-a579c286d5bb)