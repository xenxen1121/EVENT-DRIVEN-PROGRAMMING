# Paradigm Comparison: "User Submits a Search Form"

## Procedural

- The browser's own event loop owns the loop; the script just runs top-to-bottom once and then waits for callbacks to be invoked by that loop.
- Handlers live as plain top-level functions (e.g. `function handleSubmit(e) {...}`), attached directly with `addEventListener` or an inline `onsubmit` attribute.
- There's no object wrapping state; any shared data (last query, results array) lives in module-level variables.
- Async results arrive via a callback function passed straight into `fetch(...).then(handleResults)`, or an `await` inside the handler function itself, then flow is resumed sequentially from there.
- Control flow is easy to trace top-to-bottom, but as more handlers are added, shared globals can get tangled since nothing enforces ownership boundaries.

## Object-Oriented (OOP)

- The loop is still the browser's event loop, but ownership of *reacting* to events is delegated to instances — a `SearchForm` class (or similar) owns its own state and behavior.
- Handlers live as bound instance methods (e.g. `this.handleSubmit = this.handleSubmit.bind(this)`), registered on the DOM element the object wraps, often in a constructor or `init()` method.
- State (query text, loading flag, results) lives on `this`, encapsulated inside the object rather than scattered as globals.
- Async results arrive inside a method — typically `async handleSubmit(e) {...}` — and are written back onto `this.state`, then a `this.render()` call updates the UI, keeping mutation localized to the instance.
- Encapsulation makes each component's behavior self-contained and reusable, at the cost of more boilerplate (binding, constructors) than the procedural style.

## Event-Driven

- Ownership of the loop is explicit and central: a dispatcher/event bus (or the DOM's own event system) drives everything, and code exists purely to react to named events rather than to call each other directly.
- Handlers live as subscribers registered against event names, e.g. `bus.on('search:submit', handler)` or `form.addEventListener('submit', handler)` — decoupled from whoever eventually triggers them.
- No single piece of code "owns" the whole sequence; instead each step publishes an event when it's done (`search:started`, `search:success`, `search:error`) and other handlers subscribe independently.
- Async results arrive by the fetch handler itself emitting a new event (e.g. `bus.emit('search:success', data)`) once the promise resolves, which other decoupled listeners (a renderer, a logger, an analytics hook) pick up on their own.
- This decoupling makes it easy to add new reactions without touching existing code, but the overall flow is harder to trace since "who runs next" isn't visible in one place — you have to follow the event names.

## Functional

- The browser's event loop still owns the loop, but code is organized as small pure functions composed together rather than as objects or free-floating procedures with side effects.
- Handlers live as functions passed by reference into `addEventListener`, often built by composing smaller transform functions (e.g. `handleSubmit = pipe(validate, buildQuery, dispatchSearch)`).
- State isn't mutated in place — instead of writing over `this.results` or a global, each step returns a new value (a new results array, a new UI-state object) that gets passed forward.
- Async results arrive as the resolved value of a promise chain (`fetchResults(query).then(mapToViewModel).then(render)`), with each `.then()` a pure transformation rather than a stateful update.
- Avoiding shared mutable state makes behavior easier to test and reason about in isolation, but the indirection of composed functions can make the live sequence harder to trace than a straight top-to-bottom read.

## Reactive / Declarative

- Ownership of the loop shifts to a reactive runtime (e.g. a framework's rendering engine or an observable stream), which decides *when* to re-run code in response to state changes rather than the developer sequencing calls directly.
- Handlers live as small functions that just update a piece of state (e.g. `setQuery(value)`, `setResults(data)`); they don't call rendering code themselves.
- The developer declares *what* the UI should look like for a given state (`{loading ? <Spinner /> : <ResultsList items={results} />}`), and the runtime figures out *how* and *when* to update the DOM.
- Async results arrive by being written into reactive state (a signal, an observable, or a hook like `useState`), which automatically triggers a re-render/re-evaluation wherever that state is read — no manual "now update the UI" call is needed.
- This shifts most of the control flow out of the developer's hands and into the framework, which reduces boilerplate and bugs from forgotten UI updates, but makes tracing execution order harder without framework-specific dev tools.
