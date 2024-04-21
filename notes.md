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
Decorators are indicated by the `@` symbol followed by the decorator's name. They are functions that are executed at runtime with access to the target declaration and can perform various actions or modifications.\
Some key points:
- #### Metadata
  Decorators can be used to add metadata to a class, method, property or parameter, so other parts of the app or libraries can use them it to provide additional functionality or perform certain operations based on it.
- #### Syntax
  The syntax used allows them to be placed directly above the declaration they are decorating. For example:
  - `@Component()` decorates a **class**,
  - `@Get()` decorates a **method**, and
  - `@Inject()` decorates a **parameter**.
- #### Execution
    Decorators are executed when the target declaration is evaluated at runtime, which allow them to perform actions or modifications to the target with certain systems or frameworks. Their execution order is from bottom to top for class decorators and from inside to outside for method and property decorators. 
- #### Decorator Factories
    Decorators can also be created using decorator factories. Decorator factories are higher-order functions that return the actual decorator function. This allows for parameterized decorators that can accept arguments and configure the behavior of the decorator.
### Decorators for HTTP requests
They map the routes to the controller methods, paving the path for HTTP requests to find exactly what they need. (`Get()`, `Post()`)



>  Source article: [Power of Decorators in TypeScript and NestJS](https://kyiv-tech-kat.medium.com/in-the-context-of-typescript-and-nestjs-a-decorator-is-a-special-kind-of-declaration-that-can-be-a579c286d5bb)

## Internet Security
> This information was extracted from the an article and reduced as much as possible, which is not much by the way. Anyway, you can check the [article](https://codedamn.com/news/backend/how-to-fix-cors-error) yourself if desired.
### Same-origin policy
This policy restricts the interaction of a document of script from one origin with a resource loaded from another origin
### What is CORS?
CORS stands for *Cross-Origin Resource Sharing*. When one domain request resources from another, it's called a **cross-domain request**. Logically, due to security reasons, we may not want any page to access to the server's resources, so here is where CORS comes in. The CORS technique allows a server to specify resources it will load from other origin (domains, schemes, or ports) other than HTTP headers.
### Why do we need CORS?
As we said, this method protects the server from being accessed and modified for anyone. In Addition, cross-origin is also beneficial or even required in a lot of circumstances. For instance, a React web app that calls an API backend set up on a separate domain. This won't be possible without CORS.
### How does CORS works?
It allows the server to explicitly enable specific sources, making it possible to override the same-origin restriction. If we set up our CORS server, each response will include and additional header with the key **"Access-Control-Allow-Origin"**.
### What is a preflight request?
A CORS preflight request examines the server's ability to employ particular methods and headers an the server's knowledge of the CORS protocol.\
Browsers automatically generate preflight requests. Therefore, front-end developers don't need to write them.\
Using the “Access-Control-Max-Age” header, it is possible to selectively cache the preflight responses for requests made at the same URL. The browser employs a unique cache for preflight responses distinct from the browser’s standard HTTP cache.
### The HTTP response headers used in CORS
As explained above, CORS works by including additional headers with the response indicating whether the origin is on the *server's allowlist*. This are some of those headers:
- #### Access-Control-Allow-Origin
    This header defines an origin and instructs browsers to permit that origin to access server resources for requests without [credentials](https://codedamn.com/news/backend/how-to-fix-cors-error#:~:text=standard%20HTTP%20cache.-,Credentialed%20requests,-CORS%20is%20also). It may also include a wildcard *, that allows any origin to access the server's resources.
    ```
    Access-Control-Allow-Origin: *
    ```
    However, the wildcard cannot be used for requests containing credentials or cookies in general. Only one origin should be provided in this situation.
    ```
    Access-Control-Allow-Origin: www.some-domain.com
    ```
- #### Access-Control-Max-Age
    The browser can store a preflight request for a given length of time
    ```
    Access-Control-Max-Age: 1800
    ```
- #### Access-Control-Allow-Methods
    It's used in response to preflight request to specify the method or methods that are allowed to access the resource
    ```
    Access-Control-Allow-Methods: GET, POST, PUT
    ```
- #### Access-Control-Allow-Headers
    As part of the preflight request, this header specifies which HTTP headers the client can use during the actual request
    ```
    Access-Control-Allow-Headers: Content-Type
    ```
Beyond this basics of same-origin policy and CORS, for this particular case in which we're using **React** for the frontend app and a separated server with **NestJS**, we need allow React app to fetch make requests to the server.
As we saw earlier, this is done through the **Access-Control-Allow-Origin** header. Nest has a couple of ways to enable and set up the configuration of CORS's mechanism, that can be checked in their [docs for CORS](https://docs.nestjs.com/security/cors).\
However, for the purpose of this very simple app, I just enabled cors inside the function for bootstrapping the server in `pokedex-sever/src/main.ts` with the `NestFactory()` method. The default value for the **Access-Control-Allow-Origin** header when enabling cors this way is the wildcard (*), so we can now request server's resources from any domain, including our React app.
```typescript
// main.ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(4321);
}
```
## Data Transfer Object (DTO)
A DTO is an object that defines how the data will be sent over the network. We can determine the DTO schema by using **Typescript** interfaces, or by simple **classes**. 
With Nest, classes are recommended because they are part of the **Javascript ES6** standard, therefore, they are preserved as real entities in the compiled Javascript. On the other hand, Typescript interfaces are removed during the transpilation, so Nest can't refer to them at runtime, which is important for some features like **Pipes**.
For example, in this project we created a `CreatePokemonDTO`
```typescript
export class CreatePokemonDTO {
    
}
```